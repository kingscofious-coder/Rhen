'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus, Trash2, Heart, ShoppingBag, Star, X } from 'lucide-react';
import { ProductFormModal } from './ProductFormModal';
import CheckoutModal from './CheckoutModal';
import { BottomNav } from '@/app/dashboard/BottomNav';

type Product = {
  id: string;
  name: string;
  price: string;
  salePrice?: string;
  images: string[];
  stock: number;
  createdAt?: string;
  description: string;
  reviews?: { rating: number }[];
};

export default function DashboardClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [saveCard, setSaveCard] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const demo: Product[] = [
        { id: 'p1', name: 'Classic Tote', price: '12000', salePrice: '9000', images: [], stock: 12, createdAt: new Date().toISOString(), description: 'A minimal tote for everyday use', reviews: [{ rating: 5 }] },
        { id: 'p2', name: 'Urban Sneakers', price: '25000', images: [], stock: 0, createdAt: new Date().toISOString(), description: 'Comfortable city sneakers', reviews: [] },
      ];
      setProducts(demo);
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => products.filter(p => p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())), [products, searchQuery]);

  const isNewArrival = (createdAt?: string) => {
    if (!createdAt) return false;
    return (Date.now() - new Date(createdAt).getTime()) < 1000 * 60 * 60 * 24 * 14; // 14 days
  };

  const handleDeleteClick = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const openCheckoutWithProduct = (product: Product) => {
    setCheckoutProduct(product);
    setQuantity(1);
    setIsCheckoutOpen(true);
  };

  const toggleWishlist = (_e: React.MouseEvent, id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    // For now, simulate an update/insert. Replace with real refetch after integrating backend.
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, name: p.name + ' (updated)' } : p));
      setEditingProduct(undefined);
    } else {
      const newProduct: Product = { id: `p${Date.now()}`, name: 'New Product', price: '1000', images: [], stock: 10, createdAt: new Date().toISOString(), description: 'New product added' };
      setProducts(prev => [newProduct, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Store Dashboard</h1>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200"
            />
            <button onClick={() => { setEditingProduct(undefined); setIsModalOpen(true); }} className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white">Add Product</button>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4`}> 
          {isLoading && [...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm animate-pulse" />
          ))}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">No products found</div>
          )}

          {!isLoading && filteredProducts.map((product) => (
            <motion.div key={product.id} className="bg-white rounded-2xl p-3 shadow-sm flex flex-col gap-3 group cursor-pointer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setQuickViewProduct(product)}>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                {product.images && product.images.length > 0 ? (
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
                {product.stock === 0 && <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-sm font-bold">SOLD OUT</div>}
                {isNewArrival(product.createdAt) && <div className="absolute top-3 left-3 bg-[var(--primary)] text-white px-2 py-1 text-xs rounded-full">NEW</div>}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                <p className="text-green-600 font-bold">₦{Number(product.salePrice && Number(product.salePrice) > 0 ? product.salePrice : product.price).toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); handleEditClick(product); }} className="text-sm text-gray-600">Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(product.id); }} className="text-sm text-red-500">Delete</button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); toggleWishlist(e, product.id); }} className={`p-2 rounded-md ${wishlist.includes(product.id) ? 'text-[var(--primary)]' : 'text-gray-400'}`}>
                    <Heart className="w-4 h-4" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); openCheckoutWithProduct(product); }} className="p-2 rounded-md bg-[var(--primary-20)] text-[var(--primary)]">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setQuickViewProduct(null)} className="absolute inset-0 bg-black/60" />
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6 relative z-10 shadow-2xl flex flex-col md:flex-row gap-4">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100"><X className="w-5 h-5" /></button>
            <div className="md:w-1/2 bg-gray-100 rounded-lg overflow-hidden h-64 flex items-center justify-center">
              {quickViewProduct.images && quickViewProduct.images.length > 0 ? (
                <Image src={quickViewProduct.images[0]} alt={quickViewProduct.name} width={800} height={600} className="object-cover" />
              ) : (
                <div className="text-gray-400">No Image</div>
              )}
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold mb-2">{quickViewProduct.name}</h3>
              <p className="text-green-600 font-bold mb-3">₦{Number(quickViewProduct.salePrice && Number(quickViewProduct.salePrice) > 0 ? quickViewProduct.salePrice : quickViewProduct.price).toLocaleString()}</p>
              <p className="text-sm text-gray-600 mb-4">{quickViewProduct.description || 'No description available.'}</p>

              <div className="flex items-center gap-3 mb-4">
                <button onClick={() => { openCheckoutWithProduct(quickViewProduct); setQuickViewProduct(null); }} className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg">Buy / Checkout</button>
                <button onClick={() => { setIsModalOpen(true); setEditingProduct(quickViewProduct); setQuickViewProduct(null); }} className="px-4 py-2 bg-gray-100 rounded-lg">Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingProduct(undefined); }}
        onSuccess={handleFormSuccess}
        productToEdit={editingProduct}
        user={null}
        categories={[]}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => { setIsCheckoutOpen(false); setCheckoutProduct(null); }}
        product={checkoutProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        cardDetails={cardDetails}
        setCardDetails={setCardDetails}
        saveCard={saveCard}
        setSaveCard={setSaveCard}
        onBuyNow={(e) => e.preventDefault()}
        onPayOnDelivery={async () => {}}
        isProcessingPayment={false}
        templateColors={{ primary: '#000000', secondary: '#ffffff', accent: '#000000', background: '#ffffff' }}
      />

      <BottomNav />
    </div>
  );
}