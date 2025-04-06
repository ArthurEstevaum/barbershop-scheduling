package com.estevaum.barbershop_scheduling.DTOs;

import jakarta.validation.constraints.NotNull;

import java.time.OffsetDateTime;

public record SaveScheduleDTO(@NotNull OffsetDateTime startAt, @NotNull OffsetDateTime endAt, @NotNull Long id) {
}
