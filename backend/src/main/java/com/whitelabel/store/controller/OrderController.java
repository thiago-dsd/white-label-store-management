package com.whitelabel.store.controller;

import com.whitelabel.store.model.Customer;
import com.whitelabel.store.model.Order;
import com.whitelabel.store.model.Product;
import com.whitelabel.store.repository.CustomerRepository;
import com.whitelabel.store.repository.OrderRepository;
import com.whitelabel.store.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class OrderController {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public OrderController(OrderRepository orderRepository,
                           CustomerRepository customerRepository,
                           ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    @PostMapping
    public ResponseEntity<Order> create(@Valid @RequestBody Order order) {
        // Validate that customer exists
        Customer customer = customerRepository.findById(order.getCliente().getId()).orElse(null);
        if (customer == null) {
            return ResponseEntity.badRequest().build();
        }

        // Validate that product exists
        Product product = productRepository.findById(order.getProduto().getId()).orElse(null);
        if (product == null) {
            return ResponseEntity.badRequest().build();
        }

        order.setCliente(customer);
        order.setProduto(product);
        Order saved = orderRepository.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> update(@PathVariable Long id, @Valid @RequestBody Order order) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        Customer customer = customerRepository.findById(order.getCliente().getId()).orElse(null);
        Product product = productRepository.findById(order.getProduto().getId()).orElse(null);
        if (customer == null || product == null) {
            return ResponseEntity.badRequest().build();
        }

        Order existing = orderRepository.findById(id).get();
        existing.setCliente(customer);
        existing.setProduto(product);
        existing.setQuantidade(order.getQuantidade());
        return ResponseEntity.ok(orderRepository.save(existing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        orderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
