package com.estevaum.barbershop_scheduling.services;

import com.estevaum.barbershop_scheduling.entities.Schedule;
import com.estevaum.barbershop_scheduling.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public Schedule save(Schedule schedule) {
        if(scheduleRepository.existsByStartAtAndEndAt(schedule.getStartAt(), schedule.getEndAt())) {
            throw new IllegalArgumentException("Já existe um agendamento no período informado");
        }

        return scheduleRepository.save(schedule);
    }

    public void delete(final long id) {
        scheduleRepository.findById(id);
        scheduleRepository.deleteById(id);
    }
}
