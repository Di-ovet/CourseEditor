using CourseEditor.Domain.Enums;
namespace CourseEditor.Domain.Entities
{
    public class LessonElement
    {
        public Guid Id { get; private set; }

        public Guid LessonId { get; private set; }

        public ElementType ElementType { get; private set; }

        public string Data { get; private set; }

        public int OrderIndex { get; private set; }

        protected LessonElement() { }

        public LessonElement(Guid lessonId, ElementType type, string data, int order)
        {
            Id = Guid.NewGuid();
            LessonId = lessonId;
            ElementType = type;
            Data = data;
            OrderIndex = order;
        }
    }
}
