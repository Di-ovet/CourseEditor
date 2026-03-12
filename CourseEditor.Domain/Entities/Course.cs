using CourseEditor.Domain.Enums;
namespace CourseEditor.Domain.Entities
{

    public class Course
    {
        public Guid Id { get; private set; }

        public string Title { get; private set; }
        public string? Description { get; private set; }

        public CourseStatus Status { get; private set; }

        private readonly List<Module> _modules = new();
        public IReadOnlyCollection<Module> Modules => _modules;

        protected Course() { }

        public Course(string? title, string? description)
        {
            Id = Guid.NewGuid();
            if (title != null) Title = title; else Title = "New course";
            Status = CourseStatus.Draft;
            this.AddModule(Id, "New module");
            Description = description;
        }

        public void Activate()
        {
            if (Status != CourseStatus.Draft)
                throw new InvalidOperationException();

            Status = CourseStatus.Active;
        }
        public void Edit(string? newTitle, string? newDescription)
        {
            Title = newTitle;
            Description = newDescription;
        }

        public void Finish()
        {
            if (Status != CourseStatus.Active)
                throw new InvalidOperationException();

            Status = CourseStatus.Finished;
        }

        public Module AddModule(Guid id, string title)
        {
            if (Status == CourseStatus.Finished)
                throw new InvalidOperationException();

            var module = new Module(id, title, _modules.Count);

            _modules.Add(module);

            return module;
        }

        // Новый метод: переместить модуль в пределах курса
        public void MoveModule(Guid moduleId, int newIndex)
        {
            if (Status == CourseStatus.Finished)
                throw new InvalidOperationException();

            var module = _modules.Find(m => m.Id == moduleId);
            if (module == null)
                throw new InvalidOperationException();

            _modules.Remove(module);

            if (newIndex < 0) newIndex = 0;
            if (newIndex > _modules.Count) newIndex = _modules.Count;

            _modules.Insert(newIndex, module);

            for (int i = 0; i < _modules.Count; i++)
            {
                _modules[i].UpdateOrderIndex(i);
            }
        }
    }

}
