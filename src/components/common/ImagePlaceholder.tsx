import React from "react";
import { ImageOff } from "lucide-react";

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-video", "aspect-square", "aspect-[4/3]"
  height?: string;
}

export default function ImagePlaceholder({
  label = "No Image Available",
  className = "",
  aspectRatio = "",
  height = "h-48",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`w-full ${aspectRatio ? aspectRatio : height} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 text-center text-gray-500 hover:bg-gray-50 transition-colors select-none ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-gray-200/80 flex items-center justify-center mb-2 text-gray-400">
        <ImageOff className="w-5 h-5" />
      </div>
      <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-500">
        {label}
      </span>
      <span className="text-[11px] text-gray-400 mt-0.5">
        (ಚಿತ್ರ ಲಭ್ಯವಿಲ್ಲ / Placeholder)
      </span>
    </div>
  );
}

