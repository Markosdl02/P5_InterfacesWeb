import { Handlers, PageProps } from "$fresh/server.ts";
import { useState } from "preact/hooks";
import { getProjects, saveProjects } from '../routes/cookies.tsx';
import { Project } from '../types.ts';

type Data = {
  projects: Project[];
}

export const handler: Handlers<Data> = {
    GET(req, ctx) {
      const projects = getProjects(req.headers.get("cookie") || "");
      return ctx.render({ projects });
    }
  };

export default function ProjectsPage({ data }: PageProps<Data>) {
  const [projects, setProjects] = useState(data.projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleDeleteProject = (projectName: string) => {
    const updatedProjects = projects.filter(project => project.name !== projectName);
    saveProjects(document.cookie, updatedProjects);
    setProjects(updatedProjects);
  };

  const handleDeleteFilm = (projectName: string, filmId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.name === projectName) {
        return {
          ...project,
          films: project.films.filter(film => film.id !== filmId)
        };
      }
      return project;
    });
    saveProjects(document.cookie, updatedProjects);
    setProjects(updatedProjects);
  };

  return (
    <div>
      <h1>My Projects</h1>
      {projects.map(project => (
        <div key={project.name}>
          <h2>{project.name}</h2>
          <button onClick={() => handleDeleteProject(project.name)}>Delete Project</button>
          <div>
            {project.films.map(film => (
              <div key={film.id}>
                <img src={film.image} alt={film.name} />
                <p>{film.name}</p>
                <button onClick={() => handleDeleteFilm(project.name, film.id)}>Remove Film</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}