namespace Velora.Shared.Contracts.Events;

public record PaymentConfirmedEvent(
    Guid     BookingId,
    Guid     PaymentId,
    string   GatewayRef,
    DateTime OccurredAt);