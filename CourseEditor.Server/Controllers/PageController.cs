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
                p.OrderIndex,
                elements = new List<object>()
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
 
    [HttpDelete("deletepage/{pageId}")]
    public async Task<IActionResult> DeletePage(Guid pageId)
    {
        var page = await _db.LessonPages.FindAsync(pageId);
        if (page == null) return NotFound();

        _db.LessonPages.Remove(page);
        await _db.SaveChangesAsync();

        return NoContent();
    }
    [HttpPut("editpagetitle/{pageId}")]
    public async Task<IActionResult> EditPageTitle(Guid pageId, [FromBody] UpdateTitleDto dto)
    {
        if (dto == null) return BadRequest("Body is required.");
        var page = await _db.LessonPages.FindAsync(pageId);
        if (page == null) return NotFound();
        page.UpdateTitle(dto.Title);
        await _db.SaveChangesAsync();
        return Ok(dto.Title);
    }
}