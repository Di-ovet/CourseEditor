using CourseEditor.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseEditor.Application;

[ApiController]
[Route("api/pages")]
public class PageController : ControllerBase
{
    private readonly AppDbContext _db;

    public PageController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("getpages/{lessonId}")]
    public async Task<IActionResult> GetPages(Guid lessonId)
    {
        var pages = await _db.LessonPages
            .Where(p => p.LessonId == lessonId)
            .OrderBy(p => p.OrderIndex)
            .Select(p => new
            {
                p.Id,
                p.Title,
                p.OrderIndex
            })
            .ToListAsync();
        if (pages.Count == 0) { return NotFound("No pages."); }

        return Ok(pages);
    }
        
    [HttpPost("createpage/{lessonId}")]
    public async Task<IActionResult> AddPage(Guid lessonId, [FromBody] UpdateTitleDto? dto)
    {
        if (dto == null) return BadRequest("Body is required.");

        var lesson = await _db.Lessons
            .Include(l => l.Pages)
            .FirstOrDefaultAsync(l => l.Id == lessonId);

        if (lesson == null) return NotFound();

        var title = string.IsNullOrWhiteSpace(dto.Title) ? "Новая страница" : dto.Title!;
        var page = lesson.AddPage(lesson.Id, title);

        // Явно добавить новую страницу в DbContext — гарантируем INSERT
        _db.LessonPages.Add(page);

        try
        {
            await _db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            return Conflict("Concurrent modification detected while saving pages.");
        }

        return Ok(page.Id);
    }


    [HttpPost("movepage/{id}")]
    public async Task<IActionResult> MovePage(Guid id, [FromBody] int newOrderIndex)
    {
        var page = await _db.LessonPages.FindAsync(id);
        if (page == null) return NotFound();

        var lesson = await _db.Lessons
            .Include(l => l.Pages)
            .FirstOrDefaultAsync(l => l.Id == page.LessonId);

        if ( lesson == null) return NotFound();

        lesson.MovePage(id, newOrderIndex);

        await _db.SaveChangesAsync();

        return Ok();
    }
}