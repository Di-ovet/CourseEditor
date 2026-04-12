using CourseEditor.Domain.Entities;

public interface IElementRepository
{
    Task<LessonElement?> GetByIdAsync(Guid id);
    Task<LessonPage?> GetPageWithElements(Guid pageId);
    Task AddAsync(LessonElement element);
    Task SaveChangesAsync();
}