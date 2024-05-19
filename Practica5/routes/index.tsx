import { Handlers, PageProps } from "$fresh/server.ts";
import { fetchFilms } from '../routes/api/APIpeliculas.ts';
import Home from '../islands/Home.tsx';
import { Film } from '../types.ts';

type Data = {
  films: Film[];
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const films = await fetchFilms();
    return ctx.render({ films });
  }
};

export default function Page({ data }: PageProps<Data>) {
  return (
    <div>
      <h1>Welcome to the Film Project</h1>
      <Home films={data.films} />
    </div>
  );
}
