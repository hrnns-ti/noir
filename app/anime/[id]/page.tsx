'use client'

import Image from "next/image"
import Link from "next/link";
import { useParams } from "next/navigation";
export const runtime = 'edge';
import { useEffect, useState } from "react";


export default function AnimeDetailPagee() {

  const params = useParams();
  const id = params.id

  const [anime, setAnime] = useState<any>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
        const { data } = await response.json()
        setAnime(data)
      } catch (error) {
        console.error(`Error: ${error}`)
      }
    }
    
    if (id) fetchDetail()
  }, [id])


  if (!anime) return <div>Loading...</div>;

  const streamingUrl = anime.streaming && anime.streaming.length > 0 
  ? anime.streaming.slice(-1)[0].url 
  : null;

  return (
    <main className="px-24">
      <section className=" flex flex-row w-full mt-24 relative gap-14 
      ">
        <div className="w-2/9 h-full aspect-3/4 relative">
          <Image
            src={anime.images.jpg.large_image_url}
            fill
            alt="Anime"
            unoptimized
            quality={150}
            className="absolute object-cover"
          />
        </div>
        <div className="flex flex-col w-5/7 justify-end gap-4">
          <p className="bg-black text-white w-fit text-xs px-4 py-2 font-semibold tracking-widest">
            {(anime.status).toUpperCase()}
          </p>
          <div className="w-fit my-4">
            <h1 className="text-5xl font-bold max-w-2xl mb-16">
              {(anime.title).toUpperCase()}
            </h1>
            <hr className="text-gray-400"/>
          </div>
          <div className="flex flex-row gap-12">
            <div className="flex flex-col justify-center items-center">
              <p className="font-semibold text-gray-400">SCORE</p>
              <p className="text-3xl font-semibold">{(anime.score)}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-semibold text-gray-400">RANK</p>
              <p className="text-3xl font-semibold">#{(anime.rank)}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="font-semibold text-gray-400">FAVORITES</p>
              <p className="text-3xl font-semibold">{(anime.favorites)}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-1/6 py-8 border-y border-gray-300 flex flex-row gap-8 my-18">
        <Link
          target="_blank" rel="noopener noreferrer"
          href={streamingUrl || '#'}
          onClick={(e) => !streamingUrl && e.preventDefault()} 
          className={`
            border-2 border-black px-12 py-2 max-w-2xl justify-center items-center ${streamingUrl 
            ? "bg-black text-white hover:bg-white hover:text-black cursor-pointer" 
            : "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"}
          `}
        >
          <p className="truncate tracking-widest">STREAMING</p>
        </Link>
        <Link 
          href={''} 
          className="border-2 px-12 py-2 max-w-2xl flex justify-center items-center bg-white text-black hover:bg-black hover:text-white hover: border-black"
        >
          <p className="truncate">WATCH IT</p>
        </Link>
        <Link href={''} className="border-2 px-12 py-2 max-w-2xl flex justify-center items-center bg-white text-black hover:bg-black hover:text-white hover: border-black">
          <p className="truncate">SHARE</p>
        </Link>
      </section>
      <section className="w-full min-h-screen flex flex-row gap-14">
        <div className="flex flex-col gap-12 w-1/6">
          <div className="flex flex-col w-full h-auto gap-2">
            <div>
              <h1 className="font-semibold tracking-wider">INFORMATION</h1>
              <hr className="mb-4"/>
            </div>
            <div>
              <h1 className="font-semibold text-gray-400 tracking-wider text-sm">TYPE</h1>
              <p>{anime.type || '-'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-gray-400 tracking-wider text-sm">EPISODES</h1>
              <p>{anime.episodes || '-'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-gray-400 tracking-wider text-sm">STATUS</h1>
              <p>{anime.status || '-'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-gray-400 tracking-wider text-sm">AIRED</h1>
              <p>{anime.airing.from || '-'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-gray-400 tracking-wider text-sm">SEASON</h1>
              <p>{anime.season || '-'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-gray-400 tracking-wider text-sm">STUDIOS</h1>
              <p>{anime.studios[0].name || '-'}</p>
            </div>
            <div>
              <h1 className="font-semibold text-gray-400 tracking-wider text-sm">SOURCE</h1>
              <p>{anime.source || '-'}</p>
            </div>
          </div>
          <div className="w-full h-auto">
            <h1 className="font-semibold tracking-wider">GENRES</h1>
            <hr className="mb-4" />
            <div className="max-w-full flex h-auto gap-4 flex-wrap">
              {anime.genres.map((genre:any) => (
                <div
                  key={genre.mal_id}
                  className="w-fit px-6 py-1 border text-sm"
                >
                  {genre.name}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-auto">
            <h1 className="font-semibold tracking-wider">THEMES</h1>
            <hr className="mb-4" />
            <div className="max-w-full flex h-auto gap-4 flex-wrap">
              {anime.themes.map((theme:any) => (
                <div
                  key={theme.mal_id}
                  className="w-fit px-6 py-1 border text-sm"
                >
                  {theme.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12 w-4/5">
          <div className="flex flex-col gap-4 w-full h-auto">
            <h1 className="text-2xl font-semibold tracking-wider">SYNOPSIS</h1>
            <p>{anime.synopsis}</p>
          </div>
          <div className="flex flex-col gap-4 w-full h-auto">
            <h1 className="text-2xl font-semibold tracking-wider">TRAILER</h1>
            <div className="flex justify-center">
              <iframe 
                src={anime.trailer.embed_url}
                width={800}
                height={450}
              >
                Anime Trailer
              </iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}