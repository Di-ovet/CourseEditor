using CourseEditor.Domain.Enums;
using System.Text.Json;

namespace CourseEditor.Application;

public class CreateElementRequest
{
    public ElementType Type { get; set; }
    public string Data { get; set; }
    public int OrderIndex { get; set; }

}

public class UpdateElementRequest
{
    public string Data { get; set; }

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
public class CreateLessonDto
{
    public string? Title { get; set; }
    public int OrderIndex { get; set; }
}

// Новый DTO для редактирования модуля
public class UpdateTitleDto
{
    public string? Title { get; set; }
}