import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../entity/product.entity';
import { CreateProduct } from '../model/create-product.model';
import { UpdateProduct } from '../model/update-product.model';

@Injectable({ providedIn: 'root' })
export class ProductControllerService {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/produtos`;

  async getAll(): Promise<Product[]> {
    return firstValueFrom(this.http.get<Product[]>(this.path));
  }

  async getById(id: number): Promise<Product> {
    return firstValueFrom(this.http.get<Product>(`${this.path}/${id}`));
  }

  async create(data: CreateProduct): Promise<Product> {
    return firstValueFrom(this.http.post<Product>(this.path, data));
  }

  async update(id: number, data: UpdateProduct): Promise<Product> {
    return firstValueFrom(this.http.put<Product>(`${this.path}/${id}`, data));
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.path}/${id}`));
  }
}
