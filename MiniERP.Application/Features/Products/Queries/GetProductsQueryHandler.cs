using MediatR;
using MiniERP.Application.DTOs;
using MiniERP.Application.DTOs.Products;
using MiniERP.Application.Interfaces;

namespace MiniERP.Application.Features.Products.Queries;

// The Handler — how do we fulfill the query?
public class GetProductsQueryHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<GetProductsQuery, PaginatedList<ProductDto>>
{
    public async Task<PaginatedList<ProductDto>> Handle(
        GetProductsQuery request, CancellationToken cancellationToken)
    {
        var (items, totalCount) = await unitOfWork.Products.GetPagedAsync(
            request.Page,
            request.PageSize,
            request.Search,
            request.CategoryId,
            cancellationToken);

        var dtos = items.Select(p => new ProductDto(
            p.Id,
            p.Name,
            p.SKU,
            p.Price,
            p.StockQuantity,
            p.ImageUrl,
            p.CategoryId,
            p.Category?.Name ?? string.Empty
        )).ToList();

        return new PaginatedList<ProductDto>(dtos, totalCount, request.Page, request.PageSize);
    }
}
