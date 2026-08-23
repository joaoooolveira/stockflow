package com.joaooliveira.stockFlow.service;

import com.joaooliveira.stockFlow.model.Product;
import com.joaooliveira.stockFlow.repository.ProductRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
    
    public List<Product> findAll() {
        return productRepository.findAll();
    }
    
    public Product save(Product product) {
        return productRepository.save(product);
    }
    
    public Product findById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }
    
    public void deleteById(Integer id) {
        productRepository.deleteById(id);
    }
    
    public Product update(Integer id, Product product) {

        Product productDatabase = productRepository.findById(id).orElse(null);

        if (productDatabase == null) {
            return null;
        }

        productDatabase.setName_product(product.getName_product());
        productDatabase.setPrice_product(product.getPrice_product());
        productDatabase.setQuantity_product(product.getQuantity_product());
        productDatabase.setCategory(product.getCategory());

        return productRepository.save(productDatabase);
    }
}
