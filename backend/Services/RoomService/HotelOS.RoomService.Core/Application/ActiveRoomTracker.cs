using Velora.RoomService.Core.Contracts;

namespace Velora.RoomService.Core.Application;

public class ActiveRoomTracker : IActiveRoomTracker
{
    private readonly HashSet<Guid> _activeRooms = new();
    private readonly object _lock = new();

    public bool IsRoomActive(Guid roomId)
    {
        lock (_lock) return _activeRooms.Contains(roomId);
    }

    public void UpdateRoomStatus(Guid roomId, string status)
    {
        lock (_lock)
        {
            if (status == "Active")
                _activeRooms.Add(roomId);
            else
                _activeRooms.Remove(roomId);
        }
    }
}
