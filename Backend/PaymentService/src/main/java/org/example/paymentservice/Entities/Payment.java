package org.example.paymentservice.Entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "payments")
@RequiredArgsConstructor
@Setter
@Getter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID paymentId;

    @NotNull(message = "Booking ID is required")
    @Column(name = "booking_id", nullable = false)
    private UUID bookingId;

    @NotNull(message = "Payment amount is required")
    @Positive(message = "Payment amount must be greater than zero")
    @Digits(integer = 8, fraction = 2, message = "Amount must have maximum 8 integer digits and 2 decimal places")
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @NotNull(message = "Payment status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 30)
    private PaymentStatus paymentStatus;

    @NotBlank(message = "Payment provider is required")
    @Size(max = 30, message = "Provider name cannot exceed 30 characters")
    @Column(name = "provider", nullable = false, length = 30)
    private String provider;

    @Size(max = 150, message = "Provider reference cannot exceed 150 characters")
    @Column(name = "provider_reference", unique = true, length = 150)
    private String providerReference;

    @NotNull
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @PrePersist
    public void onCreate() {

        this.createdAt = LocalDateTime.now();

        if (this.paymentStatus == null) {
            this.paymentStatus = PaymentStatus.CREATED;
        }
    }
}
