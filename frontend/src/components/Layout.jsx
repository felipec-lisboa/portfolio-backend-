import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import SkipLink from './SkipLink'

export default function Layout() {
  return (
    <div className="min-h-screen">
      <SkipLink />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(99,102,241,0.18),transparent_60%)] dark:bg-[radial-gradient(80%_60%_at_50%_0%,rgba(34,211,238,0.10),transparent_60%)]" />
      <Navbar />
      <main id="conteudo" tabIndex={-1} className="py-10 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

