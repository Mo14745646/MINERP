using MiniERP.Domain.Entities;

namespace MiniERP.Application.Interfaces.Repositories;

public interface IOrderRepository : IRepository<Order>
{
    Task<Order?> GetOrderWithItemsAsync(int orderId, CancellationToken cancellationToken = default);
    Task<(List<Order> Items, int TotalCount)> GetPagedAsync(
        int page, int pageSize,
        string? userId = null,
        CancellationToken cancellationToken = default);
}
