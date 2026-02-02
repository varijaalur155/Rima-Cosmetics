import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getBlogPostBySlug, getRecentBlogPosts } from '../data/blog-posts';
import { getBlogImageUrl, getBlogHeroImageUrl, getBlogThumbnailUrl } from '../utils/blog-images';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentBlogPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/blog')} className="bg-green-600 hover:bg-green-700">
              Back to Blog
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const heroImageUrl = getBlogHeroImageUrl(getBlogImageUrl(post.slug));

  return (
    <>
      <SEO
        title={`${post.title} | Rima Cosmetics Blog`}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        article={{
          publishedTime: post.publishDate,
          author: post.author,
          tags: post.keywords,
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Image */}
        <div className="relative h-96 bg-gradient-to-b from-gray-900 to-gray-700">
          <img
            src={heroImageUrl}
            alt={post.title}
            loading="eager"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {/* Breadcrumb */}
          <div className="absolute top-8 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              className="text-white hover:text-green-200 hover:bg-white/10"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Badge className="bg-green-600 text-white mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Share Button */}
          <div className="flex justify-end mb-8">
            <Button
              variant="outline"
              onClick={handleShare}
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {post.content.introduction}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Main Content Sections */}
          <div className="space-y-12">
            {post.content.sections.map((section, sectionIndex) => (
              <section key={sectionIndex} className="scroll-mt-24" id={`section-${sectionIndex}`}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {section.heading}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {section.content}
                </p>

                {section.subsections && (
                  <div className="space-y-8 ml-4 border-l-4 border-green-100 pl-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                          {subsection.heading}
                        </h3>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {subsection.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          <Separator className="my-12" />

          {/* Conclusion */}
          <div className="bg-green-50 rounded-lg p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {post.content.conclusion}
            </p>
          </div>

          {/* Keywords/Tags */}
          <div className="my-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Topics</h3>
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword, idx) => (
                <Badge key={idx} variant="secondary" className="text-sm">
                  <Tag className="h-3 w-3 mr-1" />
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 my-12">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Ready to Experience Organic Beauty?
              </h3>
              <p className="text-center text-gray-700 mb-6">
                Discover our range of 100% organic, handmade products at Rima Cosmetics
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Shop Products
                </Button>
                <Button
                  onClick={() => navigate('/contact')}
                  variant="outline"
                >
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts */}
        {recentPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentPosts.map((relatedPost) => {
                  const thumbnailUrl = getBlogThumbnailUrl(getBlogImageUrl(relatedPost.slug));
                  
                  return (
                    <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                      <Card className="h-full hover:shadow-xl transition-shadow duration-300 group">
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <img
                            src={thumbnailUrl}
                            alt={relatedPost.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader>
                          <Badge className="w-fit mb-2 bg-green-600 text-white">
                            {relatedPost.category}
                          </Badge>
                          <CardTitle className="text-lg group-hover:text-green-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="line-clamp-2">
                            {relatedPost.excerpt}
                          </CardDescription>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                            <Clock className="h-4 w-4" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}