using Velora.Payment.Core.Entities;

namespace Velora.Payment.Core.Contracts;

public interface IPaymentRepository
{
    Task<PaymentRecord?> GetByIdAsync(Guid id);
    Task<IEnumerable<PaymentRecord>> GetAllAsync();
    Task<PaymentRecord?> GetByBookingIdAsync(Guid bookingId);
    Task<PaymentRecord?> GetByStripeIntentIdAsync(string intentId);
    Task AddAsync(PaymentRecord payment);
    Task UpdateAsync(PaymentRecord payment);
}