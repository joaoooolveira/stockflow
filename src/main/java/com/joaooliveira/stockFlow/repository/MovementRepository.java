package com.joaooliveira.stockFlow.repository;

import com.joaooliveira.stockFlow.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovementRepository extends JpaRepository<Movement, Integer>{
    
}
