using MiniERP.Domain.Entities;

namespace MiniERP.Application.Interfaces.Repositories;

public interface IProductRepository : IRepository<Product>
{
    Task<Product?> GetBySkuAsync(string sku, CancellationToken cancellationToken = default);
    Task<(List<Product> Items, int TotalCount)> GetPagedAsync(
        int page, int pageSize,
        string? search = null,
        int? categoryId = null,
        CancellationToken cancellationToken = default);
}
