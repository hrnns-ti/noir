'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'

export default function AnimeContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [animeList, setAnimeList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchAnime = useCallback(async (pageNum: number) => {
    if (!query) return;
    
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?limit=20&q=${query}&order_by=popularity&page=${pageNum}`
      )
      const { data, pagination } = await response.json()
      
      setAnimeList((prev) => (pageNum === 1 ? data : [...prev, ...data]))
      setHasMore(pagination.has_next_page)
    } catch (error) {
      console.error('gagal mengambil anime: ', error)
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    setAnimeList([])
    setPage(1)
    setHasMore(true)
    fetchAnime(1)
  }, [query, fetchAnime])

  useEffect(() => {
    if (page > 1) {
      fetchAnime(page)
    }
  }, [page, fetchAnime])

  const handleLoadMore = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <main className="p-4">
      <section className='w-full min-h-screen flex flex-col justify-center items-center gap-4'>
        <div className='flex flex-row flex-wrap gap-4 justify-center mb-12'>
          {animeList.map((anime: any, index: number) => (
            <div 
              key={`${anime.mal_id}-${index}`} 
              className='w-80 flex border border-gray-300 h-60 rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.001] transition-all'
            >
              <div className='relative w-2/5 h-full'>
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  fill
                  sizes='150px'
                  className='object-cover p-2 rounded-2xl'
                />
              </div>
              <div className='p-4 w-3/5 flex flex-col justify-between'>
                <h1 className='text-sm font-semibold line-clamp-2'>{anime.title}</h1>
                <p className='text-xs line-clamp-4 text-gray-600'>{anime.synopsis}</p>
                <div className='flex gap-2'>
                  <p className='text-xs px-3 py-1 rounded border border-gray-400 w-fit'>
                    {anime.episodes || '?'} EPS
                  </p>
                  <p className='text-xs px-3 py-1 rounded border border-gray-400 w-fit'>
                    {anime.type || '?'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && <p className="animate-pulse">Loading anime...</p>}

        {hasMore && !loading && animeList.length > 0 && (
          <button 
            className='px-8 py-2 bg-black rounded text-white hover:bg-gray-800 transition-colors'
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}
      </section>
    </main>
  )
}