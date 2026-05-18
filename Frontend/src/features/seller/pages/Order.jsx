import React, { useEffect } from 'react';
import { useSeller } from '../hook/useSeller';
import Loading from '../../shared/Loading';
import { useSelector } from 'react-redux';
import SellerSuborderCard from '../components/SellerSuborderCard';

const Order = () => {
  const { handleGetSellerSubOrders } = useSeller();
 
  const subOrders = useSelector(state => state.seller.subOrders) || [];
  const loading = useSelector(state => state.seller.loading.subOrders);

  useEffect(() => {
    handleGetSellerSubOrders();
  }, []);

  if (loading) return <Loading />;

  const totalOrderCount = subOrders.length;
  const totalRevenue = subOrders.reduce((acc, o) => acc + (o?.totalPrice?.amount || 0), 0);

  return (
    <div className="flex flex-col min-h-screen bg-snitch-cream">

      {/* Header */}
      <header className="px-5 sm:px-8 md:px-10 xl:px-14 pt-10 pb-8 border-b border-snitch-border/20 bg-snitch-cream">
        <div>
          <p className="font-label text-[0.58rem] tracking-[0.2em] uppercase text-snitch-warm m-0 mb-3">
            Seller Dashboard · Orders
          </p>
          <h1 className="font-serif text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-normal text-snitch-charcoal m-0 leading-[1.12]">
            Order Management.
          </h1>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 sm:gap-10 mt-8">
          {[
            { label: 'Total Orders', value: totalOrderCount },
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, accent: true },
          ].map(({ label, value, accent }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className={`sm:text-[2rem] font-normal leading-none ${accent ? 'text-snitch-gold' : 'text-snitch-charcoal'}`}>
                {value}
              </span>
              <span className="font-label text-[0.55rem] tracking-[0.14em] uppercase text-snitch-faint">
                {label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* Orders List */}
      <main className="flex-1 px-5 sm:px-8 md:px-10 xl:px-14 py-8 sm:py-10">

        {subOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <p className="font-serif text-[1.3rem] text-snitch-charcoal m-0 mb-2">
              No orders yet.
            </p>
            <p className="font-body text-[0.82rem] text-snitch-muted m-0">
              When customers place orders, they will appear here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-5 ">
            {subOrders.map(order => (
              <SellerSuborderCard key={order._id} order={order} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Order;