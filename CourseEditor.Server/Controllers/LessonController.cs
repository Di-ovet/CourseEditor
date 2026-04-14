using CourseEditor.Application;
using CourseEditor.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/lessons")]
public class LessonController : ControllerBase
{
    private readonly AppDbContext _db;
    //
    public LessonController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPut("edittitle/{id}")]
    public async Task<IActionResult> EditTitle(Guid id, [FromBody] UpdateTitleDto dto)
    {
        var lesson = await _db.Lessons.FindAsync(id);
        if (lesson == null) return NotFound();

        lesson.Edit(dto.Title);
        await _db.SaveChangesAsync();

        return Ok(dto.Title);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var lesson = await _db.Lessons.FindAsync(id);
        if (lesson == null) return NotFound();

        _db.Lessons.Remove(lesson);
        await _db.SaveChangesAsync();

        return Ok();
    }
}