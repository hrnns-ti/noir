import NavbarAnime from '../components/navbar'

export default function AnimeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen">
      {/* Navbar ini eksklusif hanya untuk rute /anime dan turunannya */}
      <NavbarAnime/>
      
      {/* Konten dari anime/page.tsx atau anime/[id]/page.tsx akan masuk ke sini */}
      <div className="w-full">
        {children}
      </div>
    </section>
  )
}