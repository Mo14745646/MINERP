using Microsoft.EntityFrameworkCore;
using MiniERP.Application.Interfaces.Repositories;
using MiniERP.Infrastructure.Persistence;

namespace MiniERP.Infrastructure.Repositories;

public class Repository<T>(ApplicationDbContext context) : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext _context = context;
    protected readonly DbSet<T> _dbSet = context.Set<T>();

    public async Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _dbSet.FindAsync([id], cancellationToken);

    public async Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default)
        => await _dbSet.ToListAsync(cancellationToken);

    public void Add(T entity) => _dbSet.Add(entity);
    public void Update(T entity) => _context.Entry(entity).State = EntityState.Modified;
    public void Remove(T entity) => _dbSet.Remove(entity);
}
