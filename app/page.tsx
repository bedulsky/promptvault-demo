"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  Flame,
  Layers,
  ShoppingBag,
  Copy,
  Check,
  Heart,
  Menu,
  User,
  Zap,
  X,
  MessageCircle,
  PlusCircle,
  CheckCircle2,
} from "lucide-react";

const CATEGORIES = [
  "Semua Aset",
  "AI Video & Sora",
  "Midjourney & Visual",
  "ChatGPT & Automasi",
  "Template Notion",
  "UI Kit & Web",
];

const INITIAL_ASSETS = [
  {
    id: 1,
    title: "50+ Cinematic AI Video Prompts untuk Iklan Produk UMKM",
    creator: "@aldikreatif",
    category: "AI Video & Sora",
    tool: "Sora / Runway",
    likes: 420,
    sales: 185,
    price: "Rp 75.000",
    isBundle: true,
    samplePrompt:
      "Cinematic macro shot of artisanal coffee pouring in slow motion, warm golden hour lighting, 8k...",
    previewBg: "bg-gradient-to-br from-orange-500 via-amber-600 to-stone-900",
  },
  {
    id: 2,
    title: "Sistem Manajemen Konten & Keuangan Kreator (Notion OS)",
    creator: "@nadia.ops",
    category: "Template Notion",
    tool: "Notion",
    likes: 890,
    sales: 510,
    price: "Rp 99.000",
    isBundle: true,
    samplePrompt:
      "Template All-in-One: Content Calendar, Brand Deal Tracker, & Otomatisasi Arus Kas...",
    previewBg: "bg-gradient-to-br from-zinc-700 via-neutral-800 to-black",
  },
  {
    id: 3,
    title: "3D Isometric Brand Mascot & App Icon Generator",
    creator: "@pixelstudio",
    category: "Midjourney & Visual",
    tool: "Midjourney v6",
    likes: 615,
    sales: 310,
    price: "Rp 59.000",
    isBundle: false,
    samplePrompt:
      "3D cute minimalist mascot character holding a rocket, clay render style, soft studio lighting...",
    previewBg: "bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-950",
  },
  {
    id: 4,
    title: "AI Customer Service & Copywriting Agent Blueprint",
    creator: "@arif.ai",
    category: "ChatGPT & Automasi",
    tool: "GPT-4o / Claude",
    likes: 530,
    sales: 240,
    price: "Rp 120.000",
    isBundle: false,
    samplePrompt:
      "System prompt lengkap untuk membalas chat pembeli WhatsApp dengan gaya ramah & closing tinggi...",
    previewBg: "bg-gradient-to-br from-emerald-500 via-teal-700 to-slate-950",
  },
  {
    id: 5,
    title: "SaaS Landing Page Kit + Dark Mode Components",
    creator: "@devindo",
    category: "UI Kit & Web",
    tool: "Figma + Tailwind",
    likes: 340,
    sales: 145,
    price: "Rp 149.000",
    isBundle: true,
    samplePrompt:
      "40+ blok komponen siap pakai untuk website startup, pricing table, dan dashboard analitik...",
    previewBg: "bg-gradient-to-br from-sky-500 via-blue-700 to-slate-900",
  },
  {
    id: 6,
    title: "Cyberpunk & Neon Streetwear Mockup Pack",
    creator: "@urbanvisual",
    category: "Midjourney & Visual",
    tool: "Midjourney / Flux",
    likes: 710,
    sales: 390,
    price: "Gratis",
    isBundle: true,
    samplePrompt:
      "Editorial streetwear photography in Tokyo night rain, neon reflections, 35mm film grain...",
    previewBg: "bg-gradient-to-br from-rose-500 via-pink-700 to-purple-950",
  },
];

type AssetItem = (typeof INITIAL_ASSETS)[0];

export default function Home() {
  const [assets, setAssets] = useState<AssetItem[]>(INITIAL_ASSETS);
  const [selectedCategory, setSelectedCategory] = useState("Semua Aset");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetItem | null>(null);

  // State baru untuk tombol garis tiga, menu sidebar, like, pembelian, & form tambah aset
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"trending" | "bundle" | "purchases">("trending");
  const [purchasedIds, setPurchasedIds] = useState<number[]>([6]);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Form state untuk "Jual Karya" / "Buka Toko Gratis"
  const [newTitle, setNewTitle] = useState("");
  const [newCreator, setNewCreator] = useState("@kreatorbaru");
  const [newCategory, setNewCategory] = useState("AI Video & Sora");
  const [newTool, setNewTool] = useState("Midjourney / GPT-4");
  const [newPrice, setNewPrice] = useState("Rp 85.000");
  const [newPrompt, setNewPrompt] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("promptvault_purchases");
    if (saved) {
      setPurchasedIds(JSON.parse(saved));
    }
  }, []);

  const handleConfirmPurchase = (id: number) => {
    if (!purchasedIds.includes(id)) {
      const updated = [...purchasedIds, id];
      setPurchasedIds(updated);
      localStorage.setItem("promptvault_purchases", JSON.stringify(updated));
    }
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPrompt.trim()) return;

    const created: AssetItem = {
      id: Date.now(),
      title: newTitle,
      creator: newCreator.startsWith("@") ? newCreator : `@${newCreator}`,
      category: newCategory,
      tool: newTool,
      likes: 1,
      sales: 0,
      price: newPrice || "Gratis",
      isBundle: newTitle.toLowerCase().includes("pack") || newTitle.toLowerCase().includes("bundle"),
      samplePrompt: newPrompt,
      previewBg: "bg-gradient-to-br from-violet-600 via-indigo-700 to-zinc-900",
    };

    setAssets([created, ...assets]);
    setNewTitle("");
    setNewPrompt("");
    setIsUploadOpen(false);
    setActiveTab("trending");
    setSelectedCategory("Semua Aset");
  };

  const filteredAssets = assets.filter((item) => {
    if (activeTab === "bundle" && !item.isBundle) return false;
    if (activeTab === "purchases" && !purchasedIds.includes(item.id)) return false;

    const matchCategory =
      selectedCategory === "Semua Aset" || item.category === selectedCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* NAVBAR ATAS */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-zinc-800/80 bg-[#09090b]/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          {/* TOMBOL GARIS TIGA BERFUNGSI */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 text-zinc-200 transition hover:bg-zinc-800"
            title="Buka / Tutup Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              setActiveTab("trending");
              setSelectedCategory("Semua Aset");
            }}
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <span>
              Prompt<span className="text-violet-400">Vault</span>
            </span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="hidden w-full max-w-md items-center md:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Cari AI prompt, template Notion, atau kreator..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-800 bg-zinc-900 py-2 pl-4 pr-10 text-sm text-zinc-100 placeholder-zinc-400 focus:border-violet-500 focus:outline-none"
            />
            <Search className="absolute right-3.5 top-2.5 h-4 w-4 text-zinc-400" />
          </div>
        </div>

        {/* AKSI KANAN */}
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            <Zap className="h-4 w-4" />
            Jual Karya
          </button>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
            title="Akun Saya"
          >
            <User className="h-4 w-4" />
          </button>

          {/* DROPDOWN PROFIL */}
          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-56 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-xl">
              <p className="text-xs font-semibold text-white">Mode Demo Kreator</p>
              <p className="text-[11px] text-zinc-400">toko@promptvault.id</p>
              <div className="my-2 border-t border-zinc-800" />
              <button
                onClick={() => {
                  setActiveTab("purchases");
                  setIsProfileOpen(false);
                }}
                className="w-full rounded-lg px-2.5 py-1.5 text-left text-xs text-zinc-300 hover:bg-zinc-800"
              >
                Pembelian Saya ({purchasedIds.length})
              </button>
              <button
                onClick={() => {
                  setIsUploadOpen(true);
                  setIsProfileOpen(false);
                }}
                className="w-full rounded-lg px-2.5 py-1.5 text-left text-xs text-violet-400 hover:bg-zinc-800"
              >
                + Upload Aset Baru
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        {/* SIDEBAR KIRI (BISA DIBUKA/TUTUP DARI GARIS TIGA) */}
        {isSidebarOpen && (
          <aside className="w-60 shrink-0 border-r border-zinc-800/80 bg-[#09090b] p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("trending")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === "trending"
                    ? "bg-zinc-800/90 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Flame
                  className={`h-5 w-5 ${
                    activeTab === "trending" ? "text-violet-400" : ""
                  }`}
                />
                Trending Hari Ini
              </button>

              <button
                onClick={() => setActiveTab("bundle")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === "bundle"
                    ? "bg-zinc-800/90 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Layers
                  className={`h-5 w-5 ${
                    activeTab === "bundle" ? "text-violet-400" : ""
                  }`}
                />
                Koleksi Bundle
              </button>

              <button
                onClick={() => setActiveTab("purchases")}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  activeTab === "purchases"
                    ? "bg-zinc-800/90 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag
                    className={`h-5 w-5 ${
                      activeTab === "purchases" ? "text-violet-400" : ""
                    }`}
                  />
                  Pembelian Saya
                </span>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                  {purchasedIds.length}
                </span>
              </button>
            </nav>

            <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-950/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                Creator Monetization
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-300">
                Upload prompt atau template digital Anda dan terima pembayaran
                instan.
              </p>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="mt-3 w-full rounded-lg bg-violet-600 py-1.5 text-xs font-semibold text-white transition hover:bg-violet-500"
              >
                Buka Toko Gratis
              </button>
            </div>
          </aside>
        )}

        {/* FEED UTAMA */}
        <main className="flex-1 p-5">
          {/* JUDUL TAB AKTIF */}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-bold text-white">
              {activeTab === "trending" && "Eksplorasi Aset Digital Trending"}
              {activeTab === "bundle" && "Koleksi Paket Bundle Hemat"}
              {activeTab === "purchases" && "Aset yang Sudah Anda Dapatkan"}
            </h1>
          </div>

          {/* FILTER TAG ATAS */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-3.5 py-1.5 text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-white text-zinc-950"
                    : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* JIKA KOSONG */}
          {filteredAssets.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-10 text-center">
              <p className="text-sm text-zinc-400">
                Belum ada aset di bagian ini.
              </p>
              <button
                onClick={() => {
                  setActiveTab("trending");
                  setSelectedCategory("Semua Aset");
                  setSearchQuery("");
                }}
                className="mt-3 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500"
              >
                Lihat Semua Aset
              </button>
            </div>
          ) : (
            /* GRID PRODUK DIGITAL */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredAssets.map((item) => {
                const isLiked = likedIds.includes(item.id);
                const isPurchased = purchasedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 transition hover:border-zinc-700 hover:bg-zinc-900"
                  >
                    <div>
                      {/* PREVIEW VISUAL + SAMPLE PROMPT */}
                      <div
                        className={`relative flex h-44 flex-col justify-between p-4 ${item.previewBg}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-black/50 px-2.5 py-1 text-xs font-medium backdrop-blur">
                            {item.tool}
                          </span>
                          <button
                            onClick={() => toggleLike(item.id)}
                            className="flex items-center gap-1 rounded-md bg-black/50 px-2 py-1 text-xs text-zinc-200 backdrop-blur transition hover:bg-black/70"
                          >
                            <Heart
                              className={`h-3.5 w-3.5 ${
                                isLiked
                                  ? "fill-rose-500 text-rose-500"
                                  : "text-zinc-200"
                              }`}
                            />
                            {item.likes + (isLiked ? 1 : 0)}
                          </button>
                        </div>

                        {/* KOTAK PREVIEW PROMPT RINGKAS */}
                        <div className="rounded-lg bg-black/60 p-2.5 text-xs text-zinc-200 backdrop-blur">
                          <p className="line-clamp-2 font-mono text-[11px] text-zinc-300">
                            &quot;{item.samplePrompt}&quot;
                          </p>
                        </div>
                      </div>

                      {/* DETAIL PRODUK */}
                      <div className="p-4">
                        <h3 className="line-clamp-2 text-base font-semibold text-zinc-100 transition group-hover:text-violet-400">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          oleh {item.creator} • {item.sales} terjual
                        </p>
                      </div>
                    </div>

                    {/* FOOTER HARGA & TOMBOL AKSI */}
                    <div className="flex items-center justify-between border-t border-zinc-800/80 px-4 py-3">
                      <span className="text-base font-bold text-white">
                        {item.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(item.id, item.samplePrompt)}
                          className="flex items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
                          title="Salin contoh prompt"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                              Disalin
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Sample
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setSelectedAsset(item)}
                          className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white transition ${
                            isPurchased
                              ? "bg-emerald-600 hover:bg-emerald-500"
                              : "bg-violet-600 hover:bg-violet-500"
                          }`}
                        >
                          {isPurchased ? "Akses File" : "Beli Aset"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* MODAL CHECKOUT / AKSES FILE */}
      {selectedAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-md bg-violet-500/20 px-2 py-0.5 text-xs font-medium text-violet-300">
                  {selectedAsset.tool}
                </span>
                <h2 className="mt-2 text-lg font-bold text-white">
                  {selectedAsset.title}
                </h2>
                <p className="text-xs text-zinc-400">
                  Kreator: {selectedAsset.creator}
                </p>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Harga Aset Digital</span>
                <span className="text-lg font-bold text-white">
                  {selectedAsset.price}
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400">
                {purchasedIds.includes(selectedAsset.id)
                  ? "Aset ini sudah masuk ke daftar Pembelian Saya. Anda bisa langsung menyalin prompt lengkapnya."
                  : "Klik tombol di bawah untuk menyimpan ke Pembelian Saya atau lanjutkan order via WhatsApp."}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  handleConfirmPurchase(selectedAsset.id);
                  setSelectedAsset(null);
                  setActiveTab("purchases");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
              >
                <CheckCircle2 className="h-4 w-4" />
                Simpan ke Pembelian Saya (Demo)
              </button>
              <a
                href={`https://wa.me/6285776788058?text=${encodeURIComponent(
                  `Halo, saya mau beli aset "${selectedAsset.title}" (${selectedAsset.price}) di PromptVault.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                <MessageCircle className="h-4 w-4" />
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORM UPLOAD / JUAL KARYA */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleAddAsset}
            className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                <PlusCircle className="h-5 w-5 text-violet-400" />
                Upload Karya / Aset Baru
              </h2>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  Judul Aset / Prompt
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 30 Prompt Foto Produk Makanan..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== "Semua Aset").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Harga
                  </label>
                  <input
                    type="text"
                    placeholder="Rp 75.000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    Nama Kreator
                  </label>
                  <input
                    type="text"
                    value={newCreator}
                    onChange={(e) => setNewCreator(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-zinc-400">
                    AI Tool / Platform
                  </label>
                  <input
                    type="text"
                    value={newTool}
                    onChange={(e) => setNewTool(e.target.value)}
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-zinc-400">
                  Isi / Sample Prompt
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tulis isi atau contoh prompt di sini..."
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
              >
                Batal
              </button>
              <button
                type="submit"
                className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-500"
              >
                Publikasikan Aset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}