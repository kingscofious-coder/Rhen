import { motion } from "framer-motion";
import { X, CreditCard, Package, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: string;
  salePrice?: string;
  description: string;
  images: string[];
  stock: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  cardDetails: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  };
  setCardDetails: (details: { number: string; expiry: string; cvc: string; name: string }) => void;
  saveCard: boolean;
  setSaveCard: (save: boolean) => void;
  onBuyNow: (e: React.FormEvent) => void;
  onPayOnDelivery: () => void;
  isProcessingPayment: boolean;
  templateColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  quantity,
  setQuantity,
  cardDetails,
  setCardDetails,
  saveCard,
  setSaveCard,
  onBuyNow,
  onPayOnDelivery,
  isProcessingPayment,
  templateColors
}: CheckoutModalProps) {
  if (!isOpen || !product) return null;

  const effectivePrice = (product.salePrice && Number(product.salePrice) > 0 && Number(product.salePrice) < Number(product.price))
    ? product.salePrice
    : product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 w-[95%] sm:w-full max-w-md relative shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Checkout</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-16 h-16 rounded-xl bg-white shrink-0 overflow-hidden relative">
            {product.images && product.images.length > 0 ? (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center"><ShoppingBag className="w-6 h-6 text-gray-400"/></div>
            )}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 line-clamp-1">{product.name}</h4>
            <div className="flex items-center gap-2">
              <p className="text-green-600 font-bold">
                ₦{Number(effectivePrice).toLocaleString()}
              </p>
              {quantity > 1 && (
                <span className="text-gray-500 text-sm font-medium">x {quantity}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 px-1">
          <span className="text-sm font-bold text-gray-700">Quantity</span>
          <div className="flex items-center gap-4 bg-gray-100 rounded-xl p-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-[var(--primary)] font-bold transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-gray-900 w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock || 100, quantity + 1))}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 hover:text-[var(--primary)] font-bold transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <form onSubmit={onBuyNow} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Card Information</label>
            <div className="relative">
              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                required
                type="text"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                placeholder="Card Number"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[var(--primary-20)] outline-none font-medium"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <input
              required
              type="text"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              placeholder="MM/YY"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[var(--primary-20)] outline-none font-medium"
            />
            <input
              required
              type="text"
              value={cardDetails.cvc}
              onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
              placeholder="CVC"
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[var(--primary-20)] outline-none font-medium"
            />
          </div>
          <input
            required
            type="text"
            value={cardDetails.name}
            onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
            placeholder="Cardholder Name"
            className="w-full px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[var(--primary-20)] outline-none font-medium"
          />

          <div className="flex items-center gap-2 px-1">
            <input
              type="checkbox"
              id="saveCard"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
            />
            <label htmlFor="saveCard" className="text-sm text-gray-600 cursor-pointer font-medium">Save card for future purchases</label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isProcessingPayment}
            className={`w-full bg-[var(--primary)] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[var(--primary-20)] hover:brightness-90 transition-all mt-4 flex items-center justify-center gap-2 ${isProcessingPayment ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isProcessingPayment ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              `Pay ₦${(Number(effectivePrice) * quantity).toLocaleString()}`
            )}
          </motion.button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-bold uppercase">Or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={onPayOnDelivery}
            disabled={isProcessingPayment}
            className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <Package className="w-5 h-5" />
            Pay on Delivery
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
