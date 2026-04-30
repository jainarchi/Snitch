import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ─── SVG Icons ─── */
const Icons = {
  Overview: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Products: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
  Orders: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="0"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>
    </svg>
  ),
  Revenue: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  SignOut: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
};

/* ─── Nav Config ─── */
const NAV_ITEMS = [
  { label: 'Overview', to: 'overview', icon: Icons.Overview },
  { label: 'Products', to: 'products', icon: Icons.Products },
  { label: 'Orders',   to: 'orders',   icon: Icons.Orders   },
  { label: 'Revenue',  to: 'revenue',  icon: Icons.Revenue  },
  { label: 'Settings', to: 'settings', icon: Icons.Settings },
];

/* ─── NavItem ─── */
const NavItem = ({ to, label, icon, onClose }) => (
  <NavLink
    to={to}
    onClick={onClose}
    className={({ isActive }) =>
      [
        'flex items-center gap-3 py-3 px-6',
        'font-body text-[0.8125rem] tracking-[0.03em] no-underline',
        'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        'border-l-2',
        isActive
          ? 'border-snitch-gold text-snitch-gold font-semibold bg-snitch-gold/5'
          : 'border-transparent text-snitch-warm hover:text-snitch-charcoal hover:bg-snitch-card/70',
      ].join(' ')
    }
  >
    {({ isActive }) => (
      <>
        <span className={`shrink-0 transition-colors duration-300 ${isActive ? 'text-snitch-gold' : 'text-snitch-faint group-hover:text-snitch-warm'}`}>
          {icon}
        </span>
        <span>{label}</span>
      </>
    )}
  </NavLink>
);

/* ─── Sidebar inner content (no scroll, fixed height layout) ─── */
const SidebarContent = ({ onClose }) => {
  const navigate    = useNavigate();
  const user        = useSelector(state => state?.auth?.user);
  const initials    = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'S';
  const displayName = user?.name ?? 'Seller';

  return (
    /* h-full + flex col + overflow-hidden = sidebar never scrolls */
    <div className="flex flex-col h-full overflow-hidden bg-snitch-cream">

      {/* ── Logo block ── */}
      <div className="px-6 py-5 shrink-0 border-b border-snitch-gold/20">
        <span className="font-serif text-xl font-bold tracking-[0.14em] uppercase text-snitch-gold">
          Snitch.
        </span>
        <p className="font-label text-[0.55rem] tracking-[0.18em] uppercase text-snitch-warm mt-0.5 m-0">
          Seller Dashboard
        </p>
      </div>

      {/* ── Nav — shrink-0 so it takes only what it needs ── */}
      <nav className="shrink-0 pt-3 pb-3">
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            onClose={onClose}
          />
        ))}
      </nav>

      {/* ── Elastic spacer — pushes footer to bottom ── */}
      <div className="flex-1" />

      {/* ── User footer — always pinned at bottom ── */}
      <div className="shrink-0 px-6 py-5 border-t border-snitch-border/30 bg-snitch-card-lo/50">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-full bg-snitch-gold flex items-center justify-center shrink-0">
            <span className="font-label text-[0.65rem] font-bold text-white">{initials}</span>
          </div>
          <div className="overflow-hidden">
            <p className="font-body text-[0.8rem] font-medium text-snitch-charcoal m-0 truncate">{displayName}</p>
            <p className="font-label text-[0.65rem] text-snitch-warm m-0 tracking-[0.04em]">Seller Account</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer font-label text-[0.7rem] tracking-[0.08em] uppercase text-snitch-warm hover:text-snitch-gold transition-colors duration-300"
        >
          {Icons.SignOut}
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

/* ─── Main Sidebar (responsive) ─── */
const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-snitch-cream border border-snitch-border/40 text-snitch-charcoal"
        aria-label="Open navigation menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <line x1="3" y1="6"  x2="21" y2="6"  />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* ── Mobile backdrop ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-snitch-charcoal/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={[
          'lg:hidden fixed inset-y-0 left-0 z-50 w-64',
          'transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3 p-1 text-snitch-warm hover:text-snitch-charcoal bg-transparent border-none cursor-pointer text-lg leading-none"
        >
          ✕
        </button>
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>

      {/* ── Desktop sidebar — fixed height, no scroll ── */}
      <aside className="hidden lg:block w-48 xl:w-52 h-screen sticky top-0 shrink-0 border-r border-snitch-border/30">
        <SidebarContent onClose={() => {}} />
      </aside>
    </>
  );
};

export default Sidebar;
