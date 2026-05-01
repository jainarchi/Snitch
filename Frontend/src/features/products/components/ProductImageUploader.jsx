import React, { useCallback, useState , useRef } from 'react'


const ProductImageUploader = ({ images, setImages }) => {
  
  const MAX_IMAGES = 5;

   const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
   const handleDragLeave = () => setIsDragging(false);
   const [isDragging, setIsDragging] = useState(false);
   const fileInputRef = useRef(null);


      const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    }, [images]);


     const addFiles = (files) => {
        const remaining = MAX_IMAGES - images.length;
        if (remaining <= 0) return;
        const toAdd = Array.from(files).slice(0, remaining);
        const newImages = toAdd.map(file => ({ file, preview: URL.createObjectURL(file) }));
        setImages(prev => [...prev, ...newImages]);
    };

    const handleFileChange = (e) => {
        addFiles(e.target.files);
        e.target.value = '';
    };

    

    const removeImage = (index) => {
        setImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase tracking-[0.2em] font-medium" style={{ color: '#7A6E63' }}>
          Images
        </label>
        <span className="text-[10px]" style={{ color: '#B5ADA3' }}>
          {images.length}/{MAX_IMAGES}
        </span>
      </div>

      {/* Drop Zone */}
      {images.length < MAX_IMAGES && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed px-8 py-14 lg:py-20 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300"
          style={{
            borderColor: isDragging ? '#C9A96E' : '#d0c5b5',
            backgroundColor: isDragging ? 'rgba(201,169,110,0.04)' : 'transparent'
          }}
        >
          {/* Upload icon */}
          <div
            className="w-10 h-10 flex items-center justify-center border transition-colors duration-300"
            style={{ borderColor: isDragging ? '#C9A96E' : '#d0c5b5', color: isDragging ? '#C9A96E' : '#B5ADA3' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm leading-relaxed" style={{ color: '#7A6E63' }}>
              Drop images here or{' '}
              <span style={{ color: '#C9A96E', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                tap to upload
              </span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] mt-2" style={{ color: '#B5ADA3' }}>
              Up to {MAX_IMAGES} images
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3  gap-2 mt-1">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden group"
              style={{ backgroundColor: '#eae8e5' }}
            >
              <img
                src={img.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Remove overlay */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium tracking-widest uppercase"
                style={{ backgroundColor: 'rgba(27,24,20,0.55)', color: '#fbf9f6' }}
                aria-label={`Remove image ${index + 1}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageUploader
