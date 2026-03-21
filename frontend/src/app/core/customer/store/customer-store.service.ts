import { Injectable, inject } from '@angular/core';
import { CustomerControllerService } from '../controller/customer-controller.service';
import { Customer } from '../entity/customer.entity';
import { CreateCustomer } from '../model/create-customer.model';
import { UpdateCustomer } from '../model/update-customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerStoreService {
  private controller = inject(CustomerControllerService);

  customers: Customer[] = [];
  isLoading = false;

  async getAll(): Promise<void> {
    this.isLoading = true;
    try {
      this.customers = await this.controller.getAll();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getById(id: number): Promise<Customer> {
    return this.controller.getById(id);
  }

  async create(data: CreateCustomer): Promise<Customer> {
    const created = await this.controller.create(data);
    this.customers = [...this.customers, created];
    return created;
  }

  async update(id: number, data: UpdateCustomer): Promise<Customer> {
    const updated = await this.controller.update(id, data);
    this.customers = this.customers.map((c) => (c.id === id ? updated : c));
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.controller.delete(id);
    this.customers = this.customers.filter((c) => c.id !== id);
  }
}
