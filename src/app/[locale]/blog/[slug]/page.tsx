import { getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import ReadingProgress from "@/components/blog/ReadingProgress";

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
 const { locale, slug } = await params;
 const post = await getPostBySlug(slug, locale);

 if (!post || !post.translation) {
 notFound();
 }

 // Custom components for MDX with Enhanced Typography
 const components = {
 h1: (props: any) => <h1 className="text-3xl md:text-5xl font-black font-display mt-12 mb-6 text-white leading-tight" {...props} />,
 h2: (props: any) => <h2 className="text-2xl md:text-3xl font-bold font-display mt-12 mb-6 text-white leading-snug" {...props} />,
 h3: (props: any) => <h3 className="text-xl md:text-2xl font-bold font-display mt-8 mb-4 text-white/90" {...props} />,
 p: (props: any) => <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-light" {...props} />,
 ul: (props: any) => <ul className="list-disc list-outside ml-6 space-y-3 mb-8 text-white/80 text-lg" {...props} />,
 li: (props: any) => <li className="pl-2" {...props} />,
 strong: (props: any) => <strong className="text-white font-bold" {...props} />,
 a: (props: any) => <a className="text-ember underline decoration-cyan/30 underline-offset-4 hover:text-white hover:decoration-white transition-all" {...props} />,
 blockquote: (props: any) => <blockquote className="border-l-4 border-ember pl-8 py-4 my-10 font-serif italic text-2xl text-white/90 bg-white/5 rounded-r-xl" {...props} />,
 };

 return (
 <article className="min-h-screen bg-cream text-white pt-32 pb-32 px-6 relative">
 <ReadingProgress />

 <div className="max-w-3xl mx-auto">
 {/* Back Link */}
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/40 hover:text-ember mb-12 transition-colors group"
 >
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
 {locale === 'es' ? 'Volver al blog' : locale === 'de' ? 'Zurück zum Blog' : 'Back to blog'}
 </Link>

 {/* Header */}
 <header className="mb-16">
 <div className="flex gap-3 mb-8">
 {post.translation.tags?.map(tag => (
 <span key={tag} className="text-xs font-bold text-ink bg-ember uppercase tracking-widest px-3 py-1 rounded-full">
 {tag}
 </span>
 ))}
 </div>
 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display mb-8 leading-[1.1] tracking-tight">
 {post.translation.title}
 </h1>
 <div className="flex items-center gap-4 text-white/50 text-base font-light">
 <span className="flex items-center gap-2">
 <Calendar className="w-4 h-4" />
 {new Date(post.created_at).toLocaleDateString(locale, {
 year: 'numeric',
 month: 'long',
 day: 'numeric'
 })}
 </span>
 <span>•</span>
 <span>
 {/* Simple read time estimation: ~200 words per minute */}
 {Math.ceil((post.translation.content?.split(/\s+/).length || 0) / 200)} min read
 </span>
 </div>
 </header>

 {/* Cover Image */}
 {post.image && (
 <div className="aspect-video relative rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/10 group">
 <img
 src={post.image}
 alt={post.translation.title}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-cream/50 to-transparent pointer-events-none" />
 </div>
 )}

 {/* Content */}
 <div className="prose prose-invert prose-lg md:prose-xl max-w-none">
 <MDXRemote source={post.translation.content || ''} components={components} />
 </div>

 {/* Footer Section of Article */}
 <hr className="my-16 border-white/10" />

 <div className="flex justify-between items-center text-sm text-white/40 font-mono uppercase tracking-widest">
 <span>Dozo Technology</span>
 <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">
 More Articles
 </Link>
 </div>
 </div>
 </article>
 );
}
