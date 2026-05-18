import React from 'react';

const statusStyles = {
  pending:   'text-amber-600',
  confirmed: 'text-snitch-gold',
  shipped:   'text-blue-600',
  delivered: 'text-snitch-charcoal',
  cancelled: 'text-red-500',
};

const SellerSuborderCard = ({ order }) => {
  const { _id, user, order: { deliveryAddress }, items, totalPrice, status, createdAt } = order;

  const statusColor = statusStyles[status?.toLowerCase()] || 'text-snitch-charcoal';

  return (
    
    <div className="bg-snitch-cream border-b border-snitch-border/20 py-8 flex flex-col gap-6 max-w-5xl p-2 ">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <p className="font-label text-[0.68rem] tracking-[0.2em] uppercase text-snitch-warm">
            Order #{_id?.slice(-6)}
          </p>
          <span className={`font-label text-[0.65rem] tracking-[0.14em] uppercase ${statusColor}`}>
            {status}
          </span>
        </div>
        <p className="font-label text-[0.65rem] tracking-[0.14em] uppercase text-snitch-faint">
          {new Date(createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      {/* Customer + Address */}
      <div className="flex flex-col sm:flex-row gap-1">
        <p className="font-body text-[0.82rem] text-snitch-charcoal capitalize">{user.fullname}</p>
        <span className="hidden sm:block text-snitch-faint mx-2">·</span>
        <p className="font-body text-[0.82rem] text-snitch-muted capitalize">
          {deliveryAddress.label} - {deliveryAddress.addressLine}, {deliveryAddress.city}, {deliveryAddress.state}, {deliveryAddress.pincode}
        </p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-4">
        {items?.map((item) => (
          <div key={item._id} className="flex items-start gap-4">
            <img
              src={item.image.url}
              alt={item.title}
              className="w-14 h-16 object-cover shrink-0 bg-snitch-card"
            />
            <div className="flex-1 min-w-0">
              <p className="font-body text-[0.82rem] text-snitch-charcoal truncate">{item.title}</p>
              <p className="font-label text-[0.68rem] tracking-[0.12em] uppercase text-snitch-faint mt-1">
                {item.color} · {item.size} · Qty {item.quantity}
              </p>
            </div>
            <p className="font-body text-[0.82rem] text-gray-500 shrink-0">
              ₹{(item.price.amount * item.quantity).toLocaleString('en-IN')}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-snitch-border/20">
        <span className="font-label text-[0.55rem] tracking-[0.14em] uppercase text-snitch-faint">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="font-label text-[0.55rem] tracking-[0.14em] uppercase text-snitch-faint">Total</span>
          <span className=" text-[1rem] font-normal text-snitch-charcoal">
            ₹{totalPrice.amount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

    </div>
  );
};

export default SellerSuborderCard;