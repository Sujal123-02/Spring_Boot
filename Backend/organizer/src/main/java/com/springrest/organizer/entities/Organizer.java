package com.springrest.organizer.entities;

import com.springrest.organizer.enums.VerificationStatus;
import com.springrest.organizer.enums.OrganizerStatus;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "organizers",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_organizer_user",
                        columnNames = "user_id"
                )
        }
)
@Getter
@Setter
@RequiredArgsConstructor
public class Organizer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "organizer_id", nullable = false, updatable = false)
    private UUID organizerId;

    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    @Column(name = "organizer_name", nullable = false, length = 120)
    private String organizerName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 30)
    private VerificationStatus verificationStatus =
            VerificationStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private OrganizerStatus status = OrganizerStatus.ACTIVE;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}
