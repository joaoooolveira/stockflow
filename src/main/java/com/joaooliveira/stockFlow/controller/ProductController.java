package com.joaooliveira.stockFlow.controller;

import com.joaooliveira.stockFlow.model.Product;
import com.joaooliveira.stockFlow.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductController {
    
    private final ProductService productService;
    
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    
    @GetMapping
    public List<Product> findAll() {
        return productService.findAll();
    }
    
    @PostMapping
    public Product save(@RequestBody Product product) {
       return productService.save(product);
    }
    
    @GetMapping("/{id}")
    public Product findById(@PathVariable Integer id) {
        return productService.findById(id);
    }
}
