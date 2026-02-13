import { MetadataRoute } from 'next'
import { CONVERTER_SLUGS } from '@/lib/seo-config'

export const revalidate = 86400

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
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog/categories/apa-style`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog/apa-7-title-case-guide`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
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
