import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateCustomer } from '../../core/customer/model/create-customer.model';
import { CustomerStoreService } from '../../core/customer/store/customer-store.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  store = inject(CustomerStoreService);

  form: CreateCustomer = {
    nome: '',
    clienteDesde: new Date().toISOString().split('T')[0],
  };

  editingId: number | null = null;

  async ngOnInit() {
    await this.store.getAll();
  }

  async onSubmit() {
    if (!this.form.nome) return;

    if (this.editingId) {
      await this.store.update(this.editingId, this.form);
      this.editingId = null;
    } else {
      await this.store.create(this.form);
    }

    this.resetForm();
  }

  edit(customer: { id: number; nome: string; clienteDesde: string }) {
    this.editingId = customer.id;
    this.form = { nome: customer.nome, clienteDesde: customer.clienteDesde };
  }

  async remove(id: number) {
    await this.store.delete(id);
  }

  cancel() {
    this.editingId = null;
    this.resetForm();
  }

  private resetForm() {
    this.form = {
      nome: '',
      clienteDesde: new Date().toISOString().split('T')[0],
    };
  }
}
