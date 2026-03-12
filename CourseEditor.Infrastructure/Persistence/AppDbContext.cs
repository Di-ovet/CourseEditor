using CourseEditor.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseEditor.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Module> Modules => Set<Module>();
        public DbSet<Lesson> Lessons => Set<Lesson>();
        public DbSet<LessonElement> LessonElements => Set<LessonElement>();

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}