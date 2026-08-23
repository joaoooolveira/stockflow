package com.joaooliveira.stockFlow.controller;

import com.joaooliveira.stockFlow.model.Movement;
import com.joaooliveira.stockFlow.service.MovementService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/movements")
public class MovementController {

    private final MovementService movementService;

    public MovementController(MovementService movementService) {
        this.movementService = movementService;
    }

    @GetMapping
    public List<Movement> findAll() {
        return movementService.findAll();
    }
    
    @PostMapping
    public Movement save(@RequestBody Movement movement) {
        return movementService.save(movement);
    }
    
    @GetMapping("/{id}")
    public Movement findById(@PathVariable Integer id) {
        return movementService.findById(id);
    }
}
