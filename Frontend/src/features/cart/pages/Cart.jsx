import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCart } from '../hook/useCart';
import ItemCart from '../components/ItemCart';
import { toast } from 'react-toastify';


const Cart = () => {
  const { handleGetCartItems, handleRemoveItem , handleDecrementCartItemQuantity , handleIncrementCartItemQuantity } = useCart();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    handleGetCartItems();
  }, []);
  

  const increaseQuantity = async (itemId) => {
     const res = await handleIncrementCartItemQuantity(itemId)
     if(! res.success){
      toast.error(res.message)
     }

  };

  const decreaseQuantity = async (itemId) => {
     const res = await handleDecrementCartItemQuantity(itemId)
     if(!res.success){
      toast.error(res.message)
     }
  };


  const totalItems = cartItems.reduce((sum, i) => sum + (i.quantity ?? 1), 0);
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + ((item.variant?.price?.amount ?? 0) * (item.quantity ?? 1)),
    0
  );

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a]">

      <main className="max-w-6xl mx-auto px-6 py-6">

        <header className="mb-14">
          <h1
            className="text-2xl sm:text-4xl font-semibold leading-tight text-[#1b1c1a] mb-2"
          >
            Your Shopping Bag
          </h1>
          <p className="text-sm font-[Inter] text-[#4d463a] tracking-wide">
            Review your items before checkout
          </p>
        </header>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <p
              className="text-3xl text-[#4d463a]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Your bag is empty.
            </p>
            <Link
              to="/"
              className="text-sm font-[Inter] tracking-widest uppercase text-[#745a27] underline-offset-4 underline
                         transition-opacity duration-300 hover:opacity-70"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /*  Two-column Layout  */
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

            {/*  LEFT: Item List  */}
            <section className="flex flex-col gap-10" aria-label="Cart items">
              {cartItems.map((item) => (
                <ItemCart
                  key={item._id}
                  item={item}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeItem={handleRemoveItem}
                />
              ))}
            </section>

            {/*  RIGHT: Order Summary  */}
            <aside
              className="bg-[#f5f3f0] p-4 sm:p-8 sticky top-28"
              aria-label="Order summary"
            >
              <h2
                className="text-xl font-semibold text-[#1b1c1a] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Order Summary
              </h2>

              {/* Summary Rows */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-[Inter] text-[#4d463a]">
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-sm font-medium font-[Inter] text-[#1b1c1a]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-[Inter] text-[#4d463a]">Shipping</span>
                  <span className="text-sm font-medium font-[Inter] text-[#745a27] tracking-wide uppercase">
                    Free
                  </span>
                </div>
              </div>

              {/* Tonal divider – background shift, not a line */}
              <div className="h-px bg-[#d0c5b5]/40 my-6" />

              {/* Total */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-base font-semibold font-[Inter] text-[#1b1c1a] tracking-wide uppercase text-xs">
                  Total
                </span>
                <span
                  className="text-2xl font-semibold text-[#1b1c1a]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>


              <button
                id="cart-checkout-btn"
                className="w-full bg-[#745a27] text-white py-4 px-8 text-sm font-[Inter] tracking-widest uppercase
                           transition-all duration-300 hover:bg-[#5a4312] focus:outline-none focus:ring-2 focus:ring-[#745a27]/50"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <div className="mt-5 text-center">
                <Link
                  to="/"
                  className="text-xs font-[Inter] tracking-widest uppercase text-[#4d463a]
                             underline-offset-4 transition-colors duration-300 hover:text-[#745a27] hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </aside>

          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
