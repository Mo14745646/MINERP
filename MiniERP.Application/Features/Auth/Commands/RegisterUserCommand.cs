using MediatR;
using Microsoft.AspNetCore.Identity;
using MiniERP.Application.DTOs.Auth;
using MiniERP.Application.Exceptions;
using MiniERP.Application.Interfaces;
using MiniERP.Domain.Identity;

namespace MiniERP.Application.Features.Auth.Commands;

public record RegisterUserCommand(
    string Email,
    string Password,
    string FirstName,
    string LastName
) : IRequest<AuthResponseDto>;

public class RegisterUserCommandHandler(
    UserManager<ApplicationUser> userManager,
    IJwtService jwtService) : IRequestHandler<RegisterUserCommand, AuthResponseDto>
{
    public async Task<AuthResponseDto> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.GroupBy(e => "Password").ToDictionary(g => g.Key, g => g.Select(e => e.Description).ToArray());
            throw new ValidationException(errors);
        }

        // Default role for new registrations
        await userManager.AddToRoleAsync(user, "Sales");

        var roles = await userManager.GetRolesAsync(user);
        var token = jwtService.GenerateToken(user, roles);

        return new AuthResponseDto(token, user.Email, user.FirstName, user.LastName, roles);
    }
}
