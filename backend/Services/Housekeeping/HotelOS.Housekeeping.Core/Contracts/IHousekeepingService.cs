using Velora.Housekeeping.Core.Entities;

namespace Velora.Housekeeping.Core.Contracts;

public interface IHousekeepingService
{
    Task<CleanlinessLog> AssignCleaningAsync(Guid roomId, Guid staffId);
    Task<CleanlinessLog> StartCleaningAsync(Guid logId);
    Task<CleanlinessLog> MarkCleanAsync(Guid logId);
    Task<IEnumerable<CleanlinessLog>> GetActiveLogsAsync();
    Task<IEnumerable<CleanlinessLog>> GetByRoomAsync(Guid roomId);
}