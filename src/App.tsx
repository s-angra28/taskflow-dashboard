import { useState, useEffect } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectCard from "./components/ProjectCard";
import type { Project } from "./types/project";

function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("projects");
    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (
    title: string,
    description: string
  ) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      priority: "High",
      status: "Not Started",
      category: "Work",
    };

    setProjects([...projects, newProject]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(
      projects.filter((project) => project.id !== id)
    );
  };

  const handleUpdateStatus = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? {
              ...project,
              status:
                project.status === "Not Started"
                  ? "In Progress"
                  : project.status === "In Progress"
                  ? "Completed"
                  : "Not Started",
            }
          : project
      )
    );
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      project.description
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const completed = projects.filter(
    (p) => p.status === "Completed"
  ).length;

  const inProgress = projects.filter(
    (p) => p.status === "In Progress"
  ).length;

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "Arial",
        minHeight: "100vh",
        background: "#f4f7fb",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "36px",
          color: "#1e3a8a",
          fontWeight: "bold",
        }}
      >
        TaskFlow Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "150px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total</h3>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2563eb",
            }}
          >
            {projects.length}
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "150px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Completed</h3>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "green",
            }}
          >
            {completed}
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "150px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>In Progress</h3>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#f59e0b",
            }}
          >
            {inProgress}
          </p>
        </div>
      </div>

      <ProjectForm onAddProject={handleAddProject} />

      <input
        type="text"
        placeholder="Search projects..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      {filteredProjects.length === 0 ? (
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            padding: "40px",
            background: "white",
            borderRadius: "12px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h2>No Projects Found</h2>
          <p>
            Create your first project to get
            started.
          </p>
        </div>
      ) : (
        filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDeleteProject}
            onUpdateStatus={handleUpdateStatus}
          />
        ))
      )}
    </div>
  );
}

export default App;
