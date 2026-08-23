package com.joaooliveira.stockFlow.service;

import com.joaooliveira.stockFlow.exception.BusinessException;
import com.joaooliveira.stockFlow.model.Movement;
import com.joaooliveira.stockFlow.model.Product;
import com.joaooliveira.stockFlow.model.TypeMovement;
import com.joaooliveira.stockFlow.repository.MovementRepository;
import com.joaooliveira.stockFlow.repository.ProductRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    
    @Transactional
    public Movement save(Movement movement) {

        if (movement.getQuantity_movement() <= 0) {
            throw new BusinessException(
                "A quantidade da movimentação deve ser maior que zero."
            );
        }

        Product product = productRepository
            .findById(movement.getProduct().getId_product())
            .orElse(null);

        if (product == null) {
            throw new BusinessException(
                "Produto não encontrado."
            );
        }

        if (movement.getType_movement() == TypeMovement.ENTRADA) {

            product.setQuantity_product(
                    product.getQuantity_product()
                    + movement.getQuantity_movement()
            );

        } else if (movement.getType_movement() == TypeMovement.SAIDA) {

            if (movement.getQuantity_movement()
                > product.getQuantity_product()) {

                throw new BusinessException(
                    "Estoque insuficiente para realizar a saída."
                );
            }

            product.setQuantity_product(
                    product.getQuantity_product()
                    - movement.getQuantity_movement()
            );

        } else {

            throw new BusinessException(
                "Tipo de movimentação inválido."
            );
        }

        productRepository.save(product);

        movement.setProduct(product);
        movement.setDate_movement(LocalDate.now());

        return movementRepository.save(movement);
    }
    
    public Movement findById(Integer id) {
        return movementRepository.findById(id).orElse(null);
    }
}
