using CourseEditor.Application;
using CourseEditor.Domain.Enums;
using System.Text.Json;

public class JsonElementSerializer : IElementDataSerializer
{
    public string Serialize(IElementData data)
        => JsonSerializer.Serialize(data);

    public IElementData? Deserialize(ElementType type, string json)
    {
        return type switch
        {
            ElementType.Text => JsonSerializer.Deserialize<TextData>(json),
            ElementType.Image => JsonSerializer.Deserialize<ImageData>(json),
            _ => throw new NotSupportedException()
        };
    }
}