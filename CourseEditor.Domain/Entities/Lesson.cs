using CourseEditor.Domain.Enums;

namespace CourseEditor.Domain.Entities
{
    public class Lesson
    {
        public Guid Id { get; private set; }

        public Guid? ModuleId { get; private set; }

        public string Title { get; private set; }
        public int OrderIndex { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        private readonly List<LessonPage> _pages = new();
        public IReadOnlyCollection<LessonPage> Pages => _pages;

        protected Lesson() { }

        public Lesson(Guid moduleId, string title, int order)
        {
            Id = Guid.NewGuid();
            ModuleId = moduleId;
            Title = title;
            OrderIndex = order;
            Update();
        }
        public void UpdateOrderIndex(int order)
        {
            OrderIndex = order;
        }
        public void Update()
        {
            UpdatedAt = DateTime.UtcNow;
        }
        public void Edit(string? newTitle)
        {
            Title = newTitle;
        }
        public LessonPage AddPage(Guid id, string title)
        {

            var page = new LessonPage(id, title, _pages.Count);

            _pages.Add(page);

            return page;
        }
        public void MovePage(Guid pageId, int newIndex)
        {
            var page = _pages.Find(m => m.Id == pageId);
            if (page == null)
                throw new InvalidOperationException();
            _pages.Remove(page);
            if (newIndex < 0) newIndex = 0;
            if (newIndex > _pages.Count) newIndex = _pages.Count;
            _pages.Insert(newIndex, page);
            for (int i = 0; i < _pages.Count; i++)
            {
                _pages[i].UpdateOrderIndex(i);
            }
        }   
    }
}
