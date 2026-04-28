import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useProducts } from '../hook/useProducts'
import Navbar from '../../shared/Nabvar.jsx'
import Footer from '../../shared/Footer.jsx'
import Loading from '../../shared/Loading.jsx'
import BackButton from '../../shared/BackButton.jsx'

/* ─── Helpers ─── */
const formatPrice = (price) => {
  if (!price) return '—'
  const sym =
    price.currency === 'INR' ? '₹'
      : price.currency === 'USD' ? '$'
        : price.currency === 'EUR' ? '€'
          : price.currency === 'GBP' ? '£'
            : price.currency
  return `${sym}${Number(price.amount).toLocaleString('en-IN')}`
}

const formatDate = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}



/* ─── Action button ─── */
const ActionButton = ({ label, variant, onClick, disabled = false }) => {

  const isPrimary = variant === 'primary'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-5
        uppercase transition-all duration-300
        ${isPrimary
          ? 'bg-[#1b1c1a] text-[#fbf9f6] hover:bg-[#C9A96E] hover:text-[#1b1c1a]'
          : 'border border-[#1b1c1a] text-[#1b1c1a] hover:bg-[#1b1c1a] hover:text-[#fbf9f6]'
        }
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
    >
      {label}
    </button>
  )
}



/* ─── Thumbnail ─── */
const Thumbnail = React.memo(({ url, alt, isActive, onClick }) => {


  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full overflow-hidden bg-[#eae8e5] cursor-pointer"
      style={{
        aspectRatio: '1/1',
        outline: isActive
          ? '1.5px solid #C9A96E'
          : '1px solid transparent',
        outlineOffset: '2px',
      }}
      aria-label={alt}
    >
      <img
        src={url}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </button>
  )
})




const ProductDetails = () => {
  const { productId } = useParams()
  const { handleGetProductDetails } = useProducts()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeIdx, setActiveIdx] = useState(0)


  async function fetchProductDetails() {
    try {
      setLoading(true);
      const data = await handleGetProductDetails(productId);
      setProduct(data);
      setActiveIdx(0)
    }
    catch (err) {
      console.log(err);

    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [])



  const images = product?.images ?? []
  const total = images.length
  const activeImage = images[activeIdx]?.url ?? null



  const prev = useCallback(() => {
    setActiveIdx(i => (i - 1 + total) % total)
  }, [total])



  const next = useCallback(() => {
    setActiveIdx(i => (i + 1) % total)
  }, [total])








  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div className="bg-[#fbf9f6] text-[#1b1c1a] min-h-screen
                      font-[family-name:var(--font-sans)] selection:bg-[#C9A96E]/30">
        {/* Navbar with back-button in right slot */}
        <Navbar rightSlot={<BackButton />} />


        {loading && <Loading />}



        {/* ── Not found ── */}
        {!loading && !product && (
          <div className="flex flex-col items-center justify-center gap-4"
            style={{ minHeight: 'calc(100vh - 56px)' }}>
            <p className="text-xs tracking-[0.15em] uppercase text-[#B5ADA3]">
              Product not found.
            </p>
            <a href="/"
              className="text-[10px] tracking-[0.2em] uppercase text-[#C9A96E]
                          underline underline-offset-4 hover:text-[#1b1c1a]
                          transition-colors duration-300">
              Back to Home
            </a>
          </div>
        )}

        {/* ── Product content ── */}
        {!loading && product && (
          <main className="max-w-[1400px] mx-auto
                           px-4 sm:px-8 lg:px-12 xl:px-16
                           py-8 sm:py-12 lg:py-16 pb-16 sm:pb-20 lg:pb-24">
            {/*
              Layout:
              mobile   → single column (gallery then info)
              lg 1024+ → two columns [gallery | info] at ~58/42
            */}
            <div className="flex flex-col gap-10 lg:flex-row  ">

              {/* ══════════════════════════════
                  LEFT — Image Gallery
                  On desktop: thumbnail strip on
                  the LEFT, main image on the RIGHT
                  of the strip (flex-row).
                  On mobile: main image on top,
                  thumbnail strip below.
              ══════════════════════════════ */}
              <div className="w-full flex flex-col sm:flex-row gap-3 ">

                {/*  Thumbnail */}
                {total > 1 && (
                  <div
                    className="flex sm:flex-col gap-2 order-2 sm:order-1
                               sm:w-[72px] lg:w-[80px] flex-shrink-0"
                  >
                    {images.map((img, idx) => (
                      <div key={img._id ?? idx} className="w-14 sm:w-full">
                        {console.log(img)}
                        <Thumbnail
                          url={img.url}
                          alt={`${product.name} — view ${idx + 1}`}
                          isActive={activeIdx === idx}
                          onClick={() => setActiveIdx(idx)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/*  Main image (4:5) with prev/next arrows  */}
                <div
                  className=" group relative overflow-hidden bg-[#eae8e5] order-1 sm:order-2 flex-1 max-w-[26rem]"
                  style={{ aspectRatio: '4/5' }}
                >
                  {/* Image */}
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={product.name}
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#e4e2df] flex items-center justify-center">
                      <svg className="w-10 h-10 text-[#B5ADA3]" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="0" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}

                  {/* Prev / Next — visible on hover when >1 image */}
                  {total > 1 && (
                    <>
                      {/* Prev */}
                      <button
                        onClick={prev}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2
                   w-8 h-8 flex items-center justify-center
                   bg-[#fbf9f6]/80 backdrop-blur-sm
                   text-[#1b1c1a] border-none cursor-pointer
                   transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   pointer-events-none group-hover:pointer-events-auto
                   hover:bg-[#1b1c1a] hover:text-[#fbf9f6]"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>

                      {/* Next */}
                      <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2
                   w-8 h-8 flex items-center justify-center
                   bg-[#fbf9f6]/80 backdrop-blur-sm
                   text-[#1b1c1a] border-none cursor-pointer
                   transition-all duration-300
                   opacity-0 group-hover:opacity-100
                   pointer-events-none group-hover:pointer-events-auto
                   hover:bg-[#1b1c1a] hover:text-[#fbf9f6]"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Dot indicator */}
                      <div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2
                   flex gap-1.5 transition-opacity duration-300
                   opacity-40 group-hover:opacity-100"
                      >
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveIdx(idx)}
                            className="border-none cursor-pointer p-0 rounded-full transition-all duration-300"
                            style={{
                              width: activeIdx === idx ? '18px' : '6px',
                              height: '6px',
                              backgroundColor: activeIdx === idx ? '#C9A96E' : 'rgba(251,249,246,0.7)',
                            }}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>




              <div className="w-full lg:p-2  ">

                {/* Gold label */}
                <p className="text-[9px] tracking-[0.28em] uppercase text-[#C9A96E]
                              font-[family-name:var(--font-sans)] font-medium mb-3">
                  Product
                </p>

                {/* Product name */}
                <h1 className="font-[family-name:var(--font-serif)] font-light
                               leading-[1.08] text-[#1b1c1a] mb-3
                               text-[clamp(24px,3vw,44px)]">
                  {product.name}
                </h1>

                {/* Gold rule */}
                <div className="w-10 h-px bg-[#C9A96E] mb-5" />

                {/* Currency */}
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#B5ADA3]
                              font-[family-name:var(--font-sans)] mb-1.5">
                  {product.price?.currency ?? 'INR'}
                </p>

                {/* Price */}
                <p className="font-[family-name:var(--font-serif)] font-normal
                              text-[#1b1c1a] mb-5 -tracking-[0.01em]
                              text-[clamp(22px,2.5vw,34px)]">
                  {formatPrice(product.price)}
                </p>

                {/* Description */}
                {product.description && (
                  <div className="mb-5">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-[#B5ADA3]
                                  font-[family-name:var(--font-sans)] mb-2">
                      Description
                    </p>
                    <p className="text-[13px] leading-[1.75] text-[#4d463a]
                                  font-[family-name:var(--font-sans)] font-light">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Added date */}
                {product.createdAt && (
                  <p className="text-[9px] tracking-[0.18em] uppercase text-[#B5ADA3]
                                font-[family-name:var(--font-sans)] mb-7 sm:mb-8">
                    Added {formatDate(product.createdAt)}
                  </p>
                )}

                {/* Action buttons */}
                <div className="flex flex-col gap-2.5">
                  <ActionButton
                    label="Buy Now"
                    variant="primary"
                    onClick={() => console.log('Buy Now:', product._id)}
                  />
                  <ActionButton
                    label="Add to Cart"
                    variant="secondary"
                    onClick={() => console.log('Add to Cart:', product._id)}
                  />
                </div>
              </div>
            </div>
          </main>
        )}

        {!loading && <Footer />}
      </div>
    </>
  )
}

export default ProductDetails


