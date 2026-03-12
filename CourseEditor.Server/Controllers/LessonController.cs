using CourseEditor.Domain.Entities;
using CourseEditor.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("lessons")]
public class LessonsController : ControllerBase
{
    private readonly AppDbContext _db;

    public LessonsController(AppDbContext db)
    {
        _db = db;
    }
    [HttpGet]
    public string Get()
    {
        return "yoy";
    }

    [HttpPost]
    public async Task<IActionResult> Create(Guid moduleId, string title, int order)
    {
        var lesson = new Lesson(moduleId, title, order);

        _db.Lessons.Add(lesson);

        await _db.SaveChangesAsync();

        return Ok(lesson.Id);
    }
}