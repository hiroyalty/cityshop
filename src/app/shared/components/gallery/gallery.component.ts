import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/helpers/product.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @Input('product') product: Product;
  closeResult: string;
  selectedImage;
  seePrevious: boolean = false;
  seeNext: boolean = true;


  constructor(private modalService: NgbModal, 
    private productService: ProductService) { }

  setSelectedImage(image){
    this.selectedImage= image;	
  }

  getSelectImageIndex() {
    let imageIndex = this.product.imageUrl.indexOf(this.selectedImage);
    return imageIndex;
  }

  setNextAndPrevious() {
    let myImageIndex = this.getSelectImageIndex();
    if((myImageIndex) == 0) {
      this.seePrevious = false;
      this.seeNext = true;
    } else if((myImageIndex + 1) >= this.product.imageUrl.length) {
      this.seePrevious = true;
      this.seeNext = false;
    } else {
      this.seePrevious = true;
      this.seeNext = true;
    }
  }

  open(content, image) {
    this.setSelectedImage(image);
    this.setNextAndPrevious();
    this.modalService.open(content, { size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  navigate(forward){
    let index = this.product.imageUrl.indexOf(this.selectedImage)+(forward ? 1: -1);
    if(index >= 0 && index < this.product.imageUrl.length){
      this.selectedImage = this.product.imageUrl[index];	
    }
    this.setNextAndPrevious();
  }

  navigateBack(forward){
    let index = this.product.imageUrl.indexOf(this.selectedImage)+(forward ? -1: 1);
    if(index >= 0 && index < this.product.imageUrl.length){
      this.selectedImage = this.product.imageUrl[index];	
    }
    this.setNextAndPrevious();
  }

  deleteFile() {
    if (!confirm('Are you sure you want to delete this Image?')) return;
    console.log(this.product.$key);
    let imgIndex = this.getSelectImageIndex();
    let fileNameKey = this.product.filename[imgIndex];
    let fileLinkKey = this.product.imageUrl[imgIndex]
    console.log(this.product.filename[imgIndex]);
    console.log(this.product.imageUrl[imgIndex]);
    this.productService.deleteFileRecordFromProductDb(this.product.$key, 
      fileNameKey, fileLinkKey, this.product );
  }

  ngOnInit() {
  }

}