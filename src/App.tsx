import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import About from './pages/About.tsx'
import { ArticleDetail, Articles } from './pages/Articles.tsx'
import Contact from './pages/Contact.tsx'
import Gallery from './pages/Gallery.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import PackageDetail from './pages/PackageDetail.tsx'
import Packages from './pages/Packages.tsx'
import Privacy from './pages/Privacy.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/paket-umrah', element: <Packages /> },
      { path: '/paket-umrah/:slug', element: <PackageDetail /> },
      { path: '/tentang-kami', element: <About /> },
      { path: '/galeri', element: <Gallery /> },
      { path: '/artikel', element: <Articles /> },
      { path: '/artikel/:slug', element: <ArticleDetail /> },
      { path: '/kontak', element: <Contact /> },
      { path: '/kebijakan-privasi', element: <Privacy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  // The CMS is a static page in public/admin/; send /admin and /admin/ there instead of the SPA 404.
  { path: '/admin', loader: () => { window.location.replace('/admin/index.html'); return null } },
])

export default function App() {
  return <RouterProvider router={router} />
}
