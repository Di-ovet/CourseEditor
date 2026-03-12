namespace CourseEditor.Domain.Entities
{
    public class Lesson
    {
        public Guid Id { get; private set; }

        public Guid? ModuleId { get; private set; }

        public string Title { get; private set; }
        public int OrderIndex { get; private set; }
        public DateTime UpdatedAt { get; private set; }

        protected Lesson() { }

        public Lesson(Guid moduleId, string title, int order)
        {
            Id = Guid.NewGuid();
            ModuleId = moduleId;
            Title = title;
            OrderIndex = order;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Update()
        {
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
