using CourseEditor.Domain.Enums;

public class LessonElement
{
    public Guid Id { get; private set; }

    public Guid PageId { get; private set; } 

    public ElementType ElementType { get; private set; }

    public string Data { get; private set; } 

    public int OrderIndex { get; private set; }

    protected LessonElement() { }

    public LessonElement(Guid pageId, ElementType type, string data, int order)
    {
        Id = Guid.NewGuid();
        PageId = pageId;
        ElementType = type;
        Data = data;
        OrderIndex = order;
    }
    public void UpdateOrderIndex(int order)
    {
        OrderIndex = order;
    }
    public void SetData(string data)
    {
        Data = data;
    }
}