import { Injectable, inject } from '@angular/core';
import { OrderControllerService } from '../controller/order-controller.service';
import { Order } from '../entity/order.entity';
import { CreateOrder } from '../model/create-order.model';
import { UpdateOrder } from '../model/update-order.model';

@Injectable({ providedIn: 'root' })
export class OrderStoreService {
  private controller = inject(OrderControllerService);

  orders: Order[] = [];
  isLoading = false;

  async getAll(): Promise<void> {
    this.isLoading = true;
    try {
      this.orders = await this.controller.getAll();
    } finally {
      this.isLoading = false;
    }
  }

  async getById(id: number): Promise<Order> {
    return this.controller.getById(id);
  }

  async create(data: CreateOrder): Promise<Order> {
    const created = await this.controller.create(data);
    this.orders = [...this.orders, created];
    return created;
  }

  async update(id: number, data: UpdateOrder): Promise<Order> {
    const updated = await this.controller.update(id, data);
    this.orders = this.orders.map((o) => (o.id === id ? updated : o));
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.controller.delete(id);
    this.orders = this.orders.filter((o) => o.id !== id);
  }
}
