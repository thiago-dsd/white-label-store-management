import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderStoreService } from '../../core/order/store/order-store.service';
import { CustomerStoreService } from '../../core/customer/store/customer-store.service';
import { ProductStoreService } from '../../core/product/store/product-store.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orderStore = inject(OrderStoreService);
  customerStore = inject(CustomerStoreService);
  productStore = inject(ProductStoreService);

  form = {
    clienteId: 0,
    produtoId: 0,
    quantidade: 1,
  };

  editingId: number | null = null;

  async ngOnInit() {
    await Promise.all([
      this.orderStore.getAll(),
      this.customerStore.getAll(),
      this.productStore.getAll(),
    ]);
  }

  async onSubmit() {
    if (!this.form.clienteId || !this.form.produtoId || this.form.quantidade < 1) return;

    const payload = {
      cliente: { id: this.form.clienteId },
      produto: { id: this.form.produtoId },
      quantidade: this.form.quantidade,
    };

    if (this.editingId) {
      await this.orderStore.update(this.editingId, payload);
      this.editingId = null;
    } else {
      await this.orderStore.create(payload);
    }

    this.resetForm();
  }

  edit(order: { id: number; cliente: { id: number }; produto: { id: number }; quantidade: number }) {
    this.editingId = order.id;
    this.form = {
      clienteId: order.cliente.id,
      produtoId: order.produto.id,
      quantidade: order.quantidade,
    };
  }

  async remove(id: number) {
    await this.orderStore.delete(id);
  }

  cancel() {
    this.editingId = null;
    this.resetForm();
  }

  private resetForm() {
    this.form = { clienteId: 0, produtoId: 0, quantidade: 1 };
  }
}
