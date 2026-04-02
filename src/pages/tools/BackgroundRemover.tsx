import { useState } from "react";
import { Eraser, Download, Loader2, RefreshCw, Crop } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import FileUpload from "@/src/components/tools/FileUpload";
import { GoogleGenAI } from "@google/genai";
import CropModal from "@/src/components/tools/CropModal";
import Tooltip from "@/src/components/ui/Tooltip";

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [cropTarget, setCropTarget] = useState<"original" | "processed" | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setOriginalUrl(URL.createObjectURL(selectedFile));
    setProcessedUrl(null);
    setError(null);
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    const croppedUrl = URL.createObjectURL(croppedBlob);
    if (cropTarget === "original") {
      setOriginalUrl(croppedUrl);
      // Create a new File object from the blob to keep it consistent
      const newFile = new File([croppedBlob], file?.name || "cropped-image.png", { type: "image/png" });
      setFile(newFile);
    } else if (cropTarget === "processed") {
      setProcessedUrl(croppedUrl);
    }
    setShowCropModal(false);
    setCropTarget(null);
  };

  const handleRemoveBackground = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(",")[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
      const ai = new GoogleGenAI({ apiKey: apiKey! });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: file.type,
              },
            },
            {
              text: "Remove the background from this image. Keep only the main subject and return the result with a transparent background. If transparency is not possible, return the subject on a solid white background.",
            },
          ],
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const resultBase64 = part.inlineData.data;
          setProcessedUrl(`data:${part.inlineData.mimeType};base64,${resultBase64}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("No image returned from AI");
      }
    } catch (err) {
      setError("Failed to process image. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!processedUrl) return;
    const a = document.createElement("a");
    a.href = processedUrl;
    a.download = `no-bg-${file?.name || "image.png"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 mb-6 shadow-lg shadow-indigo-50">
          <Eraser className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">AI Background Remover</h1>
        <p className="mt-4 text-lg text-gray-600">
          Instantly remove backgrounds from your photos with professional quality.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
        {!processedUrl ? (
          <>
            <div className="relative">
              {originalUrl ? (
                <div className="space-y-6">
                  <div className="relative aspect-video max-h-[400px] rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img src={originalUrl} alt="Original" className="h-full w-full object-contain" />
                    <button
                      onClick={() => {
                        setCropTarget("original");
                        setShowCropModal(true);
                      }}
                      className="absolute top-4 right-4 flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-white transition-all"
                    >
                      <Crop className="h-4 w-4" />
                      Crop Image
                    </button>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setOriginalUrl(null)}
                      className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Change Image
                    </button>
                    <Tooltip content="Start the AI background removal process.">
                      <button
                        onClick={handleRemoveBackground}
                        disabled={isProcessing}
                        className="flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Remove Background
                          </>
                        )}
                      </button>
                    </Tooltip>
                  </div>
                </div>
              ) : (
                <FileUpload
                  onFileSelect={handleFileSelect}
                  accept="image/jpeg, image/png"
                  maxSize={5}
                  label="Upload image (JPG, PNG)"
                />
              )}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-center font-semibold text-gray-700">Original</h3>
              <div className="aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                <img src={originalUrl!} alt="Original" className="h-full w-full object-contain" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-center font-semibold text-gray-700">Result</h3>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] bg-gray-100">
                <img src={processedUrl} alt="Processed" className="h-full w-full object-contain" />
                <button
                  onClick={() => {
                    setCropTarget("processed");
                    setShowCropModal(true);
                  }}
                  className="absolute top-4 right-4 flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-white transition-all"
                >
                  <Crop className="h-4 w-4" />
                  Crop Result
                </button>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-center gap-4">
              <button
                onClick={() => setProcessedUrl(null)}
                className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Try Another
              </button>
              <Tooltip content="Save the transparent PNG to your device.">
                <button
                  onClick={downloadResult}
                  className="flex items-center rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-green-500 transition-all"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </button>
              </Tooltip>
            </div>
          </div>
        )}

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-red-600 font-medium"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "AI Powered", desc: "Uses latest vision models for precise cutouts." },
          { title: "Transparent PNG", desc: "Download with high-quality transparency." },
          { title: "Privacy First", desc: "Images are never stored on our servers." },
        ].map((item, i) => (
          <div key={i} className="text-center">
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showCropModal && (
          <CropModal
            image={cropTarget === "original" ? originalUrl! : processedUrl!}
            onCropComplete={handleCropComplete}
            onClose={() => {
              setShowCropModal(false);
              setCropTarget(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
