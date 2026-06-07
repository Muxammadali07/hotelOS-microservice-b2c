using Velora.Housekeeping.Core.Entities;

namespace Velora.Housekeeping.Core.Contracts;

public interface ICleanlinessLogRepository
{
    Task<CleanlinessLog?> GetByIdAsync(Guid id);
    Task<IEnumerable<CleanlinessLog>> GetByRoomIdAsync(Guid roomId);
    Task<IEnumerable<CleanlinessLog>> GetActiveAsync();
    Task AddAsync(CleanlinessLog log);
    Task UpdateAsync(CleanlinessLog log);
}