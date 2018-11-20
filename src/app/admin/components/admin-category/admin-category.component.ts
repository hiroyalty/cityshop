import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from 'shared/models/category';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';
import { CategoryService } from 'shared/helpers/category.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {

  categories: Category[];
  subscription: Subscription;
  tableResource: DataTableResource<Category>;
  items: Category[] = [];
  itemCount: number;
 
  constructor(private categoryService: CategoryService) {
    this.subscription = this.categoryService.getAll()
      .subscribe(categories => {
        this.categories = categories;
        this.initializeTable(categories);
      });
  }

  private initializeTable(categories: Category[]) {
    this.tableResource = new DataTableResource(categories);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if(!this.tableResource) return;

    this.tableResource.query(params)
    .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredCategories = (query) ?
      this.categories.filter(p => p.$key.toLowerCase().includes(query.toLowerCase())) :
      this.categories;

    this.initializeTable(filteredCategories);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
