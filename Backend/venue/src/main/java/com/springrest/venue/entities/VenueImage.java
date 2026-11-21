package com.springrest.venue.entities;

import jakarta.persistence.*;

import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "venue_images")
@Getter
@Setter
@RequiredArgsConstructor
public class VenueImage {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "image_id")
    private UUID imageId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "venue_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_image_venue")
    )
    private Venue venue;

    @Column(name = "storage_key", nullable = false, length = 500)
    private String storageKey;

    @Column(name = "alt_text", length = 255)
    private String altText;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    @Column(name = "is_primary", nullable = false)
    private boolean primary = false;

    @CreationTimestamp
    @Column(name = "uploaded_at", nullable = false, updatable = false)
    private Instant uploadedAt;
}