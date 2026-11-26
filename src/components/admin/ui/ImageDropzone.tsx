"use client";

import React, { useRef, useState } from "react";
import { Upload, Loader2, ImagePlus, CheckCircle2, AlertCircle } from "lucide-react";
import { API_BASE } from "@/lib/api";

interface ImageDropzoneProps {
  onUploadComplete: (urls: string[]) => void;
  label?: string;
  helperText?: string;
}

export default function ImageDropzone({
  onUploadComplete,
  label = "Drag & drop images here, or click to browse from computer",
  helperText = "Supports PNG, JPG, WEBP, GIF (multiple files allowed)",
}: ImageDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const uploadFiles = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      setUploadStatus({
        type: "error",
        message: "Please select valid image files (PNG, JPG, WEBP, GIF).",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);
    const uploadedUrls: string[] = [];

    try {
      const token =
        typeof window !== "undefined" ? sessionStorage.getItem("znv_admin_token") : null;

      for (const file of imageFiles) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(`${API_BASE}/api/assets/upload`, {
          method: "POST",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data?.success || !data?.fileUrl) {
          throw new Error(data?.message || `Failed to upload ${file.name}`);
        }

        const resolvedUrl = data.fileUrl.startsWith("http")
          ? data.fileUrl
          : `${API_BASE}${data.fileUrl.startsWith("/") ? "" : "/"}${data.fileUrl}`;

        uploadedUrls.push(resolvedUrl);
      }

      if (uploadedUrls.length > 0) {
        onUploadComplete(uploadedUrls);
        setUploadStatus({
          type: "success",
          message: `Uploaded ${uploadedUrls.length} image${uploadedUrls.length > 1 ? "s" : ""} successfully!`,
        });
      }
    } catch (err: any) {
      console.error("[ImageDropzone] Upload error:", err);
      const rawMsg = err?.message || "";
      const friendlyMsg =
        rawMsg === "Failed to fetch"
          ? `Cannot reach upload server (${API_BASE}). Please make sure the backend server is running.`
          : rawMsg || "Image upload failed. Please try again.";
      setUploadStatus({
        type: "error",
        message: friendlyMsg,
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="space-y-2">
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 text-center transition-all ${
          isDragging
            ? "border-purple-400 bg-purple-500/15 scale-[1.01]"
            : "border-white/15 bg-[#0e0d22]/80 hover:border-purple-500/50 hover:bg-purple-500/5"
        } ${isUploading ? "pointer-events-none opacity-75" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              uploadFiles(e.target.files);
            }
          }}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
            {isUploading ? (
              <Loader2 size={22} className="animate-spin" />
            ) : isDragging ? (
              <ImagePlus size={22} />
            ) : (
              <Upload size={22} />
            )}
          </div>
          <p className="text-xs sm:text-sm font-semibold text-white">
            {isUploading ? "Uploading images to server..." : label}
          </p>
          <p className="text-[11px] text-[#A7A3BC]">{helperText}</p>
        </div>
      </div>

      {uploadStatus && (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
            uploadStatus.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
          }`}
        >
          {uploadStatus.type === "success" ? (
            <CheckCircle2 size={14} className="shrink-0" />
          ) : (
            <AlertCircle size={14} className="shrink-0" />
          )}
          <span>{uploadStatus.message}</span>
        </div>
      )}
    </div>
  );
}
