import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Shared sticky navbar for the Snitch app.
 * Shows logo left, nav links centre (desktop), cart + profile + hamburger right.
 * Props:
 *   rightSlot — optional JSX to render on the right instead of the default icons
 *               (used by ProductDetails to show "← Back" link)
 */
const Navbar = ({ rightSlot }) => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 h-14 flex items-center justify-between
                 px-5 sm:px-8 lg:px-12 xl:px-16
                 bg-[#fbf9f6]/90 backdrop-blur-2xl
                 border-b border-[#d0c5b5]/25"
    >
      {/* ── Logo ── */}
      <span
        onClick={() => { navigate('/'); setMenuOpen(false) }}
        className="font-[family-name:var(--font-serif)] text-[13px] tracking-[0.35em]
                   uppercase text-[#C9A96E] cursor-pointer select-none shrink-0"
      >
        Snitch.
      </span>

      {/* ── Desktop nav links (centre) ── */}
      <div className="hidden md:flex items-center gap-8 lg:gap-10 absolute left-1/2 -translate-x-1/2">
        {['Shop', 'Collections', 'About'].map((lnk) => (
          <button
            key={lnk}
            className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.2em]
                       uppercase text-[#7A6E63] hover:text-[#1b1c1a]
                       bg-transparent border-none cursor-pointer transition-colors duration-300"
          >
            {lnk}
          </button>
        ))}
      </div>

      {/* ── Right slot ── */}
      <div className="flex items-center gap-4 sm:gap-5">
        {rightSlot ?? (
          <>
            {/* Cart */}
            <button
              aria-label="Cart"
              className="text-[#7A6E63] hover:text-[#1b1c1a] transition-colors duration-300
                         p-0 bg-transparent border-none cursor-pointer"
            >
              <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>

            {/* Profile (hidden on smallest screens) */}
            <button
              aria-label="Profile"
              className="text-[#7A6E63] hover:text-[#1b1c1a] transition-colors duration-300
                         hidden sm:block p-0 bg-transparent border-none cursor-pointer"
            >
              <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </>
        )}

        {/* Hamburger — mobile only, always visible */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          className="md:hidden text-[#7A6E63] hover:text-[#1b1c1a] transition-colors
                     p-0 bg-transparent border-none cursor-pointer"
        >
          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.5">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="absolute top-14 inset-x-0 bg-[#fbf9f6] border-b border-[#d0c5b5]/30
                        flex flex-col items-center gap-5 py-7 md:hidden shadow-sm z-50">
          {['Shop', 'Collections', 'About'].map((lnk) => (
            <button
              key={lnk}
              onClick={() => setMenuOpen(false)}
              className="font-[family-name:var(--font-sans)] text-[10px] tracking-[0.22em]
                         uppercase text-[#7A6E63] hover:text-[#1b1c1a]
                         bg-transparent border-none cursor-pointer transition-colors duration-300"
            >
              {lnk}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
