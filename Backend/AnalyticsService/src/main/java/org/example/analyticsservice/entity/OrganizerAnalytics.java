package org.example.analyticsservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "organizer_analytics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizerAnalytics {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "analytics_id", nullable = false, updatable = false)
    private UUID analyticsId;


    @NotNull(message = "Organizer ID is required")
    @Column(name = "organizer_id", nullable = false, unique = true)
    private UUID organizerId;

    @NotNull(message = "Total activities is required")
    @PositiveOrZero(message = "Total activities must be zero or positive")
    @Builder.Default
    @Column(name = "total_activities", nullable = false)
    private Integer totalActivities = 0;

    @NotNull(message = "Total bookings is required")
    @PositiveOrZero(message = "Total bookings must be zero or positive")
    @Builder.Default
    @Column(name = "total_bookings", nullable = false)
    private Integer totalBookings = 0;

    @NotNull(message = "Successful bookings is required")
    @PositiveOrZero(message = "Successful bookings must be zero or positive")
    @Builder.Default
    @Column(name = "successful_bookings", nullable = false)
    private Integer successfulBookings = 0;

    @NotNull(message = "Cancelled bookings is required")
    @PositiveOrZero(message = "Cancelled bookings must be zero or positive")
    @Builder.Default
    @Column(name = "cancelled_bookings", nullable = false)
    private Integer cancelledBookings = 0;

    @NotNull(message = "Total revenue is required")
    @PositiveOrZero(message = "Total revenue must be zero or positive")
    @Digits(integer = 10, fraction = 2, message = "Total revenue must have maximum 10 integer digits and 2 decimal places")
    @Builder.Default
    @Column(name = "total_revenue", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalRevenue = BigDecimal.ZERO;

    @NotNull(message = "Total attendees is required")
    @PositiveOrZero(message = "Total attendees must be zero or positive")
    @Builder.Default
    @Column(name = "total_attendees", nullable = false)
    private Integer totalAttendees = 0;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @PrePersist
    public void onCreate() {
        this.lastUpdated = LocalDateTime.now();

        if (this.totalActivities == null) {
            this.totalActivities = 0;
        }
        if (this.totalBookings == null) {
            this.totalBookings = 0;
        }
        if (this.successfulBookings == null) {
            this.successfulBookings = 0;
        }
        if (this.cancelledBookings == null) {
            this.cancelledBookings = 0;
        }
        if (this.totalRevenue == null) {
            this.totalRevenue = BigDecimal.ZERO;
        }
        if (this.totalAttendees == null) {
            this.totalAttendees = 0;
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.lastUpdated = LocalDateTime.now();
    }
}
