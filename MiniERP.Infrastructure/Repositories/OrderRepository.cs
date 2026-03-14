using Microsoft.EntityFrameworkCore;
using MiniERP.Application.Interfaces.Repositories;
using MiniERP.Domain.Entities;
using MiniERP.Infrastructure.Persistence;

namespace MiniERP.Infrastructure.Repositories;

public class OrderRepository(ApplicationDbContext context)
    : Repository<Order>(context), IOrderRepository
{
    public async Task<Order?> GetOrderWithItemsAsync(int orderId, CancellationToken cancellationToken = default)
        => await _dbSet
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == orderId, cancellationToken);

    public async Task<(List<Order> Items, int TotalCount)> GetPagedAsync(
        int page, int pageSize,
        string? userId = null,
        CancellationToken cancellationToken = default)
    {
        var query = _dbSet
            .Include(o => o.OrderItems)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(userId))
            query = query.Where(o => o.UserId.ToString() == userId);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(o => o.OrderDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (items, totalCount);
    }
}
