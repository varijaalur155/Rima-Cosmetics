import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-28">
          <Link to="/" className="flex items-center space-x-3">
            <Logo className="w-24 h-24" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">Rima Cosmetics</span>
              <span className="text-xs text-green-600">100% Organic</span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              } transition-colors`}
            >
              About Us
            </Link>
            <Link
              to="/products"
              className={`${
                isActive('/products') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              } transition-colors`}
            >
              Products
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
              } transition-colors`}
            >
              Contact
            </Link>
            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                className={`${
                  isActive('/admin') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                } transition-colors`}
              >
                Admin
              </Link>
            )}
            {user && user.role === 'customer' && (
              <Link
                to="/orders"
                className={`${
                  isActive('/orders') ? 'text-green-600' : 'text-gray-700 hover:text-green-600'
                } transition-colors`}
              >
                My Orders
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition-colors" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-700">{user.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through the site or manage your account
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/"
                    onClick={handleLinkClick}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      isActive('/') 
                        ? 'bg-green-50 text-green-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={handleLinkClick}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      isActive('/about') 
                        ? 'bg-green-50 text-green-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/products"
                    onClick={handleLinkClick}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      isActive('/products') 
                        ? 'bg-green-50 text-green-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Products
                  </Link>
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      isActive('/contact') 
                        ? 'bg-green-50 text-green-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Contact
                  </Link>
                  {user && user.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={handleLinkClick}
                      className={`py-3 px-4 rounded-lg transition-colors ${
                        isActive('/admin') 
                          ? 'bg-green-50 text-green-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Admin
                    </Link>
                  )}
                  {user && user.role === 'customer' && (
                    <Link
                      to="/orders"
                      onClick={handleLinkClick}
                      className={`py-3 px-4 rounded-lg transition-colors ${
                        isActive('/orders') 
                          ? 'bg-green-50 text-green-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      My Orders
                    </Link>
                  )}
                  
                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <>
                        <div className="py-3 px-4 text-gray-700">
                          Logged in as: <strong>{user.name}</strong>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            logout();
                            handleLinkClick();
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link to="/login" onClick={handleLinkClick}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}