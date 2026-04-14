using CourseEditor.Domain.Enums;

namespace CourseEditor.Domain.Entities
{
    public class LessonPage
    {
        public Guid Id { get; private set; }
        public Guid LessonId { get; private set; }
        public string Title { get; private set; }

        public int OrderIndex { get; private set; }

        private readonly List<LessonElement> _elements = new();
        public IReadOnlyCollection<LessonElement> Elements => _elements;

        protected LessonPage() { }

        public LessonPage(Guid lessonId, string title, int order)
        {
            Id = Guid.NewGuid();
            LessonId = lessonId;
            Title = title;
            OrderIndex = order;
        }

        public LessonElement AddElement(ElementType type, string data)
        {
            var el = new LessonElement(Id, type, data, _elements.Count);
            _elements.Add(el);
            return el;
        }
        public void UpdateOrderIndex(int order)
        {
            OrderIndex = order;
        }
        public void UpdateTitle(string title)
        {
            Title = title;
        }
        public void MoveElement(Guid elementId, int newIndex)
        {
            var page = _elements.Find(m => m.Id == elementId);
            if (page == null)
                throw new InvalidOperationException();
            _elements.Remove(page);
            if (newIndex < 0) newIndex = 0;
            if (newIndex > _elements.Count) newIndex = _elements.Count;
            _elements.Insert(newIndex, page);
            for (int i = 0; i < _elements.Count; i++)
            {
                _elements[i].UpdateOrderIndex(i);
            }
        }
    }
}
