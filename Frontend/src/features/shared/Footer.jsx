import React from 'react'

/** Shared Snitch footer */
const Footer = () => (
  <footer className="border-t border-[#d0c5b5]/35
                     px-5 sm:px-8 py-8 flex flex-col items-center gap-2.5">
    <span className="font-[family-name:var(--font-serif)] text-[13px]
                     tracking-[0.32em] uppercase text-[#C9A96E]">
      Snitch.
    </span>
    <p className="font-[family-name:var(--font-sans)] text-[10px]
                  tracking-[0.12em] text-[#B5ADA3]">
      © {new Date().getFullYear()} Snitch. All rights reserved.
    </p>
  </footer>
)

export default Footer
