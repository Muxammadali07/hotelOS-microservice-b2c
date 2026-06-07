using Velora.RoomService.Core.Contracts;
using Velora.Shared.Contracts.Events;
using MassTransit;

namespace Velora.RoomService.API.Consumers;

public class RoomStatusConsumer : IConsumer<RoomStatusUpdatedEvent>
{
    private readonly IActiveRoomTracker _tracker;

    public RoomStatusConsumer(IActiveRoomTracker tracker) => _tracker = tracker;

    public Task Consume(ConsumeContext<RoomStatusUpdatedEvent> context)
    {
        _tracker.UpdateRoomStatus(context.Message.RoomId, context.Message.NewStatus);
        return Task.CompletedTask;
    }
}
