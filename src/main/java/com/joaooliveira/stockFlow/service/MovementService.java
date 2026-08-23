package com.joaooliveira.stockFlow.service;

import com.joaooliveira.stockFlow.model.Movement;
import com.joaooliveira.stockFlow.model.Product;
import com.joaooliveira.stockFlow.model.TypeMovement;
import com.joaooliveira.stockFlow.repository.MovementRepository;
import com.joaooliveira.stockFlow.repository.ProductRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MovementService {
    
    private final MovementRepository movementRepository;
    private final ProductRepository productRepository;
    
    public MovementService(
            MovementRepository movementRepository,
            ProductRepository productRepository) {
        this.movementRepository = movementRepository;
        this.productRepository = productRepository;
    }
    
    public List<Movement> findAll() {
        return movementRepository.findAll();
    }
    
    public Movement save(Movement movement) {

        Product product = productRepository
                .findById(movement.getProduct().getId_product())
                .orElse(null);

        if (product == null) {
            return null;
        }

        if (movement.getType_movement() == TypeMovement.ENTRADA) {

            product.setQuantity_product(
                    product.getQuantity_product()
                    + movement.getQuantity_movement()
            );

        } else if (movement.getType_movement() == TypeMovement.SAIDA) {

            if (movement.getQuantity_movement() > product.getQuantity_product()) {
                return null;
            }

            product.setQuantity_product(
                    product.getQuantity_product()
                    - movement.getQuantity_movement()
            );
        }

        productRepository.save(product);

        movement.setProduct(product);

        movement.setDate_movement(LocalDate.now());

        return movementRepository.save(movement);
    }
}
