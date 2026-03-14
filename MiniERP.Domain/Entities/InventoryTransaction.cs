using System;
using MiniERP.Domain.Common;
using MiniERP.Domain.Enums;

namespace MiniERP.Domain.Entities;

public class InventoryTransaction : AuditableEntity
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public TransactionType Type { get; set; }
    public int Quantity { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string? Remarks { get; set; }

    public Product Product { get; set; } = null!;
}
