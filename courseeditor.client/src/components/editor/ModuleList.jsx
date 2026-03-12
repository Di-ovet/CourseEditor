import ModuleCard from "./ModuleCard";

function ModuleList({ modules }) {
  return (
    <div className="module-list">
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
}

export default ModuleList;
