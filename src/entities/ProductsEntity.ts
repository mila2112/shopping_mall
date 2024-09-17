export class ProductsEntity {
  public id: number;
  public categoryId: number;
  public title: string;
  public sku: string;
  public price: number;
  public description?: string;

  constructor(id: number, categoryId: number, title: string, sku: string, price: number, description?: string) {
    this.id = id;
    this.categoryId = categoryId;
    this.title = title;
    this.sku = sku;
    this.price = price;
    this.description = description;
  }
}
