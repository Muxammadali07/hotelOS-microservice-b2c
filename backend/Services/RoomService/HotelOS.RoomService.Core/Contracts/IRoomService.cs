using Velora.RoomService.Core.Entities;
using Velora.RoomService.Core.Enums;

namespace Velora.RoomService.Core.Contracts;

public interface IRoomServiceService
{
    Task<Order> CreateOrderAsync(
        Guid bookingId, Guid roomId, Guid guestId,
        List<(Guid menuItemId, int quantity)> items);
    Task<Order> UpdateOrderStatusAsync(Guid orderId, OrderStatus status);
    Task<IEnumerable<Order>> GetActiveOrdersAsync();
    Task<IEnumerable<Order>> GetOrdersByBookingIdAsync(Guid bookingId);
    Task<Order?> GetOrderByIdAsync(Guid id);
    Task<IEnumerable<MenuItem>> GetMenuAsync();
    Task<MenuItem?> GetMenuItemByIdAsync(Guid id);
    Task<MenuItem> AddMenuItemAsync(MenuItem item);
    Task<MenuItem> UpdateMenuItemAsync(Guid id, string name, string description,
        double price, string category);
    Task<MenuItem> ToggleMenuItemAsync(Guid id);
}