import { Customer } from '../../customer/entity/customer.entity';
import { Product } from '../../product/entity/product.entity';

export interface Order {
  id: number;
  cliente: Customer;
  produto: Product;
  quantidade: number;
}
