import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Preload critical images
    const preloadImages = () => {
      // Add your critical image paths here
      const images: string[] = [
        // '/images/hero-ev.jpg',
        // Add more critical images
      ]
      
      images.forEach((src) => {
        const img = new Image()
        img.src = src
      })
    }
    
    preloadImages()
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
