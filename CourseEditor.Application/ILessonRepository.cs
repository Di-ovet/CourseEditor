using CourseEditor.Domain.Entities;

public interface ILessonRepository
{
    Task<Lesson?> GetByIdAsync(Guid id);
    Task SaveChangesAsync();
}