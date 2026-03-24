using CourseEditor.Domain.Entities;
using CourseEditor.Domain.Enums;
using CourseEditor.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

[ApiController]
[Route("lessons")]
public class LessonsController : ControllerBase
{
    private readonly AppDbContext _db;

    public LessonsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost ("editname/{id}")]
    public async Task<IActionResult> EditName(Guid id, string newName)
    {
        var lesson = await _db.Lessons.FindAsync(id);
        if (lesson == null) return NotFound();

        lesson.Edit(newName);

        await _db.SaveChangesAsync();

        return Ok(lesson);
    }
    [HttpDelete("deletelesson/{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var lesson = await _db.Lessons.FindAsync(id);
        if (lesson == null) return NotFound();

        _db.Remove(lesson);

        await _db.SaveChangesAsync();

        return Ok("Deleted");
    }
    [HttpGet("getpages/{lessonId}")]
    public async Task<IActionResult> GetPages(Guid lessonId)
    {

        var pages = await _db.LessonElements
            .Select(m => new { m.Id, m.LessonId, m.ElementType, m.Data, m.OrderIndex })
            .Where(m => m.LessonId.Equals(lessonId))
            .OrderBy(m => m.OrderIndex)
            .ToListAsync();

        return Ok(pages);
    }
    [HttpPost("addpage/{lessonId}")]
    public async Task<IActionResult> AddPage(Guid lessonId, ElementType elementType = ElementType.Text)
    {
        var lesson = await _db.Lessons.FindAsync(lessonId);
        if (lesson == null) return NotFound();
        var page = lesson.AddPage(lessonId, elementType);
        await _db.SaveChangesAsync();
        return Ok(page);
    }
    [HttpPost("savechanges/{id}")]
    public async Task<IActionResult> SaveAllChanges(Guid id, string data)
    {
        var pages = await _db.LessonElements
            .Where(m => m.LessonId.Equals(id))
            .OrderBy(m => m.OrderIndex)
            .ToListAsync();

        if (pages == null) return NotFound();
        
        for ( var i = 0; i < pages.Count; i++)
        {
            pages[i].UpdateData(data);
        }

        await _db.SaveChangesAsync();
        return Ok("Saved changes.");
    }
}