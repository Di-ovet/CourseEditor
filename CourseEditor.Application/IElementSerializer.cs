using CourseEditor.Domain.Enums;
namespace CourseEditor.Application;

public interface IElementDataSerializer
{
    string Serialize(IElementData data);
    IElementData? Deserialize(ElementType type, string json);
}