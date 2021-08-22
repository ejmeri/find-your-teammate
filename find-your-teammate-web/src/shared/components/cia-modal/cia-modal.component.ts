import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'cia-modal',
    templateUrl: './cia-modal.component.html',
    styleUrls: ['./cia-modal.component.scss']
})
export class CiaModalComponent implements OnInit {
    @ViewChild('contentModal') modal: any;

    @Input() title: string = 'Dados';
    @Input() centered: boolean = true;
    @Input() size: string;

    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }


    // openDialog(): void {
    //   this.dialogRef = this.dialogModel.open(this.modal, {
    //     width: this.width + 'px',
    //     panelClass: 'custom-dialog-container',
    //     disableClose: false,
    //   });
    // }


    modalRef: any;

    openDialog(): void {
        this.modalRef = this.modalService.open(this.modal, {
            centered: this.centered,
            size: this.size,
            backdrop: 'static'
        });
    }

    close() {
        this.onClose.emit();
        this.modalRef.close();
    }

}
