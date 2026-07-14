// functions/api/tmdb/[[path]].ts
interface Env {
  TMDB_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const tmdbPath = url.pathname.replace("/api", "");
  const tmdbUrl = `https://api.themoviedb.org/3${tmdbPath}${url.search}`;

  const response = await fetch(tmdbUrl, {
    headers: { Authorization: `Bearer ${context.env.TMDB_TOKEN}` },
  });

  return new Response(response.body, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
};
