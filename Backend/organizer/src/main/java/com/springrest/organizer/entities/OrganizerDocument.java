package com.springrest.organizer.entities;

import com.springrest.organizer.enums.DocumentType;
import com.springrest.organizer.enums.VerificationStatus;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import lombok.RequiredArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "organizer_verification_documents")
@Getter
@Setter
@RequiredArgsConstructor
public class OrganizerDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "document_id")
    private UUID documentId;

    // Actual foreign key within Organizer Service database.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "organizer_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_document_organizer")
    )
    private Organizer organizer;

    @Enumerated(EnumType.STRING)
    @Column(name = "document_type", nullable = false, length = 40)
    private DocumentType documentType;

    // Reference to privately stored file, not a public URL.
    @Column(name = "storage_key", nullable = false, length = 500)
    private String storageKey;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 30)
    private VerificationStatus verificationStatus =
            VerificationStatus.PENDING;

    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @CreationTimestamp
    @Column(name = "uploaded_at", nullable = false, updatable = false)
    private Instant uploadedAt;
}