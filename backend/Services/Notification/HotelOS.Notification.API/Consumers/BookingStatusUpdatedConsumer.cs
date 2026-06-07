using Velora.Notification.API.Hubs;
using Velora.Shared.Contracts.Events;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace Velora.Notification.API.Consumers;

public class BookingStatusUpdatedConsumer : IConsumer<BookingStatusUpdatedEvent>
{
    private readonly IHubContext<HotelHub> _hub;
    private readonly ILogger<BookingStatusUpdatedConsumer> _logger;

    public BookingStatusUpdatedConsumer(
        IHubContext<HotelHub> hub,
        ILogger<BookingStatusUpdatedConsumer> logger)
    {
        _hub    = hub;
        _logger = logger;
    }

    public async Task Consume(ConsumeContext<BookingStatusUpdatedEvent> context)
    {
        var e = context.Message;
        _logger.LogInformation(
            "Booking status updated: {BookingId} → {Status}", e.BookingId, e.NewBookingStatus);

        await _hub.Clients.Group("bookings").SendAsync("BookingStatusUpdated", new
        {
            e.BookingId,
            e.RoomId,
            e.NewBookingStatus,
            e.OccurredAt
        });
    }
}
