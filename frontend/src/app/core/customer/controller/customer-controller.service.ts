import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Customer } from '../entity/customer.entity';
import { CreateCustomer } from '../model/create-customer.model';
import { UpdateCustomer } from '../model/update-customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerControllerService {
  private http = inject(HttpClient);
  private path = `${environment.apiUrl}/clientes`;

  async getAll(): Promise<Customer[]> {
    return firstValueFrom(this.http.get<Customer[]>(this.path));
  }

  async getById(id: number): Promise<Customer> {
    return firstValueFrom(this.http.get<Customer>(`${this.path}/${id}`));
  }

  async create(data: CreateCustomer): Promise<Customer> {
    return firstValueFrom(this.http.post<Customer>(this.path, data));
  }

  async update(id: number, data: UpdateCustomer): Promise<Customer> {
    return firstValueFrom(this.http.put<Customer>(`${this.path}/${id}`, data));
  }

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.path}/${id}`));
  }
}
