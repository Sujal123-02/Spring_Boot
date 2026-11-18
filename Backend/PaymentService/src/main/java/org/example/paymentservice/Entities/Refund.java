package org.example.paymentservice.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "refunds")
@RequiredArgsConstructor
@Setter
@Getter
public class Refund {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "refund_id", nullable = false, updatable = false)
    private UUID refundId;


    @NotNull(message = "Payment is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "payment_id",
            nullable = false,
            unique = true
    )
    private Payment payment;


    @NotNull(message = "Refund amount is required")
    @Positive(message = "Refund amount must be greater than zero")
    @Digits(integer = 8, fraction = 2, message = "Refund amount must have maximum 8 integer digits and 2 decimal places")
    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;


    @NotNull(message = "Refund status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "refund_status", nullable = false, length = 30)
    private RefundStatus refundStatus;


    @NotBlank(message = "Refund reason is required")
    @Size(max = 255, message = "Refund reason cannot exceed 255 characters")
    @Column(name = "reason", nullable = false, length = 255)
    private String reason;

    @PrePersist
    public void onCreate() {

        if (this.refundStatus == null) {
            this.refundStatus = RefundStatus.REQUESTED;
        }
    }
}
