using MediatR;
using Microsoft.AspNetCore.Mvc;
using MiniERP.API.Common;
using MiniERP.Application.Features.Auth.Commands;

namespace MiniERP.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserCommand command)
    {
        var result = await mediator.Send(command);
        return Ok(ApiResponse<object>.Success(result, "Login successful."));
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserCommand command)
    {
        var result = await mediator.Send(command);
        return Ok(ApiResponse<object>.Success(result, "Registration successful."));
    }
}
