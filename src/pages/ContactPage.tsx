import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { SEO, LocalBusinessSchema } from '../components/SEO';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend
    toast.success('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Contact Us - Rima Cosmetics Chennai"
        description="Contact Rima Cosmetics in Chennai. Get in touch for organic cosmetic products. Phone: +91 8939996640. Location: Siruseri, Chennai, Tamil Nadu. WhatsApp ordering available."
        keywords="contact Rima Cosmetics, Chennai organic cosmetics contact, buy organic products Chennai, WhatsApp order cosmetics, Siruseri cosmetics shop"
        url="https://rimacosmetics.vercel.app/contact"
      />
      <LocalBusinessSchema />
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 text-gray-900">Contact Us</h1>
          <p className="text-gray-700">
            We'd love to hear from you. Get in touch with us!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Phone className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="mb-1">Phone</h3>
                    <p className="text-gray-700">8939996640</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <Mail className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="mb-1">Email</h3>
                    <p className="text-gray-700">rimacosmetics@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="mb-1">Address</h3>
                    <p className="text-gray-700">
                      A block G-3, Tejas Lakeview apartment,<br />
                      Manthopo Salai, Siruseri,<br />
                      Chennai, Tamil Nadu
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="mb-1">Business Hours</h3>
                    <p className="text-gray-700">
                      Monday - Saturday: 9:00 AM - 7:00 PM<br />
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <h3 className="mb-3">Quick Support</h3>
                <p className="text-gray-700 mb-4">
                  Need immediate assistance? Click the WhatsApp button at the bottom right 
                  to chat with us directly!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}