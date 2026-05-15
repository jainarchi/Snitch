import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useWishlist } from '../hook/useWishlist'
import { useCart } from '../../cart/hook/useCart.js'
import { toast } from 'react-toastify'
import WishlistCard from '../components/WishlistCard'


const Wishlist = () => {
  const {  handleGetWishlist, handleRemoveFromWishlist } = useWishlist()
  const { handleAddToCart } = useCart()
  const navigate = useNavigate()
  const wishlist = useSelector(state => state.wishlist.items)
  const loading = useSelector(state => state.wishlist.loading)


  useEffect(() => {
    handleGetWishlist()
  }, [])


  const onRemove = async (productId) => {
    const res = await handleRemoveFromWishlist(productId)
    if (res.success) {
      console.log('removed' , wishlist)

      toast.success(res.message || 'Removed from wishlist')
    } else {
      toast.error(res.message)
    }
  }


  const onAddToBag = async (product) => {
    
    const variantId = product?.variants?.[0]?._id
    if (!variantId) {
      toast.info('select a variant')
      navigate(`/products/${product._id}`)
      return
    }
    const res = await handleAddToCart(product._id, variantId, 1)
    if (res.success) {
      toast.success(res.message || 'Added to bag')
    } else {
      toast.error(res.message)
    }
  }

  const itemCount = wishlist?.length ?? 0


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a]
        font-[family-name:var(--font-sans)] selection:bg-[#C9A96E]/30">

        <main className="max-w-[1200px] mx-auto
          px-4 sm:px-8 lg:px-12 xl:px-16
          py-10 sm:py-14 lg:py-20">

          {/* ── Header ── */}
          <header className="mb-12 sm:mb-16 lg:mb-20
            animate-[wishlistFadeIn_0.8s_ease-out_forwards]">
            {/* Overline */}
            <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#C9A96E]
              font-[family-name:var(--font-sans)] font-medium mb-4 sm:mb-5">
              Member Exclusive
            </p>

            {/* Main title */}
            <h1
              className="font-[family-name:var(--font-serif)] font-light italic
                text-[clamp(40px,8vw,88px)] leading-[0.95] text-[#1b1c1a]
                mb-6 sm:mb-8"
            >
              Curated Favorites
            </h1>

            {/* Divider + subtitle */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-10 sm:w-14 h-px bg-[#d0c5b5]" />
              <p className="font-[family-name:var(--font-serif)] italic text-sm sm:text-base
                text-[#7A6E63] font-light tracking-[0.01em]">
                A digital archive of your personal selections.
              </p>
            </div>
          </header>

          {/* ── Loading State ── */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4 animate-pulse">
                  <div className="bg-[#eae8e5] w-full" style={{ aspectRatio: '4/5' }} />
                  <div className="space-y-2">
                    <div className="h-4 bg-[#eae8e5] w-3/4" />
                    <div className="h-3 bg-[#eae8e5] w-1/3" />
                  </div>
                  <div className="h-11 bg-[#eae8e5] w-full" />
                </div>
              ))}
            </div>
          )}

          {/* ── Empty State ── */}
          {!loading && itemCount === 0 && (
            <div className="flex flex-col items-center justify-center py-24 sm:py-32 gap-6
              animate-[wishlistFadeIn_0.6s_ease-out_forwards]">

              {/* Empty heart icon */}
              <div className="w-20 h-20 flex items-center justify-center
                bg-[#eae8e5] rounded-full mb-2">
                <svg className="w-8 h-8 text-[#B5ADA3]" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>

              <p className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl
                text-[#4d463a] italic font-light">
                Your wishlist is waiting.
              </p>
              <p className="text-[11px] tracking-[0.12em] text-[#B5ADA3] uppercase max-w-xs text-center">
                Start curating your personal collection of favorites.
              </p>

              <Link
                to="/"
                className="mt-4 py-3 px-8
                  bg-[#1b1c1a] text-[#fbf9f6]
                  text-[10px] tracking-[0.2em] uppercase
                  transition-all duration-300
                  hover:bg-[#C9A96E] hover:text-[#1b1c1a]"
              >
                Explore Collection
              </Link>
            </div>
          )}

          {/* ── Wishlist Grid ── */}
          {!loading && itemCount > 0 && (
            
            <>
            
              {/* Item count */}
              <div className="flex items-center justify-between mb-8 sm:mb-10
                animate-[wishlistFadeIn_0.6s_ease-out_0.2s_forwards] opacity-0">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#B5ADA3]
                  font-[family-name:var(--font-sans)]">
                  {itemCount} {itemCount === 1 ? 'Item' : 'Items'} Saved
                </p>
                <Link
                  to="/"
                  className="text-[10px] tracking-[0.15em] uppercase text-[#C9A96E]
                    font-[family-name:var(--font-sans)]
                    underline underline-offset-4
                    transition-colors duration-300 hover:text-[#1b1c1a]"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                gap-x-5 sm:gap-x-7 lg:gap-x-8
                gap-y-10 sm:gap-y-12 lg:gap-y-14">
                {wishlist.map((item, index) => (
                  <WishlistCard
                    key={item._id}
                    product={item.product}
                    index={index}
                    onRemove={onRemove}
                    onAddToBag={onAddToBag}
                  />
                ))}
              </div>
            </>
          )}

        </main>
      </div>
    </>
  )
}

export default Wishlist
