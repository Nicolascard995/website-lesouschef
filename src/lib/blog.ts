// Blog backend — Neon-based.
// The blog UI is currently disabled in the landing (gated behind `{false && ...}`),
// so these functions degrade gracefully if the `posts` table doesn't exist yet.
// When the blog is re-enabled, run the migration in /scripts/blog-schema.sql.

import { getSql } from './db';

export interface BlogPost {
    id: string;
    slug: string;
    image: string;
    published: boolean;
    created_at: string;
    translation: {
        title: string;
        description: string;
        content?: string;
        tags: string[];
    } | null;
}

interface PostRow {
    id: string;
    slug: string;
    image: string;
    published: boolean;
    created_at: string;
    title: string;
    description: string;
    content?: string;
    tags: string[];
}

function shape(row: PostRow): BlogPost {
    return {
        id: row.id,
        slug: row.slug,
        image: row.image,
        published: row.published,
        created_at: row.created_at,
        translation: {
            title: row.title,
            description: row.description,
            content: row.content,
            tags: row.tags || [],
        },
    };
}

export async function getAllPosts(locale: string): Promise<BlogPost[]> {
    const sql = getSql();
    if (!sql) return [];

    try {
        const rows = await sql`
            SELECT p.id, p.slug, p.image, p.published, p.created_at,
                   t.title, t.description, t.tags
              FROM posts p
              JOIN post_translations t ON t.post_id = p.id
             WHERE p.published = true
               AND t.locale = ${locale}
             ORDER BY p.created_at DESC
        ` as unknown as PostRow[];
        return rows.map(shape);
    } catch (e) {
        console.error('[blog] getAllPosts failed:', e);
        return [];
    }
}

export async function getPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
    const sql = getSql();
    if (!sql) return null;

    try {
        const rows = await sql`
            SELECT p.id, p.slug, p.image, p.published, p.created_at,
                   t.title, t.description, t.content, t.tags
              FROM posts p
              JOIN post_translations t ON t.post_id = p.id
             WHERE p.slug = ${slug}
               AND p.published = true
               AND t.locale = ${locale}
             LIMIT 1
        ` as unknown as PostRow[];

        if (!rows.length) return null;
        return shape(rows[0]);
    } catch (e) {
        console.error('[blog] getPostBySlug failed:', e);
        return null;
    }
}
