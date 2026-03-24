using CourseEditor.Domain.Enums;
using System.Net.NetworkInformation;
using System.Reflection;

namespace CourseEditor.Domain.Entities
{
    public class Module
    {
        public Guid Id { get; private set; }

        public Guid CourseId { get; private set; }

        public string Title { get; private set; }
        public int OrderIndex { get; private set; }

        private readonly List<Lesson> _lessons = new();
        public IReadOnlyCollection<Lesson> Lessons => _lessons;
        protected Module() { }

        public Module(Guid courseid, string? title, int order)
        {
            Id = Guid.NewGuid();
            CourseId = courseid;
            if (title != null) Title = title; else Title = "New module";
            OrderIndex = order;
        }

        public void UpdateTitle(string title)
        {
            Title = title;
        }

        public void UpdateOrderIndex(int order)
        {
            OrderIndex = order;
        }

        public Lesson AddLesson(Guid id,  string title)
        {
            var lesson = new Lesson(id, title, _lessons.Count);

            _lessons.Add(lesson);

            return lesson;
        }
        public void MoveLesson(Guid lessonId, int newIndex)
        {
            var lesson = _lessons.Find(m => m.Id == lessonId);
            if (lesson == null)
                throw new InvalidOperationException();

            _lessons.Remove(lesson);

            if (newIndex < 0) newIndex = 0;
            if (newIndex > _lessons.Count) newIndex = _lessons.Count;

            _lessons.Insert(newIndex, lesson);

            for (int i = 0; i < _lessons.Count; i++)
            {
                _lessons[i].UpdateOrderIndex(i);
            }
        }
    }
}
