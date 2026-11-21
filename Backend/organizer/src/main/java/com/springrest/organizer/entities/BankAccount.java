package com.springrest.organizer.entities;

import com.springrest.organizer.enums.VerificationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "bank_accounts")
@Getter
@Setter
@RequiredArgsConstructor
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "bank_account_id")
    private UUID bankAccountId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "organizer_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_bank_account_organizer")
    )
    private Organizer organizer;

    @Column(name = "account_holder_name", nullable = false)
    private String accountHolderName;

    @Column(name = "account_number", nullable = false)
    private String accountNumber;

    @Column(name = "ifsc", nullable = false, length = 11)
    private String ifsc;

    @Column(name = "upi_id")
    private String upiId;

    @Column(name = "is_primary", nullable = false)
    private boolean primary = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus =
            VerificationStatus.PENDING;

    @CreationTimestamp
    private Instant createdAt;
}