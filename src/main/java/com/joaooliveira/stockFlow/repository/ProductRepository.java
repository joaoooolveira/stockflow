package com.joaooliveira.stockFlow.repository;

import com.joaooliveira.stockFlow.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer>{
    
}
