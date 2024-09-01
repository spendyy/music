"use client";
import { Playlist } from "@/components/Playlist";
import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
interface PlaylistData {
  image: string;
  authorId: number;
  applemusic: string;
  soundcloud: string;
  telegram: string;
  vk: string;
  biography: string;
}

interface TrackType {
  name: string;
  listenCount: number;
  trackId: number;
}

interface DownloadTrack {
  trackDownloadId: number;
  track: string;
}

export default function Tracks() {
  const router = usePathname().split("/").pop(); // Переместите сюда
  const [playlists, setPlaylists] = useState<PlaylistData>({
    image: "string",
    authorId: 4,
    applemusic: "string",
    soundcloud: "string",
    telegram: "string",
    vk: "string",
    biography: "string",
  });

  const [Goodtrack, setGoodTrack] = useState<TrackType[]>([
    {
      name: "string",
      listenCount: 0,
      trackId: 0,
    },
  ]);

  const [ArrayCount, setArrayCount] = useState<number[]>([]);

  const [downloadedTrack, setDownloadedTrack] = useState<DownloadTrack>({
    trackDownloadId: 0,
    track: "",
  });

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const response: AxiosResponse<PlaylistData> = await axios.get(
          `../api/playlists/${router}`
        );
        setPlaylists(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке плейлистов:", error);
      }
    }
    fetchPlaylists();

    async function fetchTracks() {
      try {
        const response: AxiosResponse<TrackType[]> = await axios.get(
          `../api/tracks/${router}`
        );
        setGoodTrack(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке плейлистов:", error);
      }
    }
    fetchTracks();
  }, []);
  return (
    <div className="w-full ">
      <Link href="/">
        <Button
          className="absolute left-0 max-sm:absolute max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:fixed"
          variant="outline"
        >
          Назад
        </Button>
      </Link>

      <AudioPlayer src={downloadedTrack.track} />

      <div className="flex flex-row">
        <div>
          <img
            className="w-96 h-96  rounded-3xl    p-4  max-sm:hidden"
            src={playlists.image}
          />
        </div>
        <div className="p-4 w-2/3  text-center divide-y divide-sky-100 max-sm:hidden">
          <div className="mb-2 ">
            <h1 className="m-auto text-3xl">БИОГРАФИЯ</h1>
            <p className="mt-8">{playlists.biography}</p>
          </div>

          <div>
            <p className="text-3xl mt-2">СОЦ СЕТИ </p>
            <div className="flex flex-row items-center justify-between mt-4">
              <a href={playlists.vk}>
                <img
                  width={50}
                  src="https://cdn.icon-icons.com/icons2/1753/PNG/512/iconfinder-social-media-applications-32vk-4102593_113806.png"
                />
              </a>
              <a href={playlists.soundcloud}>
                <img
                  width={80}
                  src="https://apphut.io/wp-content/uploads/Soundcloud-logo.png"
                />
              </a>
              <a href={playlists.telegram}>
                <img
                  width={90}
                  src="https://madbid.com/uploads/1719809925_.png"
                />
              </a>
              <a href={playlists.applemusic}>
                <img
                  width={70}
                  src="https://img.icons8.com/?size=100&id=69459&format=png&color=000000"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Play</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Прослушиваний</TableHead>
            <TableHead className="text-right">Скачать</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Goodtrack.map((track: TrackType, id) => (
            <TableRow
              key={id}
              onClick={async () => {
                try {
                  const response: AxiosResponse<DownloadTrack> =
                    await axios.get(`../api/downloadTrack/${track.trackId}`);
                  if (ArrayCount.includes(track.trackId) === false) {
                    setArrayCount([...ArrayCount, track.trackId]);
                    axios.put(`../api/downloadTrack/${track.trackId}`, {
                      count: track.listenCount + 1,
                    });
                  }

                  setDownloadedTrack(response.data);
                } catch (error) {
                  console.error("Ошибка при загрузке плейлистов:", error);
                }
              }}
              className={
                downloadedTrack.trackDownloadId === track.trackId
                  ? "cursor-pointer border-2 border-sky-500"
                  : "cursor-pointer"
              }
            >
              <TableCell className="font-medium">
                <Play />
              </TableCell>
              <TableCell className="font-medium">{track.name}</TableCell>
              <TableCell>{track.listenCount}</TableCell>
              <TableCell className="text-right">
                <a href={downloadedTrack.track}>
                  <Button variant="outline">Click</Button>
                </a>
              </TableCell>
            </TableRow>
          ))}
          <TableRow></TableRow>
        </TableBody>
      </Table>
    </div>

    // other props here
  );
}
