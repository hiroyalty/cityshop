import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import * as firebase from 'firebase';

@Injectable()
export class ProductService {
  private basePath:string = '/products';
  //private basePath:string = '/uploads';
  uploads: FirebaseListObservable<Product[]>;

  constructor(private db: AngularFireDatabase) { }

  private create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }

  getOne(productId) {
    return this.db.object('/products/' + productId);
  }

  update(productId, product: Product) {
    if(product.file) {

    }
    return this.db.object('/products/' + productId).update(product); //note dis applies to firebase db. passing two params
  }

  lazyUpdate(productId, product: Product) {
    return this.db.object('/products/' + productId).update(product);
    // let firebaseObservable = this.db.object(`/products`);
    // var updates = {};
    // updates[key] = {
    //   name: key,
    //   description: description
    // };
    // return firebaseObservable.update(updates);
  }

  private delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

  deleteFileRecordFromProductDb(productId, nameKey, linkKey, product: Product) {
    let index = product.filename.indexOf(nameKey, 0);
    if (index > -1) {
      product.filename.splice(index, 1);
      this.deleteFileStorage(nameKey);
      let index2 = product.imageUrl.indexOf(linkKey, 0);
      if (index2 > -1) {
        product.imageUrl.splice(index2, 1);
        this.lazyUpdate(productId, product);
      }
    }
  }

  /*
    file upload and deletion section
  */

  // pushUpload(upload: Product) {
  //   let storageRef = firebase.storage().ref();
  //   let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

  //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //     (snapshot) =>  {
  //       // upload in progress
  //       upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
  //     },
  //     (error) => {
  //       // upload failed
  //       console.log(error)
  //     },
  //     () => {
  //       // upload success
  //       upload.imageUrl = uploadTask.snapshot.downloadURL
  //       upload.filename = upload.file.name
  //       this.saveFileData(upload);
  //       //this.create(upload)
  //     }
  //   );
  // }

 // Writes the file details to the realtime db
 private saveFileData(upload: Product) {
   this.db.list(`${this.basePath}/`).push(upload);
 }

 //delete file
  deleteProduct(productKey, productFilenames) {
    //this.deleteFileData(productKey)
    this.delete(productKey)
    .then( () => {
      productFilenames.forEach(element => {
        this.deleteFileStorage(element);
      });
    })
    .catch(error => console.log(error))
  }

  // Deletes the file details from the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name:string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

  private generateFileName(name: string) {
    let nameOfFile = new Date().getTime();
    let str3 = nameOfFile.toString().concat( name );
    return str3;
  }
 
  pushMultipleUpload(upload: Product) {
    let storageRef = firebase.storage().ref();
    let nowFileName = this.generateFileName(upload.file.name);
    
    //for (let file of upload.files) {
      //let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
      let uploadTask = storageRef.child(`${this.basePath}/${nowFileName}`).put(upload.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          let seeProgress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
          upload.progress.push(seeProgress);
        },
        (error) => {
          // upload failed
          console.log(error);
          //throw error;
        },
        () => {
          // upload success
          upload.imageUrl.push(uploadTask.snapshot.downloadURL);
          upload.filename.push(nowFileName);
          //this.create(upload)
          //this.lazyUpdate(upload.$key, upload);
          this.saveFileData(upload);
        }
      );
  }

  pushMorePicsUpload(upload: Product, file) {
    // console.log('my key is '+ upload.$key);
    // console.log(file);

    let storageRef = firebase.storage().ref();

    let nowFileName = this.generateFileName(file.name);
    //for (let file of upload.files) {
      //let uploadTask = storageRef.child(`${this.basePath}/${file.name}`).put(file);
      let uploadTask = storageRef.child(`${this.basePath}/${nowFileName}`).put(file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          let seeProgress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
          upload.progress.push(seeProgress);
        },
        (error) => {
          // upload failed
          console.log(error);
          //throw error;
        },
        () => {
          // upload success
          upload.imageUrl.push(uploadTask.snapshot.downloadURL);
          upload.filename.push(nowFileName);
          this.lazyUpdate(upload.$key, upload);
        }
      );
  }
}