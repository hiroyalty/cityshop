import { NotificationService } from './../../../shared/helpers/notification.service';
import { Product } from './../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/helpers/product.service';
import { CategoryService } from '../../../shared/helpers/category.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import 'rxjs/add/operator/take';
import * as _ from "lodash";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  selectedFiles: FileList;
  selectMoreFiles: FileList;
  filename;
  currentUpload: Product;
  categories$;
  product = {}; 
  //product: Product;
  form;
  id;
  errorMessage;
  error: {name: string, message: string} = {name: '', message: ''};
 
  constructor(
    private router: Router, // for navigation
    private route: ActivatedRoute, //to be able to read route parameters.
    private categoryService: CategoryService, // To be able to preload the category service into our form.
    private productService: ProductService,
    private notificationService: NotificationService,
    private zone: NgZone,
    private fb: FormBuilder
  ) 
    {  // to load new product into d database
      this.categories$ = categoryService.getAll();

      //this.createForm();
    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.getOne(this.id).take(1).subscribe(p => {
      this.product = p; 
      this.currentUpload = p;
      //console.log(this.currentUpload);
      //console.log(JSON.stringify(this.currentUpload));
      /*this.form.setValue({
        'title': this.product.title,
        'price': this.product.price,
        'category': this.product.category,
        'description': this.product.description
        //'imageUrl' : ''
      });*/
    });
  }

  createForm() {
    this.form = this.fb.group({
      title : ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
      price : ['', Validators.required],
      description : ['', Validators.required],
      category : [''],
      //imageUrl : [''],
    });
  }
 
  save(product) {
    console.log(product.title);
    if (this.id && (!this.selectedFiles)) { //just want to update product text fields
      this.productService.update(this.id, product)
        .then(() => {
          console.log('product update success');
          this.notificationService.notify("success", "Updated", "Product Update Successful");
        }).catch(_error => {
          this.error = _error; 
          this.errorMessage = this.error.message;
          this.notificationService.notify("error", "Failed", "Category creation failed");
        }) 
    } else if(!this.selectedFiles) { //new product but no selected files
        this.notificationService.notify("error", "Failed", "Select Image for the product");
        return;
    } else { //new product and have selected files.
      this.uploadSingle(product); //this.productService.create(product);
      //this.uploadMulti(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    console.log('product id is '+ this.id);
    console.log(this.currentUpload.filename);
    this.productService.deleteProduct(this.id, this.currentUpload.filename)
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

  /*
    Upload files
  */
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  detectMoreFiles(event) {
    this.selectMoreFiles = event.target.files;
  }

  uploadSingle(product) {
    let file = this.selectedFiles.item(0)
    //let file = this.selectedFiles;
    this.currentUpload = new Product(file, product.title, product.price, product.category, product.description);
    //this.product = new Product(file);
    this.productService.pushMultipleUpload(this.currentUpload);

  }

  uploadMultiFiles() {
    if(this.currentUpload) {
      let files = this.selectMoreFiles;
      //this.currentUpload = new Product(product.title, product.price, product.category, files);
      let filesIndex = _.range(files.length)
      _.each(filesIndex, (idx) => {
        this.productService.pushMorePicsUpload(this.currentUpload, files[idx]);
      })
      this.router.navigate(['/admin/products']);
    }
  }
  
}
