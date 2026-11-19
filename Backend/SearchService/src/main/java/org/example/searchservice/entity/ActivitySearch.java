package org.example.searchservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.example.searchservice.enums.ActivityStatus;
import org.example.searchservice.enums.Visibility;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name = "activity_search")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivitySearch {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "search_id", nullable = false, updatable = false)
    private UUID searchId;


    @NotNull(message = "Activity ID is required")
    @Column(name = "activity_id", nullable = false, unique = true)
    private UUID activityId;


    @NotNull(message = "Organizer ID is required")
    @Column(name = "organizer_id", nullable = false)
    private UUID organizerId;

    @NotBlank(message = "Activity title cannot be blank")
    @Size(max = 150, message = "Activity title cannot exceed 150 characters")
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Activity description cannot be blank")
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;


    @NotNull(message = "Category ID is required")
    @Column(name = "category_id", nullable = false)
    private UUID categoryId;

    @NotBlank(message = "Category name cannot be blank")
    @Size(max = 100, message = "Category name cannot exceed 100 characters")
    @Column(name = "category_name", nullable = false, length = 100)
    private String categoryName;


    @NotNull(message = "Venue ID is required")
    @Column(name = "venue_id", nullable = false)
    private UUID venueId;

    @NotBlank(message = "Venue name cannot be blank")
    @Size(max = 150, message = "Venue name cannot exceed 150 characters")
    @Column(name = "venue_name", nullable = false, length = 150)
    private String venueName;

    @NotBlank(message = "City cannot be blank")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    @NotNull(message = "Visibility is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "visibility", nullable = false, length = 20)
    private Visibility visibility;

    @NotNull(message = "Activity status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "activity_status", nullable = false, length = 30)
    private ActivityStatus activityStatus;

    @NotNull(message = "Start time is required")
    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @NotNull(message = "End time is required")
    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @NotNull(message = "Price is required")
    @PositiveOrZero(message = "Price must be positive or zero")
    @Digits(integer = 8, fraction = 2, message = "Price must have maximum 8 integer digits and 2 decimal places")
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotNull(message = "Available seats is required")
    @PositiveOrZero(message = "Available seats must be positive or zero")
    @Column(name = "available_seats", nullable = false)
    private Integer availableSeats;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if (this.visibility == null) {
            this.visibility = Visibility.PUBLIC;
        }
        if (this.activityStatus == null) {
            this.activityStatus = ActivityStatus.PENDING;
        }
        if (this.price == null) {
            this.price = BigDecimal.ZERO;
        }
        if (this.availableSeats == null) {
            this.availableSeats = 0;
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
