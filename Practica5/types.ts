export type Film ={
    id: string;
    name: string;
    brand: string;
    iso: string;
    format: string;
    color: string;
    image: string;
  }
  
  export type Filters = {
    brand?: string;
    iso?: string;
    format?: string;
    color?: string;
    name?: string;
  }

  export type Project = {
    name: string;
    films: Film[];
  }