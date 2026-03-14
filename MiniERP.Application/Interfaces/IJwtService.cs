using MiniERP.Domain.Identity;

namespace MiniERP.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(ApplicationUser user, IEnumerable<string> roles);
}
