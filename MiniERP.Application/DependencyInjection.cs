using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using MiniERP.Application.Features.Products.Commands;

namespace MiniERP.Application;

/// <summary>
/// Extension method to register all Application services (MediatR, FluentValidation) into DI.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = typeof(DependencyInjection).Assembly;

        // Register MediatR handlers from this assembly
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(assembly));

        // Register all FluentValidation validators from this assembly
        services.AddValidatorsFromAssembly(assembly);

        return services;
    }
}
