using Velora.Reception.Core.Entities;
using Velora.Reception.Core.Enums;

namespace Velora.Reception.Core.Contracts;

public interface IRoomRepository
{
    Task<Room?> GetByIdAsync(Guid id);
    Task<Room?> GetByIdWithBookingsAsync(Guid id);
    Task<IEnumerable<Room>> GetAllAsync();
    Task<IEnumerable<Room>> SearchAvailableAsync(
        RoomStyle? style, DateTime checkIn, DateTime checkOut);
    Task AddAsync(Room room);
    Task UpdateAsync(Room room);
    Task DeleteAsync(Guid id);
}