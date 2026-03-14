using FluentValidation;
using MediatR;
using MiniERP.Application.DTOs.Products;

namespace MiniERP.Application.Features.Products.Commands;

// The Command — what action should be performed?
public record CreateProductCommand(
    string Name,
    string SKU,
    decimal Price,
    int StockQuantity,
    int CategoryId,
    string? ImageUrl = null
) : IRequest<ProductDto>;

// The validator — enforce business rules before the handler runs
public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required.")
            .MaximumLength(200).WithMessage("Product name cannot exceed 200 characters.");

        RuleFor(x => x.SKU)
            .NotEmpty().WithMessage("SKU is required.")
            .MaximumLength(50).WithMessage("SKU cannot exceed 50 characters.")
            .Matches(@"^[A-Z0-9\-]+$").WithMessage("SKU must be uppercase alphanumeric with hyphens only (e.g. ELEC-LT-001).");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Price must be greater than 0.");

        RuleFor(x => x.StockQuantity)
            .GreaterThanOrEqualTo(0).WithMessage("Stock quantity cannot be negative.");

        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("A valid category must be selected.");
    }
}
