import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { json } from "remix";
import { getTrackDetails } from "~/models/track.server";

type LoaderData = {
  track: {
    title: string;
    artist: string;
    album: string;
    lyrics: string;
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const track = await getTrackDetails(slug);
  if (!track) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ track });
};

export default function TrackDetails() {
  const { track } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>{track.title}</h1>
      <p><strong>Artist:</strong> {track.artist}</p>
      <p><strong>Album:</strong> {track.album}</p>
      <div>
        <h2>Lyrics</h2>
        <pre>{track.lyrics}</pre>
      </div>
    </div>
  );
}