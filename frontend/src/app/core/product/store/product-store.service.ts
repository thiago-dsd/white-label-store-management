import { Injectable, inject } from '@angular/core';
import { ProductControllerService } from '../controller/product-controller.service';
import { Product } from '../entity/product.entity';
import { CreateProduct } from '../model/create-product.model';
import { UpdateProduct } from '../model/update-product.model';

@Injectable({ providedIn: 'root' })
export class ProductStoreService {
  private controller = inject(ProductControllerService);

  products: Product[] = [];
  isLoading = false;

  async getAll(): Promise<void> {
    this.isLoading = true;
    try {
      this.products = await this.controller.getAll();
    } finally {
      this.isLoading = false;
    }
  }

  async getById(id: number): Promise<Product> {
    return this.controller.getById(id);
  }

  async create(data: CreateProduct): Promise<Product> {
    const created = await this.controller.create(data);
    this.products = [...this.products, created];
    return created;
  }

  async update(id: number, data: UpdateProduct): Promise<Product> {
    const updated = await this.controller.update(id, data);
    this.products = this.products.map((p) => (p.id === id ? updated : p));
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.controller.delete(id);
    this.products = this.products.filter((p) => p.id !== id);
  }
}
