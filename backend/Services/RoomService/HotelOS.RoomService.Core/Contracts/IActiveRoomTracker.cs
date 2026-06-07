namespace Velora.RoomService.Core.Contracts;

public interface IActiveRoomTracker
{
    bool IsRoomActive(Guid roomId);
    void UpdateRoomStatus(Guid roomId, string status);
}
