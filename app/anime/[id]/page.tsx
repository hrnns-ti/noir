'use client'

import Image from "next/image"
import Link from "next/link";
import { useParams } from "next/navigation";
export const runtime = 'edge';
import { useEffect, useState, useCallback } from "react";


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
          href={anime.streaming.slice(-1)[0].url} 
          className="border-2 border-black px-12 py-2 max-w-2xl justify-center items-center bg-black text-white hover:bg-white hover:text-black"
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
      <section className="">
      </section>
    </main>
  )
}