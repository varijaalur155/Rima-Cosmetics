import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Leaf, Heart, Sparkles, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { SEO } from '../components/SEO';

export function HomePage() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Home - 100% Organic Handmade Cosmetics"
        description="Shop 100% organic handmade cosmetic products in Chennai. Natural hair care, skin care, soaps, and lip care. Chemical-free, vegan, cruelty-free. Free delivery. Order on WhatsApp Pay!"
        keywords="organic cosmetics Chennai, handmade cosmetics, natural beauty products, organic hair oil, herbal shampoo, natural soap, organic skin care, Tamil Nadu, eco-friendly cosmetics, vegan cosmetics, cruelty-free, chemical-free products"
        url="https://rimacosmetics.vercel.app/"
      />
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1722934797829-5c60280d05af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="Organic Cosmetics"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-white drop-shadow-lg">
              100% Organic Handmade Cosmetics
            </h1>
            <p className="mb-8 text-white drop-shadow-md text-lg">
              Discover the power of nature with our carefully crafted organic beauty products. 
              Each item is handmade with love and natural ingredients for your healthy, radiant skin.
            </p>
            <div className="flex space-x-4">
              <Link to="/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/90 hover:bg-white shadow-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2">100% Organic</h3>
              <p className="text-gray-600">All natural ingredients</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2">Handmade</h3>
              <p className="text-gray-600">Crafted with care</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="mb-2">Chemical Free</h3>
              <p className="text-gray-600">No harmful chemicals</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-lime-600" />
              </div>
              <h3 className="mb-2">Tested & Safe</h3>
              <p className="text-gray-600">Quality assured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Products</h2>
            <p className="text-gray-600">Explore our range of organic cosmetic products</p>
          </div>

          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                    <div className="w-48 h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="mb-2">{product.name}</h3>
                      {product.volume && (
                        <p className="text-gray-600 mb-2">{product.volume}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-green-600">₹{product.price}</span>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          className="bg-green-600 hover:bg-green-700">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="text-center mt-8">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Why Choose Rima Cosmetics?</h2>
              <p className="text-gray-700 mb-4">
                At Rima Cosmetics, we believe in the power of nature. Our products are carefully 
                handcrafted using 100% organic ingredients, ensuring that you get the best for your skin.
              </p>
              <p className="text-gray-700 mb-4">
                Every product is made with love and care by our founder Mounica MK, who is passionate 
                about creating safe, effective, and natural beauty solutions.
              </p>
              <Link to="/about">
                <Button variant="outline">Learn More About Us</Button>
              </Link>
            </div>
            <div className="relative h-96">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1634906345513-3fef37b28ae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Herbal Products"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}