import { Component, Input, OnInit, TemplateRef,AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // modalRef?: BsModalRef;
  // items: any[];
 
  // constructor(private modalService: BsModalService, public bsModalRef: BsModalRef) {
  //   this.items = Array(15).fill(0);
  // }
  // ngOnInit(): void {
  // }
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
  // @Input() abc:any;
  // constructor(public bsModalRef: BsModalRef, private options:ModalOptions) { }

  ngOnInit() {
  }

  // onClose() {
  //   this.bsModalRef.hide();
  // }

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }



}
