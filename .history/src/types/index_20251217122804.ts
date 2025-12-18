export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'hair-care' | 'soap' | 'skin-care' | 'lip-care';
  description: string;
  image: string;
  inStock: boolean;
  volume?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod: 'google-pay' | 'phonepe' | 'whatsapp-pay';
  shippingAddress: ShippingAddress;
  customerEmail: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}