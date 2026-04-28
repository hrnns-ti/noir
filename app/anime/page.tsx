'use client'

import { Suspense } from 'react'
import AnimeContent from './anime-content'

export default function AnimePage() {
  return (
    <Suspense fallback={
      <main className="p-4 flex justify-center items-center min-h-screen">
        <p className="animate-pulse">Loading search context...</p>
      </main>
    }>
      <AnimeContent />
    </Suspense>
  )
}