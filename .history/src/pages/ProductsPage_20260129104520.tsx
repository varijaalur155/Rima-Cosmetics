import { useState } from 'react';
import { products } from '../data/products.ts';
import { Card, CardContent } from '../components/ui/card.tsx';
import { Button } from '../components/ui/button.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useCart } from '../contexts/CartContext.tsx';
import { ShoppingCart } from 'lucide-react';

import { toast } from 'sonner';
import { SEO } from '../components/SEO.tsx';

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Products - 100% Organic Handmade Cosmetics"
        description="Browse our complete range of 22 organic handmade cosmetic products. Hair care, skin care, natural soaps, and lip care. Chemical-free, vegan, cruelty-free. Order now!"
        keywords="organic products, handmade cosmetics products, natural hair oil, herbal shampoo, organic soap, natural skin care products, lip balm, face wash, body wash, Chennai organic products"
        url="https://rimacosmetics.vercel.app/products"
      />
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-gray-900">Our Products</h1>
          <p className="text-gray-700">
            Discover our range of 100% organic handmade cosmetic products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <p className="text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="w-64">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="hair-care">Hair Care</SelectItem>
                <SelectItem value="skin-care">Skin Care</SelectItem>
                <SelectItem value="soap">Soaps</SelectItem>
                <SelectItem value="lip-care">Lip Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="w-48 h-48 mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <picture>
                    <source srcSet={`${product.image.replace(/\.(png|jpg|jpeg)$/, '.webp')}`} type="image/webp" />
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </picture>
                </div>
                <h3 className="mb-2">{product.name}</h3>
                {product.volume && (
                  <p className="text-gray-600 mb-2">{product.volume}</p>
                )}
                <p className="text-gray-700 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600">₹{product.price}</span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-lg shadow-sm">
          <p className="font-semibold text-lg mb-2">Important Payment Information</p>
          <p className="text-md">
            After placing your order, please contact the business owner on WhatsApp at <a href="https://wa.me/+918076045877" target="_blank" rel="noopener noreferrer" className="text-yellow-900 underline font-medium">+918076045877</a> and send a screenshot of your payment for order confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}