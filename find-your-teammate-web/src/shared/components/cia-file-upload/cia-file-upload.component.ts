import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthStore } from 'src/app/core/auth/auth.store';
import { FileUploadEvent } from './file-upload-event';

@Component({
  selector: 'cia-file-upload',
  templateUrl: './cia-file-upload.component.html',
  styleUrls: ['./cia-file-upload.component.scss'],
})
export class CiaFileUploadComponent implements OnInit {
  private URL: string = '';

  @Input()
  name: string = '';
  @Input()
  disabled: boolean = false;
  @Input()
  images: boolean = false;
  @Input()
  zip: boolean = false;
  @Input()
  csv: boolean = false;
  @Input() 
  videos: boolean = false;
  @Input()
  urlAction: string;
  @Input()
  label: string;
  @Input()
  multiple: boolean = false;
  @Input()
  data: any;

  onComplete: Function = null;

  @Output('onstart')
  startCallback: EventEmitter<any> = new EventEmitter<any>();
  @Output('oncomplete')
  completeCallback: EventEmitter<FileUploadEvent> = new EventEmitter<FileUploadEvent>();

  uploader: FileUploader;

  constructor(@Inject('deploy-config') config: any, private authStore: AuthStore) {
    this.URL = config.apiUrl;
  }

  ngOnInit() {
    this.createUploader();
  }

  get accept() {
    let extensions: Array<string> = [];
    if (this.images) extensions.push('image/*');
    if (this.zip) extensions.push('*.zip');
    if (this.csv) extensions.push('*.csv');
    if (this.videos) extensions.push('video/*');
    return extensions.join('|') || '*/*';
  }

  @Input()
  public set path(relativeUrl: string) {
    this.urlAction = `${this.URL}/${relativeUrl}`;
    if (this.uploader) {
      this.uploader.setOptions(this.createOptions());
    }
  }

  get selectedFilename() {
    if (this.multiple) return '';

    if (this.uploader.queue && this.uploader.queue.length && this.uploader.queue[0].file) {
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
      return this.uploader.queue[0].file.name;
    }
    return '';
  }

  private createOptions() {
    return {
      url: this.urlAction,
      itemAlias: this.name,
      disableMultipart: false,
      authTokenHeader: 'Authorization',
      authToken: `Bearer ${this.authStore.getToken()}`,
    };
  }

  public get showTable(): boolean {
    return this.uploader.queue && this.uploader.queue.length > 0 && this.multiple;
  }

  public createUploader() {
    this.uploader = new FileUploader(this.createOptions());
  }

  private isSuccess(status: number) {
    return (status >= 200 && status < 300) || status === 304;
  }

  private isInvalid(status: number) {
    return status >= 400 && status < 500;
  }

  private isError(status: number) {
    return status >= 500;
  }

  public removeAll() {
    this.uploader.cancelAll();
    this.uploader.clearQueue();
  }

  public hasSelectedFile() {
    return this.uploader && this.uploader.queue.length > 0;
  }

  private extractApiReturn(event: any): any {
    if (event) {
      try {
        const apiReturn = JSON.parse(event.response);
        if (apiReturn) {
          return {
            success: apiReturn.success,
            result: apiReturn['return'],
            errorMessage: apiReturn.error,
          };
        }
      } catch (ex) {}
    }
    return {};
  }

  public uploadFile() {
    if (!this.hasSelectedFile()) {
      return;
    }
    this.startCallback.emit({ start: true, count: this.uploader.queue.length });

    if (this.data) {
      this.uploader.onBuildItemForm = (item, form) => {
        Object.keys(this.data).forEach((key) => {
          form.append(key, this.data[key]);
        });
      };
    }

    this.uploader.onCompleteItem = (item, response, status: number) => {
      let successUpload = false;
      let error: any = undefined;

      if (this.isSuccess(status)) {
        successUpload = true;
      } else if (this.isInvalid(status)) {
        successUpload = false;
        error = 'Arquivo inválido.';
      } else if (this.isError(status)) {
        successUpload = false;
        error = 'Ocorreu um erro durante o upload, por favor, tente novamente.';
      }

      const updateResult = this.extractApiReturn(response);

      this.completeCallback.emit({
        success: updateResult.success || successUpload,
        errorMessage: updateResult.errorMessage || error,
        index: item.index,
        result: updateResult.result,
        response: response,
      } as FileUploadEvent);

      if (this.onComplete) {
        this.onComplete({
          success: updateResult.success || successUpload,
          errorMessage: updateResult.errorMessage || error,
          result: updateResult.result,
          index: item.index,
          response: response,
        } as FileUploadEvent);
      }
    };

    this.uploader.uploadAll();
  }

  public extractResultFromResponse(uploadEvent) {
    if (!uploadEvent.success) return null;
    try {
      const apiReturn = JSON.parse(uploadEvent.response);
      return apiReturn['return'];
    } catch (error) {
      return null;
    }
  }
}
