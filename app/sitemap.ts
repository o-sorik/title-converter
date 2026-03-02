import { MetadataRoute } from 'next'
import { CONVERTER_SLUGS } from '@/lib/seo-config'
import { blogArticles, blogCategories } from '@/components/blog/data'
import { SITE_URL } from '@/lib/constants'

export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL

    // Static pages
    const routes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/batch-checker`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/capitalization-rules-guide`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
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
    ]

    // Dynamic pages from SEO config
    const converterRoutes: MetadataRoute.Sitemap = CONVERTER_SLUGS.map((slug) => ({
        url: `${baseUrl}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    const blogCategoryRoutes: MetadataRoute.Sitemap = blogCategories.map((category) => ({
        url: `${baseUrl}/blog/categories/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    const blogArticleRoutes: MetadataRoute.Sitemap = blogArticles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
    }))

    return [...routes, ...converterRoutes, ...blogCategoryRoutes, ...blogArticleRoutes]
}
