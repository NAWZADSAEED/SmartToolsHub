import { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import { X, Check, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import getCroppedImg from "@/src/lib/cropUtils";

interface CropModalProps {
  image: string;
  onCropComplete: (croppedImage: Blob) => void;
  onClose: () => void;
}

export default function CropModal({ image, onCropComplete, onClose }: CropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onRotationChange = (rotation: number) => {
    setRotation(rotation);
  };

  const onCropCompleteInternal = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative flex h-full max-h-[800px] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">Crop Image</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="relative flex-grow bg-gray-900">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={undefined}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteInternal}
            onZoomChange={onZoomChange}
            onRotationChange={onRotationChange}
          />
        </div>

        <div className="space-y-6 border-t border-gray-100 bg-white px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => onZoomChange(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                <span>Rotation</span>
                <span>{rotation}°</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  onChange={(e) => onRotationChange(Number(e.target.value))}
                  className="h-2 flex-grow cursor-pointer appearance-none rounded-lg bg-gray-200 accent-indigo-600"
                />
                <button
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                >
                  <RotateCw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className="flex items-center rounded-xl bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 transition-all"
            >
              <Check className="mr-2 h-4 w-4" />
              Apply Crop
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
