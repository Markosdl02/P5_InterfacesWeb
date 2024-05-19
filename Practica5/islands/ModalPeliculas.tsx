import { useState, useEffect } from 'preact/hooks';
import { Film, Project } from '../types.ts';
import { getProjects, saveProjects, addFilmToProject } from '../routes/cookies.tsx';

type AddFilmModalProps = {
  film: Film;
  onClose: () => void;
}

export default function AddFilmModal({ film, onClose }: AddFilmModalProps) {
  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    const currentProjects = getProjects(document.cookie);
    setProjects(currentProjects);
  }, []);

  const handleSave = async () => {
    const updatedProjects = addFilmToProject(projects, projectName || selectedProject, film);
    const res = new Response();
    //saveProjects(res, updatedProjects);
    const cookie = await res.text(); 
    document.cookie = cookie; 
    setProjectName('');
    setSelectedProject('');
    onClose();
  };

  return (
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={onClose}>&times;</span>
        <h2>Add {film.name} to Project</h2>
        <input
          type="text"
          placeholder="New Project Name"
          value={projectName}
          onChange={(e) => setProjectName((e.target as HTMLInputElement).value)}
        />
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject((e.target as HTMLSelectElement).value)}
        >
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.name} value={project.name}>{project.name}</option>
          ))}
        </select>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}
