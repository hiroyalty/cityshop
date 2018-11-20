
export class Product {
    // $key: string;
    // title: string;
    // price: number;
    // category: string;
    // description: string;
    // file: File;
    // filename: string;
    // imageUrl: string;
    // progress: number;
    // createdAt: Date = new Date();
 
    // constructor(file:File, title, price, category) {
    //     this.file = file;
    //     this.title = title;
    //     this.price = price;
    //     this.category = category;
    // }
    $key: string;
    title: string;
    price: number;
    category: string;
    description: string;
    file: File;
    filename: Array<string>;
    imageUrl: Array<string>;
    progress: Array<number>;
    createdAt: Date = new Date();

    constructor(file:File, title, price, category, description) {
        this.file = file;
        this.title = title;
        this.price = price;
        this.category = category;
        this.description = description;
        this.filename = [];
        this.imageUrl = [];
        this.progress = [];

    }
}