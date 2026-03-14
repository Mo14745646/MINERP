namespace MiniERP.Application.DTOs.Products;

public record ProductDto(
    int Id,
    string Name,
    string SKU,
    decimal Price,
    int StockQuantity,
    string? ImageUrl,
    int CategoryId,
    string CategoryName
);
