export interface CreateOrder {
  cliente: { id: number };
  produto: { id: number };
  quantidade: number;
}
