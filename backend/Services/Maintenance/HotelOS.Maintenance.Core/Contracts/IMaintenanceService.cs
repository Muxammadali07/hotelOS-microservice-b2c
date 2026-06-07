using Velora.Maintenance.Core.Entities;

namespace Velora.Maintenance.Core.Contracts;

public interface IMaintenanceService
{
    Task<MaintenanceTicket> CreateTicketAsync(
        Guid roomId, Guid reportedBy,
        string description, string priority, int estimatedMins);
    Task<MaintenanceTicket> AssignStaffAsync(Guid ticketId, Guid staffId);
    Task<MaintenanceTicket> ResolveTicketAsync(Guid ticketId);
    Task<IEnumerable<MaintenanceTicket>> GetActiveTicketsAsync();
    Task<IEnumerable<MaintenanceTicket>> GetByRoomAsync(Guid roomId);
    Task<MaintenanceTicket?> GetByIdAsync(Guid id);
}