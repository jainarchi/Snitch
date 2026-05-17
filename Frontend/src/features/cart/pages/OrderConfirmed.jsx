import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useOrder } from '../../order/hook/useOrder'
import { toast } from 'react-toastify'
import Loading from '../../shared/Loading'

const OrderConfirmed = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const order_id = queryParams.get('order_id')

  const { handleGetOrderConfirmed } = useOrder()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfirmedOrder = async () => {
      try {
        setLoading(true)
        if (!order_id) return
        
        const res = await handleGetOrderConfirmed(order_id)
        if (!res.success) {
          toast.error(res.message)
          return
        }
        setOrder(res.order)
      } catch (err) {
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchConfirmedOrder()
  }, [order_id])

  if (loading) {
    return <Loading />
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center font-[family-name:var(--font-sans)]">
        <div className="text-center">
          <p className="font-[family-name:var(--font-serif)] text-2xl italic text-[#4d463a] mb-4">Order not found.</p>
          <Link to="/" className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E] underline underline-offset-8">
            Return to Store
          </Link>
        </div>
      </div>
    )
  }

  const { deliveryAddress, price, createdAt, status } = order

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-[family-name:var(--font-sans)] selection:bg-[#C9A96E]/30">
      <main className="max-w-[800px] mx-auto px-6 pt-10 pb-24">
        <div className="flex flex-col items-center text-center animate-[wishlistFadeIn_0.8s_ease-out_forwards]">
          
          {/* Success Checkmark */}
          <div className="mb-12 relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-[0.5px] border-[#d0c5b5] flex items-center justify-center rounded-full">
               <svg 
                className="w-8 h-8 text-[#C9A96E]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7" 
                  className="animate-[shimmer_2s_infinite]"
                />
              </svg>
            </div>
            <div className="absolute -inset-4 border-[0.5px] border-[#d0c5b5]/30 rounded-full animate-pulse" />
          </div>

          {/* Headline */}
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-medium mb-6">
            Thank you for your purchase
          </p>
          <h1 className="font-[family-name:var(--font-serif)] font-light text-[clamp(48px,8vw,64px)] leading-[0.9] mb-10">
            Order Confirmed
          </h1>

          {/* Minimal Summary Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16 text-left mb-10 border-t border-[#d0c5b5]/30 pt-10">
            
            {/* Order Details */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#7A6E63] mb-2">Order Reference</p>
                <p className="text-sm font-medium tracking-wide">#{order?._id?.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#7A6E63] mb-2">Transaction Date</p>
                <p className="text-sm">
                  {new Date(createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#7A6E63] mb-2">Status</p>
                <span className="text-[10px] tracking-[0.1em] uppercase px-3 py-1 bg-[#adfab1b8] text-[#4d463a]">
                  {status}
                </span>
              </div>
            </div>

            {/* Shipping & Payment */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#7A6E63] mb-2">Shipping Destination</p>
                <div className="text-sm leading-relaxed">
                  <p className="font-medium mb-1">{deliveryAddress?.label}</p>
                  <p>{deliveryAddress?.addressLine}</p>
                  <p>{deliveryAddress?.city}, {deliveryAddress?.state} — {deliveryAddress?.pincode}</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#7A6E63] mb-2">Total Amount</p>
                <p className="text-xl font-light ">
                  {price?.currency === 'INR' ? '₹' : price?.currency}
                  {price?.amount?.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#d0c5b5]/30 mb-10" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center justify-center">
            <Link
              to="/"
              className="bg-[#1b1c1a] text-[#fbf9f6] py-4 px-12 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="text-[10px] tracking-[0.2em] uppercase text-[#7A6E63] underline underline-offset-8 decoration-[#d0c5b5] transition-all duration-300 hover:text-[#C9A96E] hover:decoration-[#C9A96E]"
            >
              View Order History
            </Link>
          </div>

          {/* <p className="mt-20 text-[10px] text-[#B5ADA3] italic font-light tracking-wide max-w-sm">
            A confirmation email with your order details and tracking information has been sent to your registered address.
          </p> */}

        </div>
      </main>
    </div>
  )
}

export default OrderConfirmed

