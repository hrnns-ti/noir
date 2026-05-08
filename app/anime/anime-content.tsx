'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'


export default function AnimeContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const [animeList, setAnimeList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchAnime = useCallback(async (pageNum: number) => {
    if (!query) return;
    
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?limit=12&q=${query}&order_by=popularity&page=${pageNum}`
      )
      const { data, pagination } = await response.json()
      
      setAnimeList(data || [])
      if (pagination?.last_visible_page) {
        setTotalPages(pagination.last_visible_page)
      }

      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (error) {
      console.error('gagal mengambil anime: ', error)
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    setAnimeList([])
    setPage(1)
    setTotalPages(1)
    fetchAnime(1)
  }, [query, fetchAnime])

  useEffect(() => {
    if (page > 1) {
      fetchAnime(page)
    }
  }, [page, fetchAnime])


  return (
    <main className="px-4">
      <div className='h-16'></div>
      <section className='w-full min-h-screen flex flex-col justify-center items-center gap-4 relative'>
        {/* <div className='top-0 absolute w-full h-auto text-2xl px-24 py-8 font-semibold border-y border-gray-300 rounded my-6'>
          <h1 className='flex gap-2'><span><Search strokeWidth={3} className='mt-1'/></span> Result for :  <span className='font-normal'>{query}</span></h1>
        </div> */}

        <div className='flex flex-row flex-wrap gap-4 justify-center mb-12'>
          {animeList.map((anime: any, index: number) => (
            <Link
              href={`/anime/${anime.mal_id}`}
              key={`${anime.mal_id}-${index}`} 
              className='w-80 flex border border-gray-300 h-60 rounded-xl shadow-md/0 hover:shadow-2xl hover:scale-[1.001] transition-all'
            >
              <div className='relative w-2/5 h-full'>
                <Image
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  fill
                  sizes='150px'
                  unoptimized
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
            </Link>
          ))}
        </div>

        {animeList.length > 0 && totalPages > 1 && (
          <div className="flex flex-row justify-center items-center gap-2 mb-12">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              Prev
            </button>

            {(() => {
              const maxVisiblePages = 5;
              let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
              let endPage = startPage + maxVisiblePages - 1;

              if (endPage > totalPages) {
                endPage = totalPages;
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              const pages = [];
              for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
              }

              return pages.map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 flex justify-center items-center rounded text-sm ${
                    page === pageNum
                      ? "bg-black text-white font-medium" 
                      : "border border-gray-300 hover:bg-gray-100 text-black"
                  }`}
                >
                  {pageNum}
                </button>
              ));
            })()}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}