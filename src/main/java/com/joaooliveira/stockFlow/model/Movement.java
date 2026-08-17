package com.joaooliveira.stockFlow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;

@Entity
public class Movement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_movement;
    
    @ManyToOne
    private Product product;
    
    @Enumerated(EnumType.STRING)
    private TypeMovement type_movement;
    private int quantity_movement;
    private LocalDate date_movement;

    public Integer getId_movement() {
        return id_movement;
    }

    public void setId_movement(Integer id_movement) {
        this.id_movement = id_movement;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity_movement() {
        return quantity_movement;
    }

    public TypeMovement getType_movement() {
        return type_movement;
    }

    public void setType_movement(TypeMovement type_movement) {
        this.type_movement = type_movement;
    }

    public void setQuantity_movement(int quantity_movement) {
        this.quantity_movement = quantity_movement;
    }

    public LocalDate getDate_movement() {
        return date_movement;
    }

    public void setDate_movement(LocalDate date_movement) {
        this.date_movement = date_movement;
    }
    
    
}
