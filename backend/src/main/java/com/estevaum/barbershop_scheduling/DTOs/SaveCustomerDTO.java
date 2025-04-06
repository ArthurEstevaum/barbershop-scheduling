package com.estevaum.barbershop_scheduling.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record SaveCustomerDTO(@NotNull String name, @NotNull @Email String email, @NotNull String phoneNumber) {
}
