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
    
    public void deleteById(Integer id) {
        categoryRepository.deleteById(id);
    }
    
    public Category update(Integer id, Category category) {

        Category categoryDatabase = categoryRepository.findById(id).orElse(null);

        if (categoryDatabase == null) {
            return null;
        }

        categoryDatabase.setName_category(category.getName_category());

        return categoryRepository.save(categoryDatabase);
    }
}