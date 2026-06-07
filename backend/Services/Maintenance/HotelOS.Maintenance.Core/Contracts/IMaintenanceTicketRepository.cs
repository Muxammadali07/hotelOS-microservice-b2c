using Velora.Maintenance.Core.Entities;

namespace Velora.Maintenance.Core.Contracts;

public interface IMaintenanceTicketRepository
{
    Task<MaintenanceTicket?> GetByIdAsync(Guid id);
    Task<IEnumerable<MaintenanceTicket>> GetByRoomIdAsync(Guid roomId);
    Task<IEnumerable<MaintenanceTicket>> GetActiveAsync();
    Task AddAsync(MaintenanceTicket ticket);
    Task UpdateAsync(MaintenanceTicket ticket);
}