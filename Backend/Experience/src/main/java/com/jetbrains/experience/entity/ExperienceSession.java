package com.jetbrains.experience.entity;

import com.jetbrains.experience.enums.SessionBookingStatus;
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
import jakarta.persistence.Table;
import jakarta.validation.constraints.AssertTrue;
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
    @Column(name = "session_id", updatable = false, nullable = false)
    private UUID sessionId;

    @NotNull(message = "Experience is mandatory")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experience_id", nullable = false)
    private Experience experience;

    @NotNull(message = "Venue is mandatory")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    @NotNull(message = "Start time is mandatory")
    @Column(name = "start_time", nullable = false)
    private Instant startTime;

    @NotNull(message = "End time is mandatory")
    @Column(name = "end_time", nullable = false)
    private Instant endTime;

    @NotNull(message = "Registration deadline is mandatory")
    @Column(name = "registration_deadline", nullable = false)
    private Instant registrationDeadline;

    @NotNull(message = "Minimum attendees is mandatory")
    @Positive(message = "minimumAttendees must be > 0")
    @Column(name = "minimum_attendees", nullable = false)
    private Integer minimumAttendees;

    @NotNull(message = "Maximum attendees is mandatory")
    @Positive(message = "maximumAttendees must be > 0")
    @Column(name = "maximum_attendees", nullable = false)
    private Integer maximumAttendees;

    @NotNull(message = "Registered count is mandatory")
    @PositiveOrZero(message = "registeredCount must be >= 0")
    @Builder.Default
    @Column(name = "registered_count", nullable = false)
    private Integer registeredCount = 0;

    @NotNull
    @Builder.Default
    @Column(name = "waitlist_enabled", nullable = false)
    private Boolean waitlistEnabled = false;

    @NotNull(message = "Booking status is required")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "booking_status", nullable = false, length = 20)
    private SessionBookingStatus bookingStatus = SessionBookingStatus.OPEN;

    @NotNull(message = "Session status is required")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "session_status", nullable = false, length = 20)
    private SessionStatus sessionStatus = SessionStatus.OPEN;

    @AssertTrue(message = "endTime must be after startTime")
    public boolean isEndTimeValid() {
        if (startTime == null || endTime == null)
            return true;
        return endTime.isAfter(startTime);
    }

    @AssertTrue(message = "registrationDeadline must be before startTime")
    public boolean isRegistrationDeadlineValid() {
        if (registrationDeadline == null || startTime == null)
            return true;
        return registrationDeadline.isBefore(startTime);
    }

    @AssertTrue(message = "maximumAttendees must be >= minimumAttendees")
    public boolean isAttendeesCapacityValid() {
        if (minimumAttendees == null || maximumAttendees == null)
            return true;
        return maximumAttendees >= minimumAttendees;
    }
}
