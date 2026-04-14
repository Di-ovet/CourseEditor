using CourseEditor.Application;
using CourseEditor.Domain.Enums;
using System.Text.Json;
namespace CourseEditor.Application;

public class ElementService
{
    private readonly IElementRepository _repo;
   

    public ElementService(IElementRepository repo)
    {
        _repo = repo;
    }

    public async Task<LessonElement> AddElement(Guid pageId, ElementType type, string json, int order)
    {
        var element = new LessonElement(pageId, type, json, order);

        await _repo.AddAsync(element);
        await _repo.SaveChangesAsync();

        return element;
    }

    public async Task UpdateElementData(Guid elementId, string json)
    {
        var element = await _repo.GetByIdAsync(elementId) ?? throw new Exception("Element not found");
        element.SetData(json);

        await _repo.SaveChangesAsync();
    }
}