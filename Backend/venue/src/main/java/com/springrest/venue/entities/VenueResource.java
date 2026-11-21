package com.springrest.venue.entities;

import com.springrest.venue.enums.ResourceType;
import com.springrest.venue.enums.ResourceStatus;

import jakarta.persistence.*;

import lombok.*;

import java.util.UUID;

@Entity
@Table(
        name = "venue_resources",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_venue_resource_name",
                        columnNames = {"venue_id", "resource_name"}
                )
        }
)
@Getter
@Setter
@RequiredArgsConstructor
public class VenueResource {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "resource_id")
    private UUID resourceId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "venue_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_resource_venue")
    )
    private Venue venue;

    @Column(name = "resource_name", nullable = false, length = 120)
    private String resourceName;

    @Enumerated(EnumType.STRING)
    @Column(name = "resource_type", nullable = false, length = 40)
    private ResourceType resourceType;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "description", length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private ResourceStatus status = ResourceStatus.AVAILABLE;
}