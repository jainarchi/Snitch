import React from 'react';
import Loading from '../../shared/Loading';

const ItemCart = ({ item, onIncrease, onDecrease, removeItem }) => {
  if (!item) return null;

  const { id, product, variant, quantity } = item;


  return (
    <article className="flex gap-5 bg-white p-5 transition-shadow duration-300 hover:shadow-[0_20px_80px_rgba(27,28,26,0.05)]">
      
      <div className="flex-shrink-0 w-28 bg-[#efeeeb] overflow-hidden aspect-[5/6]">
        {variant.image ? (
          <img
            src={variant.image}
            alt={product.title || 'Product'}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#4d463a] text-xs tracking-widest uppercase">
            No Image
          </div>
        )}
      </div>

      {/* ── Item Details ── */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        {/* Top row: name + price */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-[#4d463a] font-medium font-[Inter] mb-0.5">
              {'SNITCH'}
            </p>
            <h3 className="text-base font-semibold text-[#1b1c1a] leading-tight font-[Inter] line-clamp-2">
              {product.title || 'Product'}
            </h3>
            {/* Variant chips */}
            <div className="flex gap-3 mt-2">
              <span className="text-[10px] tracking-[0.12em] uppercase text-[#4d463a] font-[Inter]">
                Color: <span className="text-[#1b1c1a] font-medium">{variant.color}</span>
              </span>
              <span className="text-[10px] tracking-[0.12em] uppercase text-[#4d463a] font-[Inter]">
                Size: <span className="text-[#1b1c1a] font-medium">{variant.size}</span>
              </span>
            </div>
          </div>

          {/* Price */}
          <p className="text-base font-semibold text-[#1b1c1a] font-[Inter] whitespace-nowrap flex-shrink-0">
            ₹{(variant.price.amount * quantity).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Bottom row: quantity stepper + remove */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-0">
            <button
              id={`cart-decrease-${id}`}
              onClick={() => onDecrease?.(id)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center border border-[#d0c5b5] text-[#1b1c1a] text-sm font-medium
                         transition-all duration-300 hover:border-[#745a27] hover:text-[#745a27]
                         disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span className="w-10 h-8 flex items-center justify-center border-t border-b border-[#d0c5b5] text-sm font-medium text-[#1b1c1a] font-[Inter] select-none">
              {quantity}
            </span>

            <button
              id={`cart-increase-${id}`}
              onClick={() => onIncrease?.(id)}
              className="w-8 h-8 flex items-center justify-center border border-[#d0c5b5] text-[#1b1c1a] text-sm font-medium
                         transition-all duration-300 hover:border-[#745a27] hover:text-[#745a27]
                         focus:outline-none"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Remove */}
          <button
            id={`cart-remove-${id}`}
            onClick={() => {removeItem(id)}}
            className="text-[11px] tracking-[0.08em] uppercase text-[#4d463a] font-[Inter] underline-offset-2
                       transition-colors duration-300 hover:text-[#ba1a1a] hover:underline focus:outline-none"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
};

export default ItemCart;
