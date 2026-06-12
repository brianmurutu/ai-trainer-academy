"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

/**
 * Drag-and-drop / click-to-upload image zone.
 * - Shows a styled drop area when empty
 * - Shows a live preview with a hover-to-change overlay once a file is chosen
 * - The file is bound to `inputName` in the parent <form>
 * - `existingUrl` pre-fills the preview for edit pages
 */
export function ImageUploadZone({
  existingUrl,
  inputName = "image_file",
}: {
  existingUrl?: string | null;
  inputName?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(existingUrl ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  function clear(e: React.MouseEvent) {
    e.stopPropagation();
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        name={inputName}
        accept="image/*"
        onChange={onInputChange}
        style={{ display: "none" }}
      />

      {preview ? (
        /* ── Preview state ─────────────────────────────── */
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            position: "relative", borderRadius: 12, overflow: "hidden",
            border: "2px solid var(--accent)", cursor: "pointer",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Featured image preview"
            style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
          />
          {/* Hover overlay */}
          <div
            className="img-overlay"
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 8,
              opacity: 0, transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
          >
            <Upload size={24} color="white" />
            <span style={{ fontSize: 13, color: "white", fontWeight: 600 }}>Click to change image</span>
          </div>
          {/* Remove button */}
          <button
            type="button"
            onClick={clear}
            style={{
              position: "absolute", top: 10, right: 10,
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", border: "none",
              cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              zIndex: 2,
            }}
          >
            <X size={14} color="white" />
          </button>
          {fileName && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
              padding: "20px 14px 10px",
              fontSize: 11, color: "rgba(255,255,255,0.85)",
            }}>
              {fileName}
            </div>
          )}
        </div>
      ) : (
        /* ── Empty / drop zone ─────────────────────────── */
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          style={{
            border: `2px dashed ${isDragging ? "var(--accent)" : "var(--line)"}`,
            borderRadius: 12,
            padding: "40px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: isDragging ? "rgba(99,102,241,0.04)" : "#FAFAFA",
            transition: "border-color 0.15s, background 0.15s",
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "var(--surface)", border: "1px solid var(--line)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
          }}>
            <ImageIcon size={22} color="var(--muted)" />
          </div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>
            Click to upload or drag &amp; drop
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>
            PNG, JPG, WEBP — max 5 MB
          </p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 16px",
            background: "var(--accent)", color: "white",
            borderRadius: 8, fontSize: 12.5, fontWeight: 600,
          }}>
            <Upload size={13} />
            Choose Image
          </div>
          <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 14, lineHeight: 1.6 }}>
            💡 <strong>Tip:</strong> On your phone — save the image from Telegram to your photo gallery,
            then tap <strong>Choose Image</strong> to pick it.
          </p>
        </div>
      )}
    </div>
  );
}
