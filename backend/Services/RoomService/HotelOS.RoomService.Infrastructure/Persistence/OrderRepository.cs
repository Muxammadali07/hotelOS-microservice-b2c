using Velora.RoomService.Core.Entities;
using Velora.RoomService.Core.Enums;
using Velora.RoomService.Core.Contracts;
using Velora.RoomService.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Velora.RoomService.Infrastructure.Persistence;

public class OrderRepository : IOrderRepository
{
    private readonly RoomServiceDbContext _db;

    public OrderRepository(RoomServiceDbContext db) => _db = db;

    public async Task<Order?> GetByIdAsync(Guid id)
        => await _db.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.MenuItem)
            .FirstOrDefaultAsync(o => o.Id == id);

    public async Task<IEnumerable<Order>> GetByBookingIdAsync(Guid bookingId)
        => await _db.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.MenuItem)
            .Where(o => o.BookingId == bookingId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

    public async Task<IEnumerable<Order>> GetActiveAsync()
        => await _db.Orders
            .Include(o => o.Items)
            .Where(o => o.Status != OrderStatus.Delivered)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

    public async Task AddAsync(Order order)
    {
        await _db.Orders.AddAsync(order);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Order order)
    {
        _db.Orders.Update(order);
        await _db.SaveChangesAsync();
    }
}