package com.springrest.venue.entities;

import jakarta.persistence.*;

import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@Table(
        name = "venue_operating_hours",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_venue_day",
                        columnNames = {"venue_id", "day_of_week"}
                )
        }
)
@Getter
@Setter
@RequiredArgsConstructor
public class VenueOperatingHours {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "operating_hours_id")
    private UUID operatingHoursId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "venue_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_hours_venue")
    )
    private Venue venue;

    @Enumerated(EnumType.STRING)
    @Column(name = "day_of_week", nullable = false, length = 15)
    private DayOfWeek dayOfWeek;

    @Column(name = "opening_time")
    private LocalTime openingTime;

    @Column(name = "closing_time")
    private LocalTime closingTime;

    @Column(name = "is_closed", nullable = false)
    private boolean closed = false;
}