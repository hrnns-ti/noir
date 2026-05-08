'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import { Search, X } from "lucide-react";

export default function Home() {
  
  const [searchQuery, setSearchQuery] = useState('')
  const [topList, setTopList] = useState<any[]>([])
  const [topAiring, setTopAiring] = useState<any[]>([])
  const router = useRouter()

  const fetchTrending = useCallback(async() => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?limit=4`
      )
      const { data } = await response.json()
      setTopList(data)
    } catch (error) {
      console.error('gagal mengambil anime: ', error)
    } 
  }, [])

  const fetchTopAiring = useCallback(async() => {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/anime?limit=5&filter=airing`
      )
      const { data } = await response.json()
      setTopAiring(data)
    } catch (error) {
      console.error('gagal mengambil anime: ', error)
    }
  },[])

  useEffect(() => {
    fetchTrending()
    fetchTopAiring()
  },[])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (searchQuery.trim() !== '') {
      router.push(`/anime?q=${searchQuery}`)
    }
  }

  const topPick = topAiring[0]
  const runnerPick = topAiring.slice(1, 5)

  return (
    <main>
      {/* section 1 */}
      <section className="flex flex-col justify-center items-center min-h-screen w-full gap-12">
        <div  className="flex flex-col justify-center items-center m-4 gap-2">
          <h1 className="text-4xl font-semibold">THE ARCHIVE AWAITS</h1>
          <p  className="text-xl text-gray-400">Search the definitive database of anime.</p>
        </div>

        <form 
          className="flex border-b-3 gap-4 pb-2 relative"
          onSubmit={handleSearch}
        >
          <div className="flex items-center pointer-events-none">
            <Search strokeWidth={2} className="w-6 h-6 text-black group-focus-within:text-black transition-colors" />
          </div>
          <input
            type="text" 
            placeholder="Search an anime" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-2xl outline-0 text-2xl"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="absolute flex items-center right-0 top-1">
              <X className="w-6 h-6 text-gray-400 hover:text-black transition-colors" />
            </button>
          )}
        </form>
        <div className="w-[95%] border border-gray-200 bottom-10 absolute"></div>
      </section>
      <section className="min-h-screen px-28 mt-18">
        <div className="flex flex-row justify-between mb-4">
          <h1 className="font-semibold">TRENDING NOW</h1>
        </div>
        <hr className="text-gray-300" />
        <div className="py-18 h-full w-full justify-center items-center">
          <div className="h-full w-full justify-center items-center">
            <div className="h-full w-full flex gap-8 justify-center items-center">
              {topList.map((anime: any) => (
                <div
                  key={anime.mal_id}
                  className="relative flex flex-col aspect-3/5 gap-6 w-72 h-160"
                >
                  <div className="relative h-full w-full">
                    <div className="flex flex-col justify-between h-full">
                      <p className="m-4 px-2 py-1 bg-black text-white w-fit h-fit text-xs font-bold">{(anime.status).toUpperCase()}</p>
                      <p className="m-4 h-fit text-xs font-bold text-right"><span className="bg-white px-3 py-1">{(anime.score)}</span></p>
                    </div>
                    <Image 
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      fill
                      priority
                      sizes=""
                      className="object-cover absolute h-3/4 -z-10"
                    />
                  </div>
                  <div className="h-1/4">
                    <h1 className="font-semibold text-xl line-clamp-1">{(anime.title).toUpperCase()}</h1>
                    <p className="font-semibold text-gray-500 text-sm line-clamp-1">{(anime.studios[0].name).toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <hr className="text-gray-200 mx-10 mb-24"></hr>
      <section className="min-h-screen w-full px-28">
        <div className="flex flex-row justify-between mb-4">
          <h1 className="font-semibold">TOP AIRING ANIME</h1>
        </div>
        <hr className="text-gray-300" />
        <div className="w-full flex mt-8 gap-8 h-full">
          <div className="w-2/3 border border-gray-300 p-6">
            {topPick && (
              <div className="flex gap-8">
                <div className="relative flex flex-col aspect-4/5 gap-6 w-108 h-160">
                  <Image 
                    src={topPick.images.webp.large_image_url}
                    alt={topPick.title}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover absolute -z-10"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex flex-col max-w-md gap-4">
                    <div className="flex items-center">
                      <h1 className="font-semibold text-3xl mb-3">
                        {topPick.title.toUpperCase()}
                      </h1>
                      <p className="p-4 bg-black text-white font-semibold text-2xl">#1</p>
                    </div>
                    <p className="">
                      {topPick.genres.map((genre: any) => (
                        <span
                          key={genre.mal_id}
                          className="pr-4 text-xs font-bold text-gray-400 tracking-wider"
                        >
                          {genre.name.toUpperCase()}
                        </span>
                      ))}
                    </p>
                    <p className="text-gray-500 mb-4 line-clamp-4">
                      {topPick.synopsis}
                    </p>
                  </div>
                  <div className="flex flex-row gap-12 justify-between">
                    <p className="font-semibold tracking-wide">
                      SCORE: {topPick.score || 'N/A'}
                    </p>
                    <a href="" className="tracking-widest px-14 py-1 border-2 font-semibold text-black bg-white hover:bg-black hover:text-white">DETAIL</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-1/3 border-t border-gray-300 justify-between items-center">
            <div className="flex flex-col h-full">
              <h3 className="font-bold text-sm text-gray-500 py-4 border-b-2">
                RUNNER-UPS INDEX
              </h3>
              <div className="flex flex-col w-full h-full px-6 py-4 justify-between items-center">

                <div className="flex flex-col gap-4">
                  {runnerPick.map((anime: any, index: number) => (
                    <div 
                      key={anime.mal_id}
                      className="flex gap-4 border-b border-gray-300 pb-4"
                    >
                      <div className="font-bold text-gray-400 w-8">
                        #{index + 2}
                      </div>

                      <div>
                        <h1 className="font-semibold line-clamp-1">
                          {anime.title}
                        </h1>
                        <p className="text-sm text-gray-500">
                          Score: {anime.score || 'N/A'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a 
                className="flex flex-row gap-12 justify-center w-full items-center border-2 font-semibold tracking-widest py-6 hover text-black bg-white hover:bg-black hover:text-white" 
                href=""
              >
                SEE MORE
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
