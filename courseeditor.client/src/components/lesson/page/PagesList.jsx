import LessonPage from "./LessonPage";

function PagesList({ pages }) {
  return (
    <div className="page-list">
      {pages.map((page) => (
        <LessonPage page={page} />
      ))}
    </div>
  );
}
export default PagesList;
