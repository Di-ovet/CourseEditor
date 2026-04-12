using CourseEditor.Application;
using CourseEditor.Domain.Enums;
namespace CourseEditor.Application;

public class ElementService
{
    private readonly IElementRepository _repo;
    private readonly IElementDataSerializer _serializer;

    public ElementService(IElementRepository repo, IElementDataSerializer serializer)
    {
        _repo = repo;
        _serializer = serializer;
    }

    public async Task<Guid> AddElement(Guid pageId, ElementType type, IElementData dto)
    {
        var page = await _repo.GetPageWithElements(pageId);
        if (page == null) throw new Exception("Page not found");

        var json = _serializer.Serialize(dto);

        var element = page.AddElement(type, json);

        await _repo.SaveChangesAsync();

        return element.Id;
    }

    public async Task UpdateElementData(Guid elementId, IElementData dto)
    {
        var element = await _repo.GetByIdAsync(elementId);
        if (element == null) throw new Exception("Element not found");

        var json = _serializer.Serialize(dto);

        element.SetData(json);

        await _repo.SaveChangesAsync();
    }
}