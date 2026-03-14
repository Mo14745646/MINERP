using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using MiniERP.Application.Interfaces;
using MiniERP.Application.Interfaces.Repositories;
using MiniERP.Infrastructure.Identity;
using MiniERP.Infrastructure.Repositories;

namespace MiniERP.Infrastructure;

/// <summary>
/// Extension method to register all Infrastructure services into the DI container.
/// Called from Program.cs to keep startup clean.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        // Repositories
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<ICategoryRepository, CategoryRepository>();
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IJwtService, JwtService>();

        return services;
    }
}
