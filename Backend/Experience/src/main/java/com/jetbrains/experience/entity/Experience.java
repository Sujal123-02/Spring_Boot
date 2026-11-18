package com.jetbrains.experience.entity;

import com.jetbrains.experience.enums.ExperienceStatus;
import com.jetbrains.experience.enums.ExperienceType;
import com.jetbrains.experience.enums.ExperienceVisibility;
import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Root domain entity representing a weekend experience/event.
 * References Organizer and Venue services strictly via their UUIDs (DDD bounded context boundary).
 */
@Entity
@Table(name = "experiences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    /**
     * Cross-service reference to Organizer Service (Organizer aggregate ID).
     */
    @NotNull(message = "Organizer ID is required")
    @Column(name = "organizer_id", nullable = false)
    private UUID organizerId;

    /**
     * Cross-service reference to Venue Service (Venue aggregate ID).
     * Optional for virtual/online experiences.
     */
    @Column(name = "venue_id")
    private UUID venueId;

    /**
     * Intra-service relationship: Each experience belongs to a single category.
     */
    @NotNull(message = "Category is mandatory")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @NotBlank(message = "Title cannot be blank")
    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Experience type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "experience_type", nullable = false, length = 30)
    private ExperienceType experienceType;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be positive or zero")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull(message = "Visibility is required")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "visibility", nullable = false, length = 20)
    private ExperienceVisibility visibility = ExperienceVisibility.PUBLIC;

    @NotNull(message = "Experience status is required")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    @Column(name = "status", nullable = false, length = 20)
    private ExperienceStatus status = ExperienceStatus.DRAFT;

    @Builder.Default
    @OneToMany(mappedBy = "experience", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ExperienceSession> sessions = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
        if (this.visibility == null) {
            this.visibility = ExperienceVisibility.PUBLIC;
        }
        if (this.status == null) {
            this.status = ExperienceStatus.DRAFT;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
