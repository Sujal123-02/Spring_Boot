package com.jetbrains.experience.entity;

import com.jetbrains.experience.enums.SessionStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

/**
 * Represents a concrete scheduled session / slot for an experience.
 * Belongs directly to the parent Experience aggregate.
 */
@Entity
@Table(name = "experience_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    /**
     * Intra-service relationship: The parent experience this session belongs to.
     */
    @NotNull(message = "Experience parent reference is mandatory")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id", nullable = false)
    private Experience experience;

    @NotNull(message = "Start time is mandatory")
    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @NotNull(message = "End time is mandatory")
    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @Column(name = "booking_deadline")
    private Instant bookingDeadline;

    @Positive(message = "Minimum participants must be greater than zero")
    @Column(name = "minimum_participants")
    private Integer minimumParticipants;

    @NotNull(message = "Maximum participants capacity is mandatory")
    @Positive(message = "Maximum participants must be greater than zero")
    @Column(name = "maximum_participants", nullable = false)
    private Integer maximumParticipants;

    @NotNull(message = "Booked seats count is mandatory")
    @PositiveOrZero(message = "Booked seats cannot be negative")
    @Builder.Default
    @Column(name = "booked_seats", nullable = false)
    private Integer bookedSeats = 0;

    @NotNull(message = "Session status is required")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "session_status", nullable = false, length = 20)
    private SessionStatus sessionStatus = SessionStatus.OPEN;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
        if (this.bookedSeats == null) {
            this.bookedSeats = 0;
        }
        if (this.sessionStatus == null) {
            this.sessionStatus = SessionStatus.OPEN;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
