using MediatR;
using MiniERP.Application.DTOs.Products;
using MiniERP.Application.Exceptions;
using MiniERP.Application.Interfaces;
using MiniERP.Domain.Entities;

namespace MiniERP.Application.Features.Products.Commands;

public class CreateProductCommandHandler(IUnitOfWork unitOfWork)
    : IRequestHandler<CreateProductCommand, ProductDto>
{
    public async Task<ProductDto> Handle(
        CreateProductCommand request, CancellationToken cancellationToken)
    {
        // Business rule: SKU must be unique
        var existing = await unitOfWork.Products.GetBySkuAsync(request.SKU, cancellationToken);
        if (existing is not null)
            throw new ValidationException(new Dictionary<string, string[]>
            {
                { "SKU", [$"A product with SKU '{request.SKU}' already exists."] }
            });

        var category = await unitOfWork.Categories.GetByIdAsync(request.CategoryId, cancellationToken)
            ?? throw new NotFoundException(nameof(Category), request.CategoryId);

        var product = new Product
        {
            Name = request.Name,
            SKU = request.SKU,
            Price = request.Price,
            StockQuantity = request.StockQuantity,
            CategoryId = request.CategoryId,
            ImageUrl = request.ImageUrl
        };

        unitOfWork.Products.Add(product);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return new ProductDto(
            product.Id,
            product.Name,
            product.SKU,
            product.Price,
            product.StockQuantity,
            product.ImageUrl,
            product.CategoryId,
            category.Name);
    }
}
