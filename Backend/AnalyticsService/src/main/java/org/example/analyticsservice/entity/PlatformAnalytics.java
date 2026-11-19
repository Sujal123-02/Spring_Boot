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
@Table(name = "platform_analytics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlatformAnalytics {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "analytics_id", nullable = false, updatable = false)
    private UUID analyticsId;

    @NotNull(message = "Total users is required")
    @PositiveOrZero(message = "Total users must be zero or positive")
    @Builder.Default
    @Column(name = "total_users", nullable = false)
    private Integer totalUsers = 0;

    @NotNull(message = "Total organizers is required")
    @PositiveOrZero(message = "Total organizers must be zero or positive")
    @Builder.Default
    @Column(name = "total_organizers", nullable = false)
    private Integer totalOrganizers = 0;

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

    @NotNull(message = "Total revenue is required")
    @PositiveOrZero(message = "Total revenue must be zero or positive")
    @Digits(integer = 10, fraction = 2, message = "Total revenue must have maximum 10 integer digits and 2 decimal places")
    @Builder.Default
    @Column(name = "total_revenue", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalRevenue = BigDecimal.ZERO;

    @NotNull(message = "Total cancelled bookings is required")
    @PositiveOrZero(message = "Total cancelled bookings must be zero or positive")
    @Builder.Default
    @Column(name = "total_cancelled_bookings", nullable = false)
    private Integer totalCancelledBookings = 0;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @PrePersist
    public void onCreate() {
        this.lastUpdated = LocalDateTime.now();

        if (this.totalUsers == null) {
            this.totalUsers = 0;
        }
        if (this.totalOrganizers == null) {
            this.totalOrganizers = 0;
        }
        if (this.totalActivities == null) {
            this.totalActivities = 0;
        }
        if (this.totalBookings == null) {
            this.totalBookings = 0;
        }
        if (this.totalRevenue == null) {
            this.totalRevenue = BigDecimal.ZERO;
        }
        if (this.totalCancelledBookings == null) {
            this.totalCancelledBookings = 0;
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.lastUpdated = LocalDateTime.now();
    }
}
