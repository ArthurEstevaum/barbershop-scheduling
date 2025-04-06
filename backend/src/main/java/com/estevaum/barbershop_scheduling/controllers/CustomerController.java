package com.estevaum.barbershop_scheduling.controllers;

import com.estevaum.barbershop_scheduling.DTOs.ClientInfoDTO;
import com.estevaum.barbershop_scheduling.DTOs.SaveCustomerDTO;
import com.estevaum.barbershop_scheduling.DTOs.SaveCustomerResponse;
import com.estevaum.barbershop_scheduling.entities.Customer;
import com.estevaum.barbershop_scheduling.repositories.CustomerRepository;
import com.estevaum.barbershop_scheduling.services.CustomerService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("customers")
public class CustomerController {

    @Autowired
    private CustomerService service;
    @Autowired
    private CustomerRepository repository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<SaveCustomerResponse> save(@RequestBody @Valid SaveCustomerDTO request){
        Customer storedCustomer = service.save(request);
        var responseBody = new SaveCustomerResponse(storedCustomer.getId(), storedCustomer.getName(), storedCustomer.getEmail(), storedCustomer.getPhoneNumber());
        return ResponseEntity.ok(responseBody);
    }

    @PutMapping("{id}")
    ResponseEntity<SaveCustomerResponse> update(@PathVariable long id, @RequestBody @Valid SaveCustomerDTO request){
        Customer updatedCustomer = service.update(request, id);
        var responseBody = new SaveCustomerResponse(updatedCustomer.getId(), updatedCustomer.getName(), updatedCustomer.getEmail(), updatedCustomer.getPhoneNumber());
        return ResponseEntity.ok(responseBody);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable long id){
        service.delete(id);
    }

    @GetMapping("{id}")
    ResponseEntity<ClientInfoDTO> findById(@PathVariable long id) {
        var entity = repository.findById(id).orElseThrow();
        ClientInfoDTO responseBody = new ClientInfoDTO(entity.getId(), entity.getName(), entity.getEmail(), entity.getPhoneNumber());
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping
    ResponseEntity<List<Customer>> list(){
        var entities = repository.findAll();
        return ResponseEntity.ok(entities);
    }

}
