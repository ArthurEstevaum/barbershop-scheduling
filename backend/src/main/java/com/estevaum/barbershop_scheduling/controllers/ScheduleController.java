package com.estevaum.barbershop_scheduling.controllers;

import com.estevaum.barbershop_scheduling.DTOs.ListSchedulesResponse;
import com.estevaum.barbershop_scheduling.DTOs.SaveScheduleDTO;
import com.estevaum.barbershop_scheduling.entities.Schedule;
import com.estevaum.barbershop_scheduling.repositories.ScheduleRepository;
import com.estevaum.barbershop_scheduling.services.ScheduleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.time.ZoneOffset;

@RestController
@RequestMapping("schedules")
public class ScheduleController {

    @Autowired
    private ScheduleRepository repository;
    @Autowired
    private ScheduleService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    ResponseEntity<Schedule> save(@RequestBody @Valid SaveScheduleDTO request){
        Schedule storedSchedule = service.save(request);

        return ResponseEntity.ok(storedSchedule);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable long id){
        service.delete(id);
    }

    @GetMapping("{year}/{month}")
    ResponseEntity<ListSchedulesResponse> listMonth(@PathVariable int year, @PathVariable int month){
        var yearMonth = YearMonth.of(year, month);
        var startAt = yearMonth.atDay(1)
                .atTime(0, 0, 0, 0)
                .atOffset(ZoneOffset.UTC);
        var endAt = yearMonth.atEndOfMonth()
                .atTime(23, 59, 59, 999_999_999)
                .atOffset(ZoneOffset.UTC);
        var entities = repository.findByStartAtGreaterThanEqualAndEndAtLessThanEqualOrderByStartAtAscEndAtAsc(startAt, endAt);
        var responseBody = new ListSchedulesResponse(year, month, entities);
        return ResponseEntity.ok(responseBody);
    }
}
