import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Heart, Leaf, Award, Users } from 'lucide-react';
import { SEO, LocalBusinessSchema } from '../components/SEO';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      <SEO
        title="About Us - 100% Organic Handmade Cosmetics"
        description="Learn about Rima Cosmetics, a Chennai-based organic cosmetics brand by Mounica MK. We craft 100% organic handmade beauty products with natural ingredients. Chemical-free, vegan, cruelty-free."
        keywords="about Rima Cosmetics, Mounica MK, Chennai organic cosmetics, handmade beauty products, organic cosmetics Chennai, natural beauty brand Tamil Nadu"
        url="https://rimacosmetics.vercel.app/about"
      />
      <LocalBusinessSchema />
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584013544027-acfe4d8ca478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="About Us"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="mb-4 text-white drop-shadow-lg">About Rima Cosmetics</h1>
            <p className="text-white drop-shadow-md text-lg max-w-2xl">
              Your trusted source for 100% organic, handmade cosmetic products
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Rima Cosmetics was founded with a simple belief: beauty products should be as pure 
                as nature intended. Our founder, Mounica MK, started this journey with a passion 
                for creating safe, effective, and completely organic cosmetic products.
              </p>
              <p className="text-gray-700 mb-4">
                Every product we create is handmade with love and care, using only the finest 
                natural ingredients. We believe in transparency, quality, and the power of nature 
                to enhance your natural beauty.
              </p>
              <p className="text-gray-700">
                From our small workshop in Chennai, we craft each product in small batches to 
                ensure the highest quality and freshness for our customers.
              </p>
            </div>
            <div className="relative h-96">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1651740896477-467ea46b4fe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
                alt="Natural Products"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Rima Cosmetics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mb-2">Handmade with Love</h3>
              <p className="text-gray-600">
                Each product is carefully crafted by hand in small batches
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="mb-2">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality and test every batch thoroughly
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-lime-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-lime-600" />
              </div>
              <h3 className="mb-2">Customer Care</h3>
              <p className="text-gray-600">
                Your satisfaction and wellness is our top priority
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Meet the Founder</h2>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-4xl">M</span>
              </div>
            </div>
            <h3 className="mb-2">Mounica MK</h3>
            <p className="text-green-600 mb-4">Founder & Chief Formulator</p>
            <p className="text-gray-700">
              Mounica started Rima Cosmetics with a vision to bring the goodness of natural, 
              organic ingredients to everyday beauty routines. With years of research and 
              experimentation, she has perfected formulas that are both effective and completely safe.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Rima Cosmetics?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="mb-3">No Harmful Chemicals</h3>
              <p className="text-gray-700">
                All our products are free from SLS, parabens, sulfates, and other harmful chemicals. 
                We use only natural preservatives and ingredients.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="mb-3">Suitable for All Skin Types</h3>
              <p className="text-gray-700">
                Our products are gentle and suitable for all skin types, including sensitive skin. 
                We test each product to ensure safety and efficacy.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="mb-3">Affordable Pricing</h3>
              <p className="text-gray-700">
                We believe everyone deserves access to quality organic products. Our prices are 
                kept affordable without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}