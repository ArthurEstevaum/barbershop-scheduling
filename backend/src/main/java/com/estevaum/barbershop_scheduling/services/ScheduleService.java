package com.estevaum.barbershop_scheduling.services;

import com.estevaum.barbershop_scheduling.DTOs.SaveScheduleDTO;
import com.estevaum.barbershop_scheduling.entities.Schedule;
import com.estevaum.barbershop_scheduling.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public Schedule save(SaveScheduleDTO request) {
        if(scheduleRepository.existsByStartAtAndEndAt(request.startAt(), request.endAt())) {
            throw new IllegalArgumentException("Já existe um agendamento no período informado");
        }
        Schedule newSchedule = new Schedule(request.endAt(), request.startAt());
        return scheduleRepository.save(newSchedule);
    }

    public void delete(final long id) {
        scheduleRepository.findById(id);
        scheduleRepository.deleteById(id);
    }
}
