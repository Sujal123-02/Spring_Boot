package com.jetbrains.experience.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "venues")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "venue_id", updatable = false, nullable = false)
    private UUID venueId;

    @NotBlank(message = "Venue name cannot be blank")
    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @NotBlank(message = "Address cannot be blank")
    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @NotBlank(message = "City cannot be blank")
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "amenities", columnDefinition = "TEXT")
    private String amenities;

    @Builder.Default
    @OneToMany(mappedBy = "venue", fetch = FetchType.LAZY)
    private List<ExperienceSession> sessions = new ArrayList<>();
}
