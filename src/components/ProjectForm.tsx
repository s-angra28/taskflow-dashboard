
import { useState } from "react";

type Props = {
  onAddProject: (
    title: string,
    description: string
  ) => void;
};

function ProjectForm({ onAddProject }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title || !description) return;

    onAddProject(title, description);

    setTitle("");
    setDescription("");
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2
        style={{
          marginBottom: "15px",
          fontSize: "24px",
        }}
      >
        Add New Project
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          style={{
            flex: 2,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;