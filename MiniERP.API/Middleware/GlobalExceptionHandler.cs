using Microsoft.AspNetCore.Diagnostics;
using MiniERP.Application.Exceptions;
using ValidationException = MiniERP.Application.Exceptions.ValidationException;

namespace MiniERP.API.Middleware;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Unhandled exception: {Message}", exception.Message);

        var (statusCode, title, errors) = exception switch
        {
            NotFoundException notFound => (
                StatusCodes.Status404NotFound,
                "Not Found",
                new[] { notFound.Message }),

            ValidationException validation => (
                StatusCodes.Status400BadRequest,
                "Validation Failed",
                validation.Errors.SelectMany(e => e.Value).ToArray()),

            InsufficientStockException stock => (
                StatusCodes.Status409Conflict,
                "Insufficient Stock",
                new[] { stock.Message }),

            UnauthorizedAccessException unauthorized => (
                StatusCodes.Status401Unauthorized,
                "Unauthorized",
                new[] { unauthorized.Message }),

            _ => (
                StatusCodes.Status500InternalServerError,
                "Internal Server Error",
                new[] { "An unexpected error occurred." })
        };

        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(new
        {
            status = statusCode,
            title,
            errors
        }, cancellationToken);

        return true;
    }
}
