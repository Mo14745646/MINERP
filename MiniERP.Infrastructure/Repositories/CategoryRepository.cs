using MiniERP.Application.Interfaces.Repositories;
using MiniERP.Domain.Entities;
using MiniERP.Infrastructure.Persistence;

namespace MiniERP.Infrastructure.Repositories;

public class CategoryRepository(ApplicationDbContext context) 
    : Repository<Category>(context), ICategoryRepository
{
}
