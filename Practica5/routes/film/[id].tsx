import { Handlers, PageProps } from "$fresh/server.ts";
import FilmDetail from '../../islands/DetallesPeliculas.tsx';

type Data = {
  params: { id: string };
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const { id } = ctx.params;
    return ctx.render({ params: { id } });
  }
};

export default function FilmPage({ data }: PageProps<Data>) {
  return (
    <div>
      <FilmDetail params={data.params} />
    </div>
  );
}