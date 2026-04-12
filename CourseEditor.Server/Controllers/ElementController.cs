using CourseEditor.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseEditor.Application;

[ApiController]
[Route("api/elements")]
public class ElementsController : ControllerBase
{
    private readonly ElementService _service;

    private readonly AppDbContext _db;

    public ElementsController(AppDbContext db, ElementService service)
    {
        _db = db;
        _service = service;
    }

    [HttpGet("page/{pageId}")]
    public async Task<IActionResult> GetElements(Guid pageId)
    {
        var elements = await _db.LessonElements
            .Where(e => e.PageId == pageId)
            .OrderBy(e => e.OrderIndex)
            .Select(e => new
            {
                e.Id,
                e.ElementType,
                e.Data,
                e.OrderIndex
            })
            .ToListAsync();

        return Ok(elements);
    }

    [HttpPost("addelement/{pageId}")]
    public async Task<IActionResult> AddElement(Guid pageId, [FromBody] CreateElementRequest request)
    {
        var id = await _service.AddElement(pageId, request.Type, request.Data);
        return Ok(id);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> UpdateData(Guid id, [FromBody] CreateElementRequest request)
    {
        await _service.UpdateElementData(id, request.Data);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var element = await _db.LessonElements.FindAsync(id);
        if (element == null) return NotFound();

        _db.LessonElements.Remove(element);

        await _db.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("moveelement/{id}")]
    public async Task<IActionResult> MoveElement(Guid id, [FromBody] int newOrderIndex)
    {
        var element = await _db.LessonElements.FindAsync(id);
        if (element == null) return NotFound();

        var page = await _db.LessonPages
            .Include(l => l.Elements)
            .FirstOrDefaultAsync(l => l.Id == element.PageId);

        if (page == null) return NotFound();

        page.MoveElement(id, newOrderIndex);

        await _db.SaveChangesAsync();

        return Ok();
    }

}