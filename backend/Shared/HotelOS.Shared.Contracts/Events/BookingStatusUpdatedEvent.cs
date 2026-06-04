namespace Velora.Shared.Contracts.Events;

public record BookingStatusUpdatedEvent(
    Guid     BookingId,
    Guid     RoomId,
    string   NewBookingStatus,
    DateTime OccurredAt);
