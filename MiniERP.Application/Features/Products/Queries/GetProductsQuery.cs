using MediatR;
using MiniERP.Application.DTOs;
using MiniERP.Application.DTOs.Products;

namespace MiniERP.Application.Features.Products.Queries;

// The Query — what data does the caller want?
public record GetProductsQuery(
    int Page = 1,
    int PageSize = 20,
    string? Search = null,
    int? CategoryId = null
) : IRequest<PaginatedList<ProductDto>>;
