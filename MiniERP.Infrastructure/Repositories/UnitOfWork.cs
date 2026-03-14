using MiniERP.Application.Interfaces;
using MiniERP.Application.Interfaces.Repositories;
using MiniERP.Infrastructure.Persistence;

namespace MiniERP.Infrastructure.Repositories;

public class UnitOfWork(
    ApplicationDbContext context,
    IProductRepository products,
    ICategoryRepository categories,
    IOrderRepository orders) : IUnitOfWork
{
    private readonly ApplicationDbContext _context = context;

    public IProductRepository Products { get; } = products;
    public ICategoryRepository Categories { get; } = categories;
    public IOrderRepository Orders { get; } = orders;

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => await _context.SaveChangesAsync(cancellationToken);

    public void Dispose() => _context.Dispose();
}
