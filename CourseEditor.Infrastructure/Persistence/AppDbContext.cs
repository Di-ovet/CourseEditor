using CourseEditor.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CourseEditor.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Module> Modules => Set<Module>();
        public DbSet<Lesson> Lessons => Set<Lesson>();
        public DbSet<LessonPage> LessonPages => Set<LessonPage>();
        public DbSet<LessonElement> LessonElements => Set<LessonElement>();

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Module -> Lesson (cascade delete)
            modelBuilder.Entity<Module>()
                .HasMany(m => m.Lessons)
                .WithOne()
                .HasForeignKey(l => l.ModuleId)
                .OnDelete(DeleteBehavior.Cascade);

            // Lesson -> LessonPage (cascade delete)
            modelBuilder.Entity<Lesson>()
                .HasMany(l => l.Pages)
                .WithOne()
                .HasForeignKey(p => p.LessonId)
                .OnDelete(DeleteBehavior.Cascade);

            // LessonPage -> LessonElement (cascade delete)
            modelBuilder.Entity<LessonPage>()
                .HasMany(p => p.Elements)
                .WithOne()
                .HasForeignKey(e => e.PageId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}