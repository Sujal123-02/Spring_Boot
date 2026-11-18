package com.jetbrains.booking.enums;

/**
 * Lifecycle status of a booking within the Booking Service domain.
 */
public enum BookingStatus {
    PENDING,
    CONFIRMED,
    WAITLISTED,
    CANCELLED,
    EXPIRED
}
