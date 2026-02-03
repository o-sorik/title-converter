import { MetadataRoute } from 'next'
import { CONVERTER_SLUGS } from '@/lib/seo-config'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://titlecaseconverter.online'

    // Static pages
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]

    // Dynamic pages from SEO config
    const converterRoutes: MetadataRoute.Sitemap = CONVERTER_SLUGS.map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    return [...routes, ...converterRoutes]
}
