using Velora.Housekeeping.Core.Entities;
using Velora.Housekeeping.Core.Enums;
using Velora.Housekeeping.Core.Contracts;
using Velora.Housekeeping.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Velora.Housekeeping.Infrastructure.Persistence;

public class CleanlinessLogRepository : ICleanlinessLogRepository
{
    private readonly HousekeepingDbContext _db;

    public CleanlinessLogRepository(HousekeepingDbContext db) => _db = db;

    public async Task<CleanlinessLog?> GetByIdAsync(Guid id)
        => await _db.CleanlinessLogs.FirstOrDefaultAsync(l => l.Id == id);

    public async Task<IEnumerable<CleanlinessLog>> GetByRoomIdAsync(Guid roomId)
        => await _db.CleanlinessLogs
            .Where(l => l.RoomId == roomId)
            .OrderByDescending(l => l.StartedAt)
            .ToListAsync();

    public async Task<IEnumerable<CleanlinessLog>> GetActiveAsync()
        => await _db.CleanlinessLogs
            .Where(l => l.Status == CleanStatus.BeingCleaned)
            .ToListAsync();

    public async Task AddAsync(CleanlinessLog log)
    {
        await _db.CleanlinessLogs.AddAsync(log);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(CleanlinessLog log)
    {
        _db.CleanlinessLogs.Update(log);
        await _db.SaveChangesAsync();
    }
}