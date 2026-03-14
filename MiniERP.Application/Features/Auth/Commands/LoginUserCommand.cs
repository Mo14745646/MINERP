using MediatR;
using Microsoft.AspNetCore.Identity;
using MiniERP.Application.DTOs.Auth;
using MiniERP.Application.Interfaces;
using MiniERP.Domain.Identity;

namespace MiniERP.Application.Features.Auth.Commands;

public record LoginUserCommand(
    string Email,
    string Password
) : IRequest<AuthResponseDto>;

public class LoginUserCommandHandler(
    UserManager<ApplicationUser> userManager,
    IJwtService jwtService) : IRequestHandler<LoginUserCommand, AuthResponseDto>
{
    public async Task<AuthResponseDto> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.Email);

        if (user == null || !await userManager.CheckPasswordAsync(user, request.Password))
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var roles = await userManager.GetRolesAsync(user);
        var token = jwtService.GenerateToken(user, roles);

        return new AuthResponseDto(token, user.Email!, user.FirstName, user.LastName, roles);
    }
}
