package com.springrest.venue.entities;

import com.springrest.venue.enums.VenueType;
import com.springrest.venue.enums.VenueStatus;
import com.springrest.venue.enums.VerificationStatus;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.RequiredArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "venues")
@Getter
@Setter
@RequiredArgsConstructor
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "venue_id", nullable = false, updatable = false)
    private UUID venueId;

    // Reference to Organizer Service (not a database FK)
    @Column(name = "organizer_id")
    private UUID organizerId;

    @Column(name = "venue_name", nullable = false, length = 150)
    private String venueName;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "venue_type", nullable = false, length = 40)
    private VenueType venueType;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "address_line1", nullable = false, length = 200)
    private String addressLine1;

    @Column(name = "address_line2", length = 200)
    private String addressLine2;

    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @Column(name = "state", nullable = false, length = 100)
    private String state;

    @Column(name = "pincode", nullable = false, length = 10)
    private String pincode;

    @Column(name = "latitude", precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(name = "total_capacity")
    private Integer totalCapacity;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 30)
    private VerificationStatus verificationStatus =
            VerificationStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private VenueStatus status = VenueStatus.ACTIVE;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;
}