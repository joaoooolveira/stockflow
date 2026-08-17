package com.joaooliveira.stockFlow.repository;

import com.joaooliveira.stockFlow.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
    
}
