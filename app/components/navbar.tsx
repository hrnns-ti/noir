'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Search, X } from "lucide-react"

export default function NavbarAnime() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (searchQuery.trim() !== '') {
      router.push(`/anime?q=${searchQuery}`)
    }
  }

  return (
    <div className="w-full h-16 flex items-center justify-evenly px-8 fixed z-80 bg-white border-b border-gray-300">
      <a href="/#" className="font-semibold">NOIR</a>
      <div className="flex gap-4 font-semibold">
        <a href="" className="opacity-30 hover:opacity-100 transition-all duration-300">HOME</a>
        <a href="" className="opacity-30 hover:opacity-100 transition-all duration-300">TRENDING</a>
        <a href="" className="opacity-30 hover:opacity-100 transition-all duration-300">UPCOMING</a>
      </div>
      <div className="flex">
        <form 
          className="flex border gap-4 px-3 py-1 relative justify-center rounded-xs"
          onSubmit={handleSearch}
        >
          <div className="flex items-center pointer-events-none">
            <Search strokeWidth={2} className="w-4 h-4 text-black group-focus-within:text-black transition-colors" />
          </div>
          <input
            type="text" 
            placeholder="Search an anime" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-0 text-md"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')} className="absolute flex items-center right-1 top-2">
              <X className="w-4 h-4 text-gray-400 hover:text-black transition-colors" />
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
