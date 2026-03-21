import { Routes } from '@angular/router';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: CustomersComponent },
  { path: 'produtos', component: ProductsComponent },
  { path: 'pedidos', component: OrdersComponent },
];
