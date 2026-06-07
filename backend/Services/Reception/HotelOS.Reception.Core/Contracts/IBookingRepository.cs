using Velora.Reception.Core.Entities;
using Velora.Reception.Core.Enums;

namespace Velora.Reception.Core.Contracts;

public interface IBookingRepository
{
    Task<Booking?> GetByIdAsync(Guid id);
    Task<IEnumerable<Booking>> GetByGuestIdAsync(Guid guestId);
    Task<IEnumerable<Booking>> GetByRoomIdAsync(Guid roomId);
    Task<IEnumerable<Booking>> GetAllAsync(BookingStatus? status);
    Task<IEnumerable<Booking>> GetExpiredPendingAsync();
    Task AddAsync(Booking booking);
    Task UpdateAsync(Booking booking);

    /// <summary>
    /// Atomically re-checks availability, sets room.Status = Reserved,
    /// and inserts a PendingPayment booking — all inside one DB transaction.
    /// Throws InvalidOperationException on race-condition conflict.
    /// </summary>
    Task<Booking> CreateReservedAsync(
        Guid guestId, Guid roomId, DateTime checkIn, DateTime checkOut);
}