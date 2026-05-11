import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useCart } from '../hook/useCart';
import CartItem from '../components/CartItem';
import { toast } from 'react-toastify';
import Loading from '../../shared/Loading';
import { useRazorpay } from "react-razorpay";
import { useNavigate } from 'react-router-dom';


const Cart = () => {

  const { handleGetCart, handleRemoveItem, handleDecrementCartItemQuantity, handleIncrementCartItemQuantity, handleCreateCartOrder , handleVerifyCartOrder } = useCart();

  const cart = useSelector((state) => state.cart.userCart);
  const loading = useSelector((state) => state.cart.loading);
  const user = useSelector((state) => state.auth.user);
  
  const navigate = useNavigate()

  const { error, isLoading, Razorpay } = useRazorpay();



  useEffect(() => {
    const fetchCart = async () => {
      await handleGetCart();
    }
    fetchCart();
  }, []);



  const increaseQuantity = async (itemId) => {
    const res = await handleIncrementCartItemQuantity(itemId)
    if (res.success) {
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }
  }


  const decreaseQuantity = async (itemId) => {
    const res = await handleDecrementCartItemQuantity(itemId)
    if (res.success) {
      toast.success(res.message)
    }
    else {
      toast.error(res.message)
    }
  }



  const calculateSubtotal = (items = []) => {
    return items.reduce((total, item) => {
      return total + (
        item.variant.price.amount * item.quantity
      )
    }, 0)
  }


  const subtotal = calculateSubtotal(cart?.items)


  const handleCheckoutOrder = async () => {
    const data = await handleCreateCartOrder();
    

    if (data.success) {
      toast.success(data.message)

      const options = {
        key: 'rzp_test_ShNSkpxt3emQVJ',
        amount: data.paymentOrder.amount,
        currency: data.paymentOrder.currency,
        name: "Test Company",
        description: "Test Transaction",
        order_id: data.paymentOrder.id,
        handler: async (response) => {
            
            const isValid = await handleVerifyCartOrder(response)

            if(isValid){
              navigate(`/order-success?order_id=${response?.razorpay_order_id}`)
            }



          alert("Payment Successful!");
        },
        prefill: {
          name: user?.fullname,
          email: user?.email,
          contact: user?.contact,
        },
        theme: {
          color: "#F37254",
        },
      };
      
        


        const rzp = new Razorpay(options);
        rzp.open();
        console.log(options)

    }
    else {
      toast.error("unable to create order this time")
    }
  }




  if (loading) {
    return (
      <Loading />
    )
  }



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

        {!cart || cart?.items?.length === 0 ? (
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

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

            {/*  LEFT: Item List  */}
            <section className="flex flex-col gap-10" aria-label="Cart items">
              {cart?.items?.map((item) => (
                <CartItem
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
                    Subtotal
                    ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})
                  </span>
                  <span className="text-sm font-medium font-[Inter] text-[#1b1c1a]">
                    ₹{(subtotal).toLocaleString('en-IN')}
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
                  ₹{(subtotal).toLocaleString('en-IN')}
                </span>
              </div>


              <button
                onClick={handleCheckoutOrder}
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
