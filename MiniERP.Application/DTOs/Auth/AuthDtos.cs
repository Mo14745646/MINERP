namespace MiniERP.Application.DTOs.Auth;

public record AuthResponseDto(
    string Token,
    string Email,
    string FirstName,
    string LastName,
    IEnumerable<string> Roles
);

public record LoginDto(
    string Email,
    string Password
);

public record RegisterDto(
    string Email,
    string Password,
    string FirstName,
    string LastName
);
