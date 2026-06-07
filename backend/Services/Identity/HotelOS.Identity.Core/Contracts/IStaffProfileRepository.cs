using Velora.Identity.Core.Entities;

namespace Velora.Identity.Core.Contracts;

public interface IStaffProfileRepository
{
    Task<StaffProfile?> GetByAccountIdAsync(Guid accountId);
    Task<StaffProfile?> GetByIdAsync(Guid id);
    Task AddAsync(StaffProfile profile);
    Task UpdateAsync(StaffProfile profile);
    Task DeleteAsync(Guid id);
}