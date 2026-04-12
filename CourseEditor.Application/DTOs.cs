using CourseEditor.Domain.Enums;

namespace CourseEditor.Application;
public interface IElementData { }

public class TextData : IElementData
{
    public string Text { get; set; }
}

public class ImageData : IElementData
{
    public string Url { get; set; }
    public string Caption { get; set; }
}
public class CreateElementRequest
{
    public ElementType Type { get; set; }
    public IElementData Data { get; set; } // goes to serializer
}

public class UpdateElementRequest
{
    public IElementData Data { get; set; }
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