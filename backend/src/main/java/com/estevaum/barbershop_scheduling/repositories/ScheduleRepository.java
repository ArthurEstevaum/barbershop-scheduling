package com.estevaum.barbershop_scheduling.repositories;

import com.estevaum.barbershop_scheduling.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByStartAtGreaterThanEqualAndEndAtLessThanEqualOrderByStartAtAscEndAtAsc(OffsetDateTime startAt, OffsetDateTime endAt);
    boolean existsByStartAtAndEndAt(OffsetDateTime startAt, OffsetDateTime endAt);
}
