import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icons from '../../shared/icons/Icons';
import {formatPrice} from '../../shared/utils/formatPrice';




const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const STATUS_CONFIG = {
  pending:    { bg: 'bg-amber-100',   text: 'text-amber-700',   label: 'Pending'    },
  confirmed:  { bg: 'bg-[#d4f0dc]',   text: 'text-[#2d6a4f]',  label: 'Confirmed'  },
  processing: { bg: 'bg-blue-100',    text: 'text-blue-700',    label: 'In Progress'},
  shipped:    { bg: 'bg-[#fef3c7]',   text: 'text-[#92400e]',  label: 'Shipped'    },
  delivered:  { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Delivered'  },
  cancelled:  { bg: 'bg-red-100',     text: 'text-red-600',     label: 'Cancelled'  },
};


const OrderCard = ({ order, index = 0 }) => {
  const navigate = useNavigate();
  if (!order) return null;


  const extraCount  = order.itemsCount - 1;
  const statusKey   = (order.status || 'confirmed').toLowerCase();
  const statusCfg   = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.confirmed;

  const orderId  = order._id || '';
  const shortId  = `#SN-${orderId.slice(-6).toUpperCase()}`;

  const handleViewDetails = () => {
    if (orderId) navigate(`/orders/${orderId}`);
  };

  let itemsLine = 'Single item order';
  if (extraCount === 1) itemsLine = '+1 more item';
  if (extraCount > 1)   itemsLine = `+${extraCount} more items in this shipment`;

  return (
    <article
      id={`order-card-${orderId}`}
      className="
        group w-full bg-[#ffffff]
        transition-colors duration-300 hover:bg-[#f4f4f4]
        animate-[orderFadeIn_0.55s_ease-out_both]
      "
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="flex flex-col min-h-[200px] sm:min-h-[220px] lg:min-h-[240px] p-2 gap-8 min-[400px]:flex-row">

        {/* ── LEFT: Product image — fills full card height ── */}
        <div className="shrink-0 min-[400px]:w-[130px] sm:w-[155px] lg:w-[170px] overflow-hidden bg-[#e0ddd9]">
          {order.previewImage ? (
            <img
              src={order.previewImage}
              alt="order item"
              className="w-full h-full bg-amber-200 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icons.Image className="w-7 h-7 text-[#B5ADA3]" />
            </div>
          )}
        </div>

        {/*  RIGHT Content  */}
        <div className="flex-1 flex flex-col justify-between sm:py-2 sm:px-4 min-w-0">

          {/* Top row */}
          <div className="flex items-start justify-between gap-3 ">

            {/* Status + order id */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Status pill */}
              <span className={`
                inline-flex items-center
                px-2 py-0.5
                ${statusCfg.bg} ${statusCfg.text}
                font-[family-name:var(--font-sans)]
                text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-semibold
              `}>
                {statusCfg.label}
              </span>

              {/* Short order id */}
              <span className="
                font-[family-name:var(--font-sans)]
                text-[10px] sm:text-[11px] tracking-[0.08em]
                text-[#7A6E63]
              ">
                {shortId}
              </span>
            </div>

            {/* Date block – top-right */}
            <div className="text-right shrink-0">
              <p className="
                font-[family-name:var(--font-sans)]
                text-[8px] sm:text-[9px] tracking-[0.22em] uppercase
                text-[#B5ADA3] mb-0.5
              ">
                Date
              </p>
              <p className="
                font-[family-name:var(--font-sans)]
                text-[11px] sm:text-xs text-[#4d463a] font-medium
              ">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Product title + items subtitle */}
          <div className="mt-3 sm:mt-4">
            <h3 className="
              font-[family-name:var(--font-serif)] font-normal
              text-xl sm:text-2xl lg:text-[1.6rem]
              leading-tight text-[#1b1c1a]
              line-clamp-2
            ">
              {order.title || 'Order Item'}
            </h3>

            <p className="
              mt-1
              font-[family-name:var(--font-sans)]
              text-[10px] sm:text-[11px] tracking-[0.06em]
              text-[#B5ADA3] italic
            ">
              {itemsLine}
            </p>
          </div>

          
          <div className="flex items-end justify-between mt-4 sm:mt-5 pt-3">

            {/* Total */}
            <div>
              <p className="
                font-[family-name:var(--font-sans)]
                text-[8px] sm:text-[9px] tracking-[0.22em] uppercase
                text-[#B5ADA3] mb-0.5
              ">
                Total Amount
              </p>
              <p className="
            
                text-sm md:text-lg
                text-[#1b1c1a]
              ">
                {formatPrice(order.price)}
              </p>
            </div>

           
            <button
              id={`view-order-${orderId}`}
              onClick={handleViewDetails}
              aria-label={`View details for order ${shortId}`}
              className="
                flex items-center gap-1.5
                font-[family-name:var(--font-sans)]
                text-[10px] sm:text-[11px] sm:tracking-[0.18em] uppercase
                text-[#1b1c1a] font-medium

                pb-0.5 border-b border-[#1b1c1a]

                transition-all duration-300 cursor-pointer

                hover:text-[#C9A96E] hover:border-[#C9A96E]
                active:scale-[0.97]
              "
            >
              View Details
              <svg className=" hidden sm:block w-2 h-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </article>
  );
};

export default OrderCard;
