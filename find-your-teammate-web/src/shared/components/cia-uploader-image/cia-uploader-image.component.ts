import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CiaDialogComponent } from '../cia-dialog/cia-dialog.component';
import { CiaFileUploadComponent } from '../cia-file-upload/cia-file-upload.component';

@Component({
  selector: 'cia-uploader-image',
  templateUrl: './cia-uploader-image.component.html',
})
export class CiaUploaderImageComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  @ViewChild('ciaUploaderImage') ciaUploaderImage: CiaFileUploadComponent;

  @Input()
  attrName: string;

  @Input()
  label: string;

  @Input()
  imageUrl: string;

  @Input()
  path: string;

  uploading: boolean;

  constructor() {}

  ngOnInit(): void {}

  get hasSelectedFile() {
    return this.ciaUploaderImage && this.ciaUploaderImage.hasSelectedFile();
  }

  sendFile() {
    if (!this.hasSelectedFile) {
      return this.dialog.showWarning('Selecione uma imagem para upload.');
    }

    this.uploadImage();
  }

  private uploadImage() {
    this.uploading = true;
    if (this.ciaUploaderImage && this.ciaUploaderImage.hasSelectedFile()) {
      this.ciaUploaderImage.path = `${this.path}`;
      this.ciaUploaderImage.uploadFile();
    }
  }

  onComplete(event: any) {
    if (!event) {
      this.uploading = false;
      return this.dialog.showError('Ocorreu um erro ao fazer o upload da imagem da dinâmica.');
    }

    if (event.success) {
      if (event.response) {
        let apiReturn = JSON.parse(event.response);

        if (!apiReturn.success) {
          this.uploading = false;
          this.ciaUploaderImage.removeAll();
          this.ciaUploaderImage.createUploader();
          return this.dialog.showError(apiReturn.error);
        }
        if (apiReturn['return']) {
          this.setImageUrl(apiReturn['return']);
        }
      }
      this.showImageSuccessMessage();
    } else {
      this.uploading = false;
      this.dialog.showError(event.errorMessage);
    }
  }

  private showImageSuccessMessage() {
    this.uploading = false;
    this.dialog.showSuccess('Upload da imagem realizado com sucesso.');
    this.ciaUploaderImage.removeAll();
  }

  private setImageUrl(imageUrl: string) {
    this.imageUrl = null; // force update
    if (imageUrl) {
      this.imageUrl = `${imageUrl}`;
    }
  }
}
