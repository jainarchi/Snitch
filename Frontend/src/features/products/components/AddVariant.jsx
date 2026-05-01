import React from 'react'
import { useRef } from 'react';


const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);


const AddVariant = ({ sizes, setSizes, variantData, setVariantData, newProduct = false }) => {

  /* Size Handlers */
  const handleSizeChange = (index, field, value) => {
    if (value < 0) value = 0;
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const addSizeRow = () => setSizes([...sizes, { size: '', stock: '' }]);
  const removeSizeRow = (index) => {
    if (sizes.length === 1) return;
    const updated = sizes.filter((_, i) => i !== index);
    setSizes(updated);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'priceAmount' && value < 0) { value = 0 }
    setVariantData(prev => ({ ...prev, [name]: value }));
  };



  const inputClass = "w-full bg-transparent outline-none py-4 text-sm transition-colors duration-300 placeholder:text-[#d0c5b5]";
  const inputStyle = { color: '#1b1c1a', borderBottom: '1px solid #d0c5b5', fontFamily: "'Inter', sans-serif" };
  const handleFocus = (e) => { e.target.style.borderBottomColor = '#C9A96E'; };
  const handleBlur = (e) => { e.target.style.borderBottomColor = '#d0c5b5'; };


  return (
  <>
      <div className="flex flex-col gap-12">

        {/* Variant Color */}
        <div className="flex flex-col gap-2">
          <label htmlFor="color" className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
            Variant Color
          </label>
          <input
            id="color"
            type="text"
            name="color"
            value={variantData.color}
            onChange={handleChange}
            required
            placeholder="e.g. Vintage White"
            className={inputClass}
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        {
          !newProduct &&
          <div className="flex flex-col gap-2">
            <label htmlFor="priceAmount" className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
              Price
            </label>
            <input
              id="priceAmount"
              type="number"
              min="0"
              name="priceAmount"
              value={variantData.priceAmount}
              onChange={handleChange}
              placeholder="Enter price "
              className={inputClass}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        }




        {/* Sizes & Stock */}
        <div className="flex flex-col gap-6">
          <label className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
            Sizes & Inventory
          </label>
          <div className="space-y-6">
            {sizes.map((s, idx) => (
              <div key={idx} className="flex items-end gap-5">
                <div className="flex-[2] flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: '#B5ADA3' }}>Size</span>
                  <select
                    value={s.size}
                    onChange={(e) => handleSizeChange(idx, 'size', e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="" disabled>Select size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
                  <div className="flex-[2] flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-[0.18em]" style={{ color: '#B5ADA3' }}>Stock</span>
                    <input
                      type="number"
                      min="0"
                      value={s.stock}
                      placeholder="0"
                      onChange={(e) => handleSizeChange(idx, 'stock', e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSizeRow(idx)}
                    disabled={sizes.length === 1}
                    className="mb-3 p-2 text-[#B5ADA3] hover:text-[#ba1a1a] transition-colors disabled:opacity-0 bg-transparent border-none cursor-pointer"
                  >
                    <TrashIcon />
                  </button>
                </div>
                    ))}
                <button
                  type="button"
                  onClick={addSizeRow}
                  className="flex items-center gap-2 text-[#C9A96E] hover:text-[#1b1c1a] transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  <PlusIcon />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Add Size Row</span>
                </button>
              </div>
                </div>

        </div>

      </>
      )
}

      export default AddVariant
