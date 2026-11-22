"use client";

import React, { useState } from "react";
import { API_BASE } from "@/lib/api";
import {
  Download,
  Plus,
  Search,
  FileArchive,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Globe,
  FolderLock,
  Video,
  Upload,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import Modal from "@/components/admin/ui/Modal";

export default function DigitalAssetsPage() {
  const { digitalAssets, products, addDigitalAsset, deleteDigitalAsset, addAuditLog } = useAdminData();

  const [searchTerm, setSearchTerm] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  const [form, setForm] = useState({
    name: "",
    fileName: "",
    fileType: "GOOGLE_DRIVE" as "ZIP" | "PDF" | "MP4" | "DOCX" | "PNG" | "JPG" | "GOOGLE_DRIVE" | "FOLDER" | "OTHER",
    fileSize: "25 MB",
    version: "2026.1",
    associatedProductId: products[0]?.id || "",
    status: "active" as "active" | "archived",

    // Point 8: Upload File, Video, Folder & Google Drive link
    fileUrl: "",
    googleDriveLink: "",
    accessFolderLink: "",
    videoLink: "",
  });

  const filteredAssets = digitalAssets.filter((a) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.fileName.toLowerCase().includes(q) ||
        a.associatedProductName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("znv_admin_token");
      const res = await fetch(`${API_BASE}/api/assets/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setForm((prev) => ({
          ...prev,
          name: prev.name || file.name.replace(/\.[^/.]+$/, ""),
          fileName: file.name,
          fileSize: data.fileSize,
          fileUrl: data.fileUrl,
        }));
        alert(`File "${file.name}" uploaded successfully!`);
      } else {
        // Fallback local setting
        setForm((prev) => ({
          ...prev,
          name: prev.name || file.name.replace(/\.[^/.]+$/, ""),
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        }));
      }
    } catch {
      // Fallback
      setForm((prev) => ({
        ...prev,
        name: prev.name || file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      }));
    } finally {
      setUploadingFile(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      alert("Please provide an asset title");
      return;
    }
    const prod = products.find((p) => p.id === form.associatedProductId);
    await addDigitalAsset({
      ...form,
      associatedProductName: prod?.name || "General Asset",
    });

    addAuditLog(
      "Created Digital Asset",
      "Digital Assets",
      `Registered "${form.name}" with Google Drive/Folder links for "${prod?.name || "Store"}"`
    );

    alert(`Asset "${form.name}" registered and deliverable links connected to "${prod?.name || "Product"}"!`);
    setUploadModalOpen(false);
    setForm({
      name: "",
      fileName: "",
      fileType: "GOOGLE_DRIVE",
      fileSize: "30 MB",
      version: "1.0",
      associatedProductId: products[0]?.id || "",
      status: "active",
      fileUrl: "",
      googleDriveLink: "",
      accessFolderLink: "",
      videoLink: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <HardDrive size={24} className="text-purple-400" />
            <span>Digital Asset Vault &amp; Delivery Files</span>
          </h1>
          <p className="text-xs text-[#A7A3BC] mt-0.5">
            Manage downloadable archives, video lessons, Google Drive master folders, and cloud storage links.
          </p>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all shrink-0"
        >
          <Plus size={16} />
          <span>Upload / Register Asset</span>
        </button>
      </div>

      {/* Main Table */}
      <AdminCard>
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search file name, product, format..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-purple-300">
                <th className="py-3 px-3">Asset Title</th>
                <th className="py-3 px-3">File / Links</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Associated Product</th>
                <th className="py-3 px-3">Size / Ver</th>
                <th className="py-3 px-3">Downloads</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-gray-300">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No digital assets found matching search.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          <FileArchive size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-white">{asset.name}</p>
                          <p className="text-[10px] text-gray-400">{asset.uploadDate}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono text-[11px] text-gray-300">
                      <div className="space-y-0.5">
                        <span className="block truncate max-w-[180px]">{asset.fileName || "Package"}</span>
                        <div className="flex items-center gap-1.5 pt-0.5">
                          <span className="text-[10px] text-[#22D3EE] flex items-center gap-1">
                            <Globe size={11} /> Google Drive Ready
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 border border-white/10 text-purple-300">
                        {asset.fileType}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-white max-w-xs truncate font-medium">
                      {asset.associatedProductName}
                    </td>

                    <td className="py-3 px-3 text-[11px] text-gray-400">
                      <span>{asset.fileSize}</span> • <span className="font-mono text-purple-300">v{asset.version}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-bold text-emerald-400">{asset.downloadCount}</span>
                      <span className="text-[10px] text-gray-500"> delivered</span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Remove asset "${asset.name}"?`)) {
                            deleteDigitalAsset(asset.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Asset"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      {/* Point 8: Upload File, Video, Folder & Google Drive link Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Register Digital Deliverable Asset"
        subtitle="Upload file binaries or attach Google Drive / cloud storage links for automated customer fulfillment"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Deliverable Asset Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Meta Ads Masterclass HD Video Archive"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          {/* File Upload Selector */}
          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase block mb-1">
              Upload File Binary (Video, ZIP, PDF)
            </label>
            <div className="p-4 border-2 border-dashed border-white/15 rounded-2xl bg-white/[0.02] text-center hover:border-purple-500/50 transition-colors">
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <label className="cursor-pointer text-xs font-semibold text-purple-300 hover:text-purple-200">
                <span>{uploadingFile ? "Uploading to storage..." : "Choose local file to upload"}</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  disabled={uploadingFile}
                  className="sr-only"
                />
              </label>
              {form.fileName && (
                <p className="text-[11px] text-emerald-400 mt-2 font-mono">
                  ✓ Selected: {form.fileName} ({form.fileSize})
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Asset Category / Delivery Type</label>
              <select
                value={form.fileType}
                onChange={(e) => setForm({ ...form, fileType: e.target.value as any })}
                className="w-full mt-1 px-3 py-2 bg-[#17152E] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              >
                <option value="GOOGLE_DRIVE">Google Drive Master Folder Link</option>
                <option value="ZIP">ZIP Master Archive (Upload / File Link)</option>
                <option value="MP4">MP4 Video Lesson / Course Video</option>
                <option value="PDF">PDF Ebook / Playbook / Guide</option>
                <option value="FOLDER">Cloud Resource / Asset Folder Link</option>
                <option value="DOCX">DOCX Word Document / Contract</option>
                <option value="XLSX">Excel / Sheet Calculator</option>
                <option value="OTHER">Other Custom Deliverable Link</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Associate with Product</label>
              <select
                value={form.associatedProductId}
                onChange={(e) => setForm({ ...form, associatedProductId: e.target.value })}
                className="w-full mt-1 px-3 py-2 bg-[#17152E] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Point 8: Google Drive link & Folder link */}
          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase flex items-center gap-1.5">
              <Globe size={14} className="text-purple-400" />
              Google Drive Folder Link
            </label>
            <input
              type="url"
              placeholder="https://drive.google.com/drive/folders/..."
              value={form.googleDriveLink}
              onChange={(e) => setForm({ ...form, googleDriveLink: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-purple-300 focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase flex items-center gap-1.5">
              <FolderLock size={14} className="text-[#22D3EE]" />
              Cloud Storage / Resource Folder URL
            </label>
            <input
              type="url"
              placeholder="https://cloud.zenovavibe.com/folders/..."
              value={form.accessFolderLink}
              onChange={(e) => setForm({ ...form, accessFolderLink: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#A7A3BC] uppercase flex items-center gap-1.5">
              <Video size={14} className="text-pink-400" />
              Video Lesson / Stream Link
            </label>
            <input
              type="url"
              placeholder="https://player.vimeo.com/video/..."
              value={form.videoLink}
              onChange={(e) => setForm({ ...form, videoLink: e.target.value })}
              className="w-full mt-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-pink-300 focus:outline-none focus:border-[#8B5CF6]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={() => setUploadModalOpen(false)}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-medium transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              Register &amp; Package Deliverable
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
