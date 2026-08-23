package com.joaooliveira.stockFlow.service;

import com.joaooliveira.stockFlow.model.Category;
import com.joaooliveira.stockFlow.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }
    
    public Category save(Category category) {
        return categoryRepository.save(category);
    }
    
    public Category findById(Integer id) {
        return categoryRepository.findById(id).orElse(null);
    }
}