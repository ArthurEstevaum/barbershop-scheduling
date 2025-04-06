package com.estevaum.barbershop_scheduling.DTOs;

import com.estevaum.barbershop_scheduling.entities.Schedule;

import java.util.List;

public record ListSchedulesResponse(Integer year, Integer month, List<Schedule> schedules) {
}
