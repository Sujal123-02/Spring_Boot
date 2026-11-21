package com.springrest.venue.entities;

import jakarta.persistence.*;

import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "venue_amenities",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_venue_amenity",
                        columnNames = {"venue_id", "amenity_name"}
                )
        }
)
@Getter
@Setter
@RequiredArgsConstructor
public class VenueAmenity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "amenity_id")
    private UUID amenityId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "venue_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_amenity_venue")
    )
    private Venue venue;

    @Column(name = "amenity_name", nullable = false, length = 100)
    private String amenityName;

    @Column(name = "description", length = 255)
    private String description;
}