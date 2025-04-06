package com.estevaum.barbershop_scheduling.services;

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

    public Customer save(Customer customer) {
        boolean phoneNumberAlreadyInUse = customerRepository.existsByPhoneNumber(customer.getPhoneNumber());
        boolean emailAlreadyInUse = customerRepository.existsByEmail(customer.getEmail());

        if(phoneNumberAlreadyInUse || emailAlreadyInUse) {
            throw new IllegalArgumentException("E-mail ou Número de telefone já estão em uso");
        }
        return customerRepository.save(customer);
    }

    public Customer update(Customer customer) {
        var stored = customerRepository.findById(customer.getId()).orElseThrow(() -> new NoSuchElementException("Nenhum cliente encontrado com esse Id"));
        stored.setName(customer.getName());
        stored.setPhoneNumber(customer.getPhoneNumber());
        stored.setEmail(customer.getEmail());
        return customerRepository.save(stored);
    }

    public void delete(long id) {
        customerRepository.findById(id);
        customerRepository.deleteById(id);
    }
}
