package com.estevaum.barbershop_scheduling.services;

import com.estevaum.barbershop_scheduling.DTOs.SaveCustomerDTO;
import com.estevaum.barbershop_scheduling.entities.Customer;
import com.estevaum.barbershop_scheduling.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer save(SaveCustomerDTO customer) {
        boolean phoneNumberAlreadyInUse = customerRepository.existsByPhoneNumber(customer.phoneNumber());
        boolean emailAlreadyInUse = customerRepository.existsByEmail(customer.email());

        if(phoneNumberAlreadyInUse || emailAlreadyInUse) {
            throw new IllegalArgumentException("E-mail ou Número de telefone já estão em uso");
        }
        Customer newCustomer = new Customer(customer.name(), customer.email(), customer.phoneNumber());
        return customerRepository.save(newCustomer);
    }

    public Customer update(SaveCustomerDTO customer, Long id) {
        var stored = customerRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Nenhum cliente encontrado com esse Id"));
        stored.setName(customer.name());
        stored.setPhoneNumber(customer.name());
        stored.setEmail(customer.name());
        return customerRepository.save(stored);
    }

    public void delete(long id) {
        customerRepository.findById(id);
        customerRepository.deleteById(id);
    }
}
