import { getCookies, setCookie } from "$std/http/cookie.ts";
import { Film, Project } from "../types.ts";

const PROJECTS_COOKIE = 'projects';

export function getProjects(cookieString?: string) {
    const cookies = cookieString ? cookieString.split(';').map(c => c.trim()) : document.cookie.split(';').map(c => c.trim());
    const projectsCookie = cookies.find(cookie => cookie.startsWith(`${PROJECTS_COOKIE}=`));
    return projectsCookie ? JSON.parse(projectsCookie.split('=')[1]) : [];
  }

export function saveProjects(cookieString: string, projects: Project[]) {
  const cookieValue = JSON.stringify(projects);
  document.cookie = `${PROJECTS_COOKIE}=${cookieValue}; path=/;`;
}

export function addFilmToProject(projects: Project[], projectName: string, film: Film) {
  const project = projects.find(p => p.name === projectName) || { name: projectName, films: [] };
  project.films.push(film);
  const newProjects = projects.filter(p => p.name !== projectName).concat(project);
  return newProjects;
}