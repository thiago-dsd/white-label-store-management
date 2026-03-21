import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../entity/order.entity';
import { CreateOrder } from '../model/create-order.model';
import { UpdateOrder } from '../model/update-order.model';

@Injectable({ providedIn: 'root' })
export class OrderControllerService {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/pedidos`;

  async getAll(): Promise<Order[]> {
    return firstValueFrom(this.http.get<Order[]>(this.path));
  }

  async getById(id: number): Promise<Order> {
    return firstValueFrom(this.http.get<Order>(`${this.path}/${id}`));
  }

  async create(data: CreateOrder): Promise<Order> {
    return firstValueFrom(this.http.post<Order>(this.path, data));
  }

  async update(id: number, data: UpdateOrder): Promise<Order> {
    return firstValueFrom(this.http.put<Order>(`${this.path}/${id}`, data));
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.path}/${id}`));
  }
}
