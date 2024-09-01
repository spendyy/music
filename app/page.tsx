"use client";
import { Playlist } from "@/components/Playlist";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PlaylistData {
  id: number;
  name: string;
  image: string;
  authorId: number;
}

export default function Home() {
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response: AxiosResponse<PlaylistData[]> = await axios.get(
          "api/playlists"
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке плейлистов:", error);
      }
    }
    fetchPlaylists();
  }, []);

  return (
    <div className="p-10 max-sm:items-center">
      <h1 className="text-5xl cursor-default text-center">Плейлисты</h1>
      <div className="mt-8 flex flex-row gap-4 flex-wrap items-center bg-neutral-800 max-sm:bg-neutral-900 max-sm:gap-0 max-sm:justify-center  rounded-3xl">
        {playlists.map((playlist, id) => (
          <Link key={id} href={`/tracks/${playlist.id}`}>
            <Playlist
              className="w-96 h-96 "
              key={playlist.id}
              name={playlist.name}
              imageURL={playlist.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
