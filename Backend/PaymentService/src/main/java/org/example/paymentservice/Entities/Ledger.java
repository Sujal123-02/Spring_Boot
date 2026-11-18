package org.example.paymentservice.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ledgars")
@RequiredArgsConstructor
@Setter
@Getter
public class Ledger {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ledger_id", nullable = false, updatable = false)
    private UUID ledgerId;


    @NotNull(message = "Payment is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", nullable = false)
    private Payment payment;


    @NotNull(message = "Entry type is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "entry_type", nullable = false, length = 20)
    private EntryType entryType;



    @NotNull(message = "Debit amount is required")
    @PositiveOrZero(message = "Debit cannot be negative")
    @Digits(
            integer = 8,
            fraction = 2,
            message = "Debit must have maximum 8 integer digits and 2 decimal places"
    )
    @Column(name = "debit", nullable = false, precision = 10, scale = 2)
    private BigDecimal debit = BigDecimal.ZERO;



    @NotNull(message = "Credit amount is required")
    @PositiveOrZero(message = "Credit cannot be negative")
    @Digits(
            integer = 8,
            fraction = 2,
            message = "Credit must have maximum 8 integer digits and 2 decimal places"
    )
    @Column(name = "credit", nullable = false, precision = 10, scale = 2)
    private BigDecimal credit = BigDecimal.ZERO;



    @NotNull(message = "Balance is required")
    @PositiveOrZero(message = "Balance cannot be negative")
    @Digits(
            integer = 8,
            fraction = 2,
            message = "Balance must have maximum 8 integer digits and 2 decimal places"
    )
    @Column(name = "balance", nullable = false, precision = 10, scale = 2)
    private BigDecimal balance = BigDecimal.ZERO;


    @NotNull
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;


    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
