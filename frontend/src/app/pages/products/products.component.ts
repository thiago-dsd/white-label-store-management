import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductStoreService } from '../../core/product/store/product-store.service';
import { CreateProduct } from '../../core/product/model/create-product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  store = inject(ProductStoreService);

  form: CreateProduct = {
    nome: '',
    preco: 0,
    estoque: true,
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

  edit(product: { id: number; nome: string; preco: number; estoque: boolean }) {
    this.editingId = product.id;
    this.form = { nome: product.nome, preco: product.preco, estoque: product.estoque };
  }

  async remove(id: number) {
    await this.store.delete(id);
  }

  cancel() {
    this.editingId = null;
    this.resetForm();
  }

  private resetForm() {
    this.form = { nome: '', preco: 0, estoque: true };
  }
}
