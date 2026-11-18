package com.jetbrains.booking.entity;

import com.jetbrains.booking.enums.BookingStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * Root domain entity representing a user's booking for an experience session.
 * Cross-service references (session, user, payment) are stored strictly as UUIDs.
 * Enforces business rule: A user can hold only one booking per experience session.
 */
@Entity
@Table(
        name = "bookings",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_booking_session_user",
                        columnNames = {"session_id", "user_id"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    /**
     * Cross-service reference to Experience Session aggregate (Experience Service).
     */
    @NotNull(message = "Session ID is mandatory")
    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    /**
     * Cross-service reference to User aggregate (User / Auth Service).
     */
    @NotNull(message = "User ID is mandatory")
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    /**
     * Cross-service reference to Payment aggregate (Payment Service).
     * Nullable initially while booking is in PENDING state.
     */
    @Column(name = "payment_id")
    private UUID paymentId;

    @NotNull(message = "Booking status is required")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "booking_status", nullable = false, length = 20)
    private BookingStatus bookingStatus = BookingStatus.PENDING;

    @NotNull(message = "Booking time is mandatory")
    @Column(name = "booking_time", nullable = false)
    private Instant bookingTime;

    @NotNull(message = "Number of seats is required")
    @Positive(message = "Number of seats must be at least 1")
    @Column(name = "number_of_seats", nullable = false)
    private Integer numberOfSeats;

    /**
     * Intra-service relationship: Attendance check-in record for this booking.
     */
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Attendance attendance;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
        if (this.bookingTime == null) {
            this.bookingTime = Instant.now();
        }
        if (this.bookingStatus == null) {
            this.bookingStatus = BookingStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
