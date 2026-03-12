using CourseEditor.Domain.Entities;
using CourseEditor.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly AppDbContext _db;

    public CoursesController(AppDbContext db)
    {
        _db = db;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateCourseDto dto)
    {
        var course = new Course(dto.Title, dto.Description);
        _db.Courses.Add(course);
        await _db.SaveChangesAsync();
        return Ok(course.Id);
    }

    [HttpPost("edit/{id}")]
    public async Task<IActionResult> Edit(Guid id, [FromBody] CreateCourseDto dto)
    {
        var course = await _db.Courses.FindAsync(id);

        if (course == null) return NotFound();
        
        course.Edit(dto.Title, dto.Description);
        await _db.SaveChangesAsync();
        
        return Ok(course);
    }

    [HttpPost("delete/{id}")]
    public async Task<IActionResult> Delete(int id, [FromBody] CreateCourseDto dto)
    {        
        return Ok();
    }

    [HttpGet("getcourses")]
    public async Task<IActionResult> GetCourses()
    {
        var courses = await _db.Courses
            .Select(c => new { c.Id, c.Title, c.Description, c.Status })
            .ToListAsync();

        return Ok(courses);
    }
    
    [HttpGet("getcourse/{id}")]
    public async Task<IActionResult> GetCourse(Guid id)    
    {
        var course = await _db.Courses.FindAsync(id);

        if (course == null) return NotFound();

        return Ok(course);
    }


    [HttpGet("getmodules/{id}")]
    public async Task<IActionResult> GetModules(Guid id)
    {
        var modules = await _db.Modules
            .Select(m => new { m.Id, m.CourseId, m.Title, m.OrderIndex})
            .Where(m =>  m.CourseId.Equals(id))
            .OrderBy(m => m.OrderIndex)
            .ToListAsync();

        return Ok(modules);
    }

    [HttpGet("getlessons/{id}")]
    public async Task<IActionResult> GetLessons(Guid id)
    {
        var lessons = await _db.Lessons
            .Select(m => new { m.Id, m.ModuleId, m.Title, m.OrderIndex })
            .Where(m => m.ModuleId.Equals(id))
            .OrderBy(m => m.OrderIndex)
            .ToListAsync();

        return Ok(lessons);
    }
    [HttpPost("createmodule/{id}")]
    public async Task<IActionResult> CreateModule([FromBody] CreateModuleDto dto)
    {
        var module = new Module(dto.CourseId, dto.Title, dto.OrderIndex);
        _db.Modules.Add(module);
        await _db.SaveChangesAsync();
        return Ok(module.Id);
    }
    [HttpPost("editmodule/{id}")]
    public async Task<IActionResult> EditModule(Guid id, [FromBody] string newTitle)
    {
        var module = await _db.Modules.FindAsync(id);
        if (module == null) return NotFound();
        
        module.UpdateTitle(newTitle);
        await _db.SaveChangesAsync();
        
        return Ok(module);
    }
    [HttpPost("movemodule/{id}")]
    public async Task<IActionResult> MoveModule(Guid id, [FromBody] int newOrderIndex)
    {
        var module = await _db.Modules.FindAsync(id);
        if (module == null) return NotFound();

        var course = await _db.Courses
            .Include(c => c.Modules)
            .FirstOrDefaultAsync(c => c.Id == module.CourseId);

        if (course == null) return NotFound();

        course.MoveModule(id, newOrderIndex);

        await _db.SaveChangesAsync();

        return Ok();
    }

    public class CreateCourseDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
    public class CreateModuleDto
    {
        public Guid CourseId { get; set; }
        public string? Title { get; set; }
        public int OrderIndex { get; set; }
    }
}