namespace Velora.Shared.Contracts.Events;

public record PaymentInitiatedEvent(
    Guid     BookingId,
    Guid     GuestId,
    double   Amount,
    string   Currency,
    DateTime OccurredAt);