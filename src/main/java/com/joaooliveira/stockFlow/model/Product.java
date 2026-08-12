package com.joaooliveira.stockFlow.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_product;
    private String name_product;
    private double price_product;
    private int quantity_product;

    public int getId_product() {
        return id_product;
    }

    public void setId_product(int id_product) {
        this.id_product = id_product;
    }

    public String getName_product() {
        return name_product;
    }

    public void setName_product(String name_product) {
        this.name_product = name_product;
    }

    public double getPrice_product() {
        return price_product;
    }
    
    public void setPrice_product(double price_product) {
        this.price_product = price_product;
    }

    public int getQuantity_product() {
        return quantity_product;
    }

    public void setQuantity_product(int quantity_product) {
        this.quantity_product = quantity_product;
    }
    
}