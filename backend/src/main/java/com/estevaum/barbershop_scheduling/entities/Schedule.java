package com.estevaum.barbershop_scheduling.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;

@Entity
@Table(name = "tb_schedules")
@Getter
@Setter
@NoArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private OffsetDateTime startAt;

    @Column(nullable = false)
    private OffsetDateTime endAt;

    @ManyToOne()
    @JoinColumn(name = "customer_id")
    private Customer customer;

    public Schedule(OffsetDateTime endAt, OffsetDateTime startAt) {
        this.endAt = endAt;
        this.startAt = startAt;
    }
}
