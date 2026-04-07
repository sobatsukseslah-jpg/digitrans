import React, { useState, useCallback, useId } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { UploadIcon } from './icons/UploadIcon';

// Declare heic2any
declare const heic2any: any;

interface ImageUploaderProps {
  onImageUpload: (dataUrl: string, mimeType: string) => void;
  uploadedImage: string | null;
  label: string; 
  labelKey: string;
}

const convertHeicToJpg = async (file: File): Promise<File> => {
  const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type.toLowerCase() === 'image/heic';
  if (isHeic && typeof heic2any !== 'undefined') {
      try {
          const result = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
          const finalBlob = Array.isArray(result) ? result[0] : result;
          const fileName = file.name.replace(/\.heic$/i, '.jpg');
          return new File([finalBlob as Blob], fileName, { type: 'image/jpeg' });
      } catch (error) {
          console.error("HEIC conversion failed:", error);
      }
  }
  return file;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, uploadedImage, label, labelKey }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useLanguage();
  
  // Menggunakan useId untuk menjamin keunikan ID elemen input file,
  // sehingga tidak terjadi bentrokan saat beberapa fitur dirender sekaligus (Display Hidden Mode).
  const generatedId = useId();
  const inputId = `file-upload-${generatedId}`;

  const handleFileChange = useCallback(async (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      try {
        const processedFile = await convertHeicToJpg(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          onImageUpload(reader.result as string, processedFile.type || 'image/jpeg');
        };
        reader.readAsDataURL(processedFile);
      } catch (e) {
        console.error("Upload failed", e);
      }
    }
  }, [onImageUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

    return (
    <div className="w-full group">
      <label
        htmlFor={inputId}
        className={`relative block w-full aspect-video rounded-2xl border-2 border-dashed transition-all duration-300 ease-out cursor-pointer overflow-hidden
        ${isDragging 
            ? 'border-primary-500 bg-primary-500/10 scale-[1.02] shadow-[0_0_20px_rgba(0,212,255,0.2)]' 
            : 'border-slate-700 bg-[#0f172a] hover:border-primary-500/50 hover:bg-slate-800 glass-panel'
        }`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {uploadedImage ? (
          <div className="w-full h-full relative group-hover:opacity-95 transition-opacity bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMGYxNzJhIi8+CjxwYXRoIGQ9IkQwIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWUyOTNiIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')]">
            <img src={uploadedImage} alt="Uploaded preview" className="object-contain w-full h-full p-4 drop-shadow-md" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-primary-600 text-white px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)] font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <UploadIcon className="w-4 h-4" />
                    Change Image
                </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center space-y-4">
            <div className={`p-4 rounded-2xl transition-all duration-300 shadow-sm ring-1 ${isDragging ? 'bg-primary-500/20 text-primary-400 ring-primary-500/50' : 'bg-[#0f172a] text-slate-400 ring-white/10 group-hover:text-primary-400 group-hover:ring-primary-500/30 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]'}`}>
                <UploadIcon className="h-8 w-8" />
            </div>
            <div className="space-y-1">
                <p className="font-bold text-slate-200 group-hover:text-primary-400 transition-colors">{t(labelKey)}</p>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{t('uploader.fileTypes')}</p>
            </div>
          </div>
        )}
      </label>
      <input 
        id={inputId}
        name={inputId}
        type="file" 
        className="sr-only" 
        accept="image/png, image/jpeg, image/webp, .heic, .HEIC"
        onChange={(e) => handleFileChange(e.target.files)}
      />
    </div>
  );
};