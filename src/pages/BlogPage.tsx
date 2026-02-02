import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getAllBlogPosts, getAllCategories } from '../data/blog-posts';
import { getBlogImageUrl, getBlogListingImageUrl } from '../utils/blog-images';
import { Calendar, Clock, Search, Tag } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const blogPosts = getAllBlogPosts();
  const categories = ['all', ...getAllCategories()];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO
        title="Beauty & Skincare Blog | Natural Remedies & Tips - Rima Cosmetics"
        description="Expert beauty advice, natural skincare tips, home remedies, and organic product guides. Learn about skin care, hair care, and natural beauty solutions from Rima Cosmetics."
        keywords="beauty blog, skincare tips, natural remedies, organic cosmetics blog, home remedies for skin, hair care tips"
      />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Natural Beauty & Skincare Blog
            </h1>
            <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto">
              Expert advice, natural remedies, and organic beauty tips for healthy, glowing skin
            </p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mt-6">
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-green-50">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    {category === 'all' ? 'All Posts' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 text-lg">No blog posts found matching your search.</p>
                <p className="text-gray-400 mt-2">Try different keywords or browse all categories.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const imageUrl = getBlogListingImageUrl(getBlogImageUrl(post.slug));
                
                return (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <Card className="h-full hover:shadow-xl transition-shadow duration-300 group overflow-hidden">
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={imageUrl}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                          {post.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-green-600 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {post.excerpt}
                        </CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {post.keywords.slice(0, 3).map((keyword, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Beauty Tips Delivered to Your Inbox
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter for exclusive natural beauty tips, DIY recipes, and special offers on organic products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1"
                />
                <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}