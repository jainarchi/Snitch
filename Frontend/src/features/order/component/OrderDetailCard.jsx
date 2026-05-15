import React from 'react';
import { formatPrice } from '../../shared/utils/formatPrice';

/* ── Status badge config — mirrors OrderCard ── */
const STATUS_CONFIG = {
  pending:    { bg: 'bg-amber-100',   text: 'text-amber-700',   label: 'Pending'    },
  confirmed:  { bg: 'bg-[#d4f0dc]',   text: 'text-[#2d6a4f]',  label: 'Confirmed'  },
  processing: { bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'Processing' },
  shipped:    { bg: 'bg-[#fef3c7]',   text: 'text-[#92400e]',  label: 'Shipped'    },
  delivered:  { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Delivered'  },
  cancelled:  { bg: 'bg-red-100',     text: 'text-red-600',     label: 'Cancelled'  },
};


const OrderDetailCard = ({ item, status = 'confirmed', index = 0 }) => {
  if (!item) return null;

  const statusKey = status.toLowerCase();
  const cfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.confirmed;

  const unitPrice  = item.price ?? {};
  const totalAmount = {
    amount:   (unitPrice.amount ?? 0) * (item.quantity ?? 1),
    currency: unitPrice.currency ?? 'INR',
  };

  return (
    <article
      id={`order-detail-card-${item._id}`}
      className="
        group relative w-full
        bg-white
        transition-all duration-300
        hover:bg-[#fdfaf7]
        animate-[orderFadeIn_0.55s_ease-out_both]
      "
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Thin gold accent on hover */}
      <div className="
        absolute left-0 top-0 bottom-0 w-[2px]
        bg-[#C9A96E] scale-y-0 origin-top
        transition-transform duration-500
        group-hover:scale-y-100
      " />

      <div className="flex gap-4 sm:gap-6 p-4 sm:p-5 lg:p-6">

        {/* ── Image ── */}
        <div className="
          shrink-0 w-[80px] h-[100px]
          sm:w-[100px] sm:h-[125px]
          lg:w-[110px] lg:h-[138px]
          overflow-hidden bg-[#eae8e5]
        ">
          {item.image?.url ? (
            <img
              src={item.image.url}
              alt={item.title || 'Product'}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#B5ADA3]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 16.5V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v9.75M3 16.5h18M3 16.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 16.5" />
              </svg>
            </div>
          )}
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">

          {/* Top row — status + title */}
          <div>
            {/* Status badge */}
            <span className={`
              inline-flex items-center mb-2
              px-2 py-0.5
              ${cfg.bg} ${cfg.text}
              font-[family-name:var(--font-sans)]
              text-[8px] sm:text-[9px] tracking-[0.18em] uppercase font-semibold
            `}>
              {cfg.label}
            </span>

            {/* Product title */}
            <h3 className="
              font-[family-name:var(--font-serif)] font-normal
              text-base sm:text-lg lg:text-xl
              leading-snug text-[#1b1c1a]
              line-clamp-2
            ">
              {item.title || 'Product'}
            </h3>

            {/* Variant info — size & color */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {item.size && (
                <span className="
                  font-[family-name:var(--font-sans)]
                  text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-[#7A6E63]
                ">
                  Size&nbsp;<span className="text-[#1b1c1a] font-medium">{item.size}</span>
                </span>
              )}
              {item.color && (
                <span className="
                  font-[family-name:var(--font-sans)]
                  text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-[#7A6E63]
                ">
                  Colour&nbsp;
                  <span className="text-[#1b1c1a] font-medium capitalize">{item.color}</span>
                </span>
              )}
            </div>
          </div>

          {/* Bottom row — qty + price */}
          <div className="flex items-end justify-between mt-3 sm:mt-4 pt-3 border-t border-[#eae8e5]">
            {/* Qty */}
            <div>
              <p className="
                font-[family-name:var(--font-sans)]
                text-[8px] sm:text-[9px] tracking-[0.22em] uppercase
                text-[#B5ADA3] mb-0.5
              ">
                Qty
              </p>
              <p className="
                font-[family-name:var(--font-sans)]
                text-sm sm:text-base text-[#1b1c1a] font-medium
              ">
                × {item.quantity ?? 1}
              </p>
            </div>

            {/* Unit + total price */}
            <div className="text-right">
              <p className="
                font-[family-name:var(--font-sans)]
                text-[8px] sm:text-[9px] tracking-[0.22em] uppercase
                text-[#B5ADA3] mb-0.5
              ">
                {item.quantity > 1 ? `${formatPrice(unitPrice)} ea.` : 'Price'}
              </p>
              <p className="
                text-base sm:text-lg lg:text-xl
                text-[#1b1c1a]
              ">
                {formatPrice(totalAmount)}
              </p>
            </div>
          </div>

        </div>
      </div>
    </article>
  );
};

export default OrderDetailCard;
