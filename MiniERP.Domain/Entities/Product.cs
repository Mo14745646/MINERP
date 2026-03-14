using MiniERP.Domain.Common;

namespace MiniERP.Domain.Entities;

public class Product : AuditableEntity
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public int StockQuantity { get; set; }

    public Category Category { get; set; } = null!;
}
