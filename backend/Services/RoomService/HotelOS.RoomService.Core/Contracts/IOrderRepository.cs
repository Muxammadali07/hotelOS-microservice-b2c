using Velora.RoomService.Core.Entities;

namespace Velora.RoomService.Core.Contracts;

public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(Guid id);
    Task<IEnumerable<Order>> GetByBookingIdAsync(Guid bookingId);
    Task<IEnumerable<Order>> GetActiveAsync();
    Task AddAsync(Order order);
    Task UpdateAsync(Order order);
}