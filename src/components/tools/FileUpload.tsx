import { useState, useCallback } from "react";
import type { DragEvent, ChangeEvent } from "react";
import { Upload, File, X, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: string;
  maxSize?: number; // in MB
  label?: string;
}

export default function FileUpload({ onFileSelect, accept, maxSize = 10, label }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (selectedFile: File) => {
    setError(null);
    
    // Check type
    const acceptedTypes = accept.split(",").map(t => t.trim());
    const fileType = selectedFile.type;
    const fileExt = `.${selectedFile.name.split('.').pop()}`;
    
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) return fileExt.toLowerCase() === type.toLowerCase();
      if (type.includes('/*')) return fileType.startsWith(type.replace('/*', ''));
      return fileType === type;
    });

    if (!isValidType) {
      setError(`Invalid file type. Please upload ${accept}`);
      return false;
    }

    // Check size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSize}MB`);
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
      onFileSelect(droppedFile);
    }
  }, [onFileSelect, accept, maxSize]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 transition-all",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-gray-400",
          file ? "border-green-500 bg-green-50" : ""
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {label || "Click or drag to upload"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {accept.replace(/\./g, '').toUpperCase()} up to {maxSize}MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
                <File className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 truncate max-w-xs">
                {file.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(); }}
                className="mt-4 flex items-center text-sm font-medium text-red-600 hover:text-red-700"
              >
                <X className="mr-1 h-4 w-4" />
                Remove file
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 flex items-center rounded-lg bg-red-50 p-4 text-red-700"
          >
            <AlertCircle className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
