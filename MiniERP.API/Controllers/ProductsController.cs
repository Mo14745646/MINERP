using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MiniERP.API.Common;
using MiniERP.Application.Features.Products.Commands;
using MiniERP.Application.Features.Products.Queries;

namespace MiniERP.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController(IMediator mediator) : ControllerBase
{
    // GET: /api/v1/products?page=1&pageSize=20&search=laptop&categoryId=1
    [HttpGet]
    [AllowAnonymous] // Anyone can view products
    public async Task<IActionResult> GetProducts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string? search = null,
        [FromQuery] int? categoryId = null,
        CancellationToken cancellationToken = default)
    {
        var result = await mediator.Send(
            new GetProductsQuery(page, pageSize, search, categoryId),
            cancellationToken);

        return Ok(ApiResponse<object>.Success(result));
    }

    // POST: /api/v1/products
    [HttpPost]
    [Authorize(Roles = "Admin,WarehouseManager")] // Only authorized roles can create
    public async Task<IActionResult> CreateProduct(
        [FromBody] CreateProductCommand command,
        CancellationToken cancellationToken)
    {
        var result = await mediator.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetProducts), ApiResponse<object>.Success(result, "Product created successfully."));
    }
}
