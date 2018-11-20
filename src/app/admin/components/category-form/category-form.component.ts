import { NotificationService } from './../../../shared/helpers/notification.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from './../../../shared/helpers/category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  category = {};
  id;
  errorMessage;
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(private categoryService: CategoryService,
    private router: Router, // for navigation
    private route: ActivatedRoute,
    private notificationService: NotificationService
  )  { //to be able to read route parameters.private lowerCasePipe: LowerCasePipe
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.categoryService.getOne(this.id).take(1).subscribe(cate => this.category = cate);
  }

  save(f:NgForm) {
    //console.log(f.value.name);
    
    if (this.id) this.categoryService.update(this.id, f.value.description)
      .then(() => {
        console.log('successful update');
        this.notificationService.notify("success", "Success", "Category Successfully updated");
      }).catch(_error => {
        this.error = _error; 
        this.errorMessage = this.error.message;
        this.notificationService.notify("error", "Failed", "Category update failed");
      }) 
    else this.categoryService.create(f.value.name, f.value.description)
      .then(() => {
        console.log('successful creation');
        this.notificationService.notify("success", "Success", "Category Successfully created");
      }).catch(_error => {
        this.error = _error; 
        this.errorMessage = this.error.message;
        this.notificationService.notify("error", "Failed", "Category creation failed");
      }) 
    this.router.navigate(['/admin/categories']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this category?')) return;

    this.categoryService.delete(this.id)
      .then(() => {
        console.log('successful deletion');
        this.notificationService.notify("success", "Success", "Category Successfully deleted");
      }).catch(_error => {
        this.error = _error; 
        this.errorMessage = this.error.message;
        this.notificationService.notify("error", "Failed", "Category deletion failed");
      }) 
    this.router.navigate(['/admin/categories']);
  }

  ngOnInit() {
  }
}
