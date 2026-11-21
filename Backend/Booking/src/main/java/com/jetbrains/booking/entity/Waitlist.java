package com.jetbrains.booking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "waitlists")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Waitlist {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "waitlist_id", updatable = false, nullable = false)
    private UUID waitlistId;

    @NotNull(message = "Session ID is mandatory")
    @Column(name = "session_id", nullable = false)
    private UUID sessionId;

    @NotNull(message = "User ID is mandatory")
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @NotNull(message = "Position is required")
    @Positive(message = "Position must be > 0")
    @Column(name = "position", nullable = false)
    private Integer position;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}
