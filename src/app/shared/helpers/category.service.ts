import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  create(key, description) {
    //return this.db.list(`/categories/${key}`).push(category);
    // const toSend = this.db.object(`/categories/${key}`);
    // toSend.set(category);
    // return toSend;
    //const toSend = this.db.database.ref().child(`categories/${key}/`).set(category);  //.object('/categories');
    //toSend.update({ [key]: category });
    //return toSend;
    let firebaseObservable = this.db.object(`/categories`);
    var updates = {};
    updates[key] = {
      name: key,
      description: description
    };
    return firebaseObservable.update(updates);
  }

  getOne(categoryName) {
    return this.db.object('/categories/' + categoryName);
  }

  update(categoryName, description) {
    //note dis applies to firebase db. passing two params
    return this.db.object('/categories/' + categoryName).update({ description: description });
  }

  delete(categoryName) {
    return this.db.object('/categories/' + categoryName).remove();
  }

  //getCategory(category) {
  //  return this.db.list('/categories').$ref.isEqual(category);
  //}
}
