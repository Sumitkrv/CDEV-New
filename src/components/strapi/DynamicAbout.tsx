import { useEffect, useState } from 'react'
import axios from 'axios'

// TypeScript interfaces for type safety
interface QuoteBlock {
  __component: 'shared.quote'
  id: number
  title?: string
  body: string
}

interface RichTextBlock {
  __component: 'shared.rich-text'
  id: number
  body: string
}

interface MediaBlock {
  __component: 'shared.media'
  id: number
  file?: {
    url: string
    alternativeText?: string
    name: string
  }
}

type Block = QuoteBlock | RichTextBlock | MediaBlock

interface AboutData {
  id: number
  title: string
  blocks: Block[]
}

interface AboutResponse {
  data: {
    id: number
    attributes: AboutData
  }
}

const DynamicAbout = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const STRAPI_URL = 'http://localhost:1337'

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          `${STRAPI_URL}/api/about?populate=*`
        )
        
        console.log('Full API Response:', response.data)
        
        // Strapi v5 structure: response.data.data (no .attributes)
        const data = response.data.data
        console.log('About Data:', data)
        
        setAboutData(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching about data:', err)
        setError('Failed to load content. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAboutData()
  }, [])

  // Render individual block based on its component type
  const renderBlock = (block: Block) => {
    switch (block.__component) {
      case 'shared.quote':
        return (
          <blockquote 
            key={block.id} 
            className="my-8 p-6 bg-gray-50 border-l-4 border-emerald-500 rounded-r-lg"
          >
            <p className="text-xl italic text-gray-700 mb-2">
              "{block.body}"
            </p>
            {block.title && (
              <footer className="text-sm text-gray-600">
                — {block.title}
              </footer>
            )}
          </blockquote>
        )

      case 'shared.rich-text':
        return (
          <div 
            key={block.id}
            className="prose prose-lg max-w-none my-6"
            dangerouslySetInnerHTML={{ __html: block.body }}
          />
        )

      case 'shared.media':
        if (!block.file) {
          return null
        }
        
        const imageUrl = block.file.url.startsWith('http')
          ? block.file.url
          : `${STRAPI_URL}${block.file.url}`
        
        return (
          <figure key={block.id} className="my-8">
            <img
              src={imageUrl}
              alt={block.file.alternativeText || block.file.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            {block.file.alternativeText && (
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {block.file.alternativeText}
              </figcaption>
            )}
          </figure>
        )

      default:
        // Handle unknown block types gracefully
        console.warn('Unknown block type:', (block as any).__component)
        return null
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  // No data state
  if (!aboutData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">No content available.</p>
      </div>
    )
  }

  // Main render
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
        {aboutData.title}
      </h1>

      {/* Dynamic Blocks */}
      <div className="space-y-6">
        {aboutData.blocks && aboutData.blocks.length > 0 ? (
          aboutData.blocks.map((block) => renderBlock(block))
        ) : (
          <p className="text-center text-gray-500">No content blocks available.</p>
        )}
      </div>
    </div>
  )
}

export default DynamicAbout
