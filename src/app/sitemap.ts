import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.ivsc-iverservices.com', lastModified: new Date() },
    { url: 'https://www.ivsc-iverservices.com/automobile', lastModified: new Date() },
    { url: 'https://www.ivsc-iverservices.com/assurances', lastModified: new Date() },
    { url: 'https://www.ivsc-iverservices.com/banque', lastModified: new Date() },
    { url: 'https://www.ivsc-iverservices.com/finance', lastModified: new Date() },
    { url: 'https://www.ivsc-iverservices.com/contact', lastModified: new Date() },
  ]
}