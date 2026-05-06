import { useState } from "react";
import type { Project } from "../types/project";

type Props = {
  project: Project;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string) => void;
};

function ProjectCard({
  project,
  onDelete,
  onUpdateStatus,
}: Props) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [title, setTitle] = useState(
    project.title
  );
  const [description, setDescription] =
    useState(project.description);

  return (
    <div
      style={{
        background: "#ffffff",
        borderLeft: "6px solid #2563eb",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "15px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <button
            onClick={() =>
              setIsEditing(false)
            }
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
        </>
      )}

      
      <p>
  <strong>Status:</strong>{" "}
  <span
    style={{
      color:
        project.status === "Completed"
          ? "green"
          : project.status === "In Progress"
          ? "#2563eb"
          : "gray",
      fontWeight: "bold",
    }}
  >
    {project.status}
  </span>
</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() =>
            onUpdateStatus(project.id)
          }
        >
          Update
        </button>

        <button
          onClick={() =>
            setIsEditing(true)
          }
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(project.id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;