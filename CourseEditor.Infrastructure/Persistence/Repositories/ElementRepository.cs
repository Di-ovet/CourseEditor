using CourseEditor.Domain.Entities;
using CourseEditor.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public class ElementRepository : IElementRepository
{
    private readonly AppDbContext _db;

    public ElementRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task<LessonPage?> GetPageWithElements(Guid pageId)
    {
        return await _db.LessonPages
            .Include(p => p.Elements)
            .FirstOrDefaultAsync(p => p.Id == pageId);
    }

    public async Task<LessonElement?> GetByIdAsync(Guid id)
    {
        return await _db.LessonElements.FindAsync(id);
    }

    public async Task AddAsync(LessonElement element)
    {
        await _db.LessonElements.AddAsync(element);
    }

    public Task SaveChangesAsync()
    {
        return _db.SaveChangesAsync();
    }
}