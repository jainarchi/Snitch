import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icons from "../../shared/icons/Icons";
import { formatPrice } from "../../shared/utils/formatPrice";

const WishlistCard = ({
  product,
  onRemove,
  onAddToBag,
  index = 0,
}) => {
  
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToBag = (e) => {
    e.stopPropagation();
    onAddToBag?.(product);
  };

  const handleRemove = (e) => {
     console.log('removeing...')
    e.preventDefault();
    e.stopPropagation();

    onRemove(product._id);
  };

  const handleCardClick = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      className="
        group flex flex-col cursor-pointer w-full
        transition-all duration-500 ease-out
      "
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onClick={handleCardClick}
    >
      {/*  Image Container  */}
      <div
        className="relative overflow-hidden bg-[#eae8e5] mb-4"
        style={{ aspectRatio: "4/5" }}
      >
        {/* Product Image */}
        {product?.image ? (
          <img
            src={product.image}
            alt={product.title || "Wishlist item"}
            className={`
              w-full h-full object-cover
              transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
              group-hover:scale-105
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#e4e2df] flex items-center justify-center">
            <Icons.Image size={32} color="gray" />
          </div>
        )}

        {/* Shimmer Loader */}
        {product?.image && !imageLoaded && (
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-[#eae8e5]
              via-[#f0eeeb]
              to-[#eae8e5]
              animate-[shimmer_1.5s_ease-in-out_infinite]
            "
          />
        )}

        {/* Remove Wishlist Button */}
        <button
          onClick={handleRemove}
          aria-label="Remove from wishlist"
          className="
             z-10
            absolute top-2 right-2
            sm:top-3 sm:right-3

            w-5 h-5 sm:w-8 sm:h-8

            flex items-center justify-center

            bg-[#fbf9f6]/80
            backdrop-blur-sm

            transition-all duration-300
            cursor-pointer

            hover:bg-[#1b1c1a]
            hover:text-[#fbf9f6]

            opacity-100

            lg:opacity-0
            lg:pointer-events-none

            lg:group-hover:opacity-100
            lg:group-hover:pointer-events-auto
          "
        >
          <Icons.FilledHeart size={20} />
        </button>

        {/* Hover Overlay */}
        <div
          className="
            absolute inset-0
            bg-[#1b1c1a]/[0.03]

            opacity-0
            group-hover:opacity-100

            transition-opacity duration-500
          "
        />
      </div>

      {/*  Product Info  */}
      <div className="flex flex-col gap-1.5 mb-3">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3
            className="
              font-[family-name:var(--font-serif)]
              text-sm sm:text-lg
              font-normal
              text-[#1b1c1a]

              leading-snug
              line-clamp-2

              border-b border-transparent
              transition-[border-color] duration-300

              group-hover:border-[#B5ADA3]
            "
          >
            {product?.title || "Untitled"}
          </h3>

          <span
            className="
              font-[family-name:var(--font-sans)]
              text-sm sm:text-base
              font-normal
              text-[#1b1c1a]

              whitespace-nowrap
              shrink-0
            "
          >
            {formatPrice(product?.price)}
          </span>
        </div>

        {/* Category */}
        {product?.category && (
          <p
            className="
              font-[family-name:var(--font-sans)]
              text-[9px]
              tracking-[0.18em]
              uppercase
              text-[#B5ADA3]
              font-medium
            "
          >
            {product.category}
          </p>
        )}
      </div>

      {/*  Add To Bag  */}
      <button
        onClick={handleAddToBag}
        className="
          w-full py-3 px-5

          bg-[#1b1c1a]
          text-[#fbf9f6]

          font-[family-name:var(--font-sans)]
          text-[10px] sm:text-[11px]
          tracking-[0.18em]
          uppercase

          transition-all duration-300
          cursor-pointer

          hover:bg-[#C9A96E]
          hover:text-[#1b1c1a]

          active:scale-[0.98]
        "
      >
        Add to Bag
      </button>
    </div>
  );
};

export default WishlistCard;