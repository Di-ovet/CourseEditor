import React from "react";
import { Button } from "react-bootstrap";
import { createPage } from "../../../api/lessons";
import "../../../styles.css";

const AddPageButton = ({ lessonId, onPageAdded }) => {
  const handleAddPage = async () => {
    try {
      const newPageId = await createPage(lessonId, "Новая страница");
      if (onPageAdded) {
        onPageAdded({ id: newPageId, title: "Новая страница", orderIndex: 0 });
      }
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  return (
    <Button className="btn-add-page" onClick={handleAddPage}>
      + Add Page
    </Button>
  );
};
export default AddPageButton;
