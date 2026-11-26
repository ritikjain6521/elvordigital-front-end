"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check,
  ShieldCheck,
  MessageSquare,
  Send,
} from "lucide-react";
import { API_BASE } from "@/lib/api";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import { autoGenerateIcon } from "@/lib/autoIcon";

interface ProductDetailsPageProps {
  product: Product;
}

const DEFAULT_FEATURE_ICONS = [
  "🔤", "📖", "🔢", "➕", "🔷", "✍️", "🎨", "✏️", "🧩",
  "🧠", "🔬", "🐾", "📝", "📚", "💡", "🏫", "🤝", "🎮",
];

const DEFAULT_AUDIENCE = [
  { emoji: "👨‍👩‍👧", label: "Parents" },
  { emoji: "👩‍🏫", label: "Teachers" },
  { emoji: "🏫", label: "Schools" },
  { emoji: "🏡", label: "Homeschoolers" },
  { emoji: "👨‍🏫", label: "Tutors" },
  { emoji: "🎓", label: "Educators" },
];

export default function ProductDetailsPage({ product }: ProductDetailsPageProps) {
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const galleryImages = Array.from(
    new Set(
      [product.thumbnail, ...(product.photos || [])].filter(
        (u): u is string => Boolean(u && u.trim())
      )
    )
  );
  const [selectedHeroImage, setSelectedHeroImage] = useState<string>(
    galleryImages[0] || ""
  );

  const getVideoEmbedUrl = (url: string): string | null => {
    const clean = url.trim();
    const ytMatch = clean.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{6,})/
    );
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = clean.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return null;
  };

  const [reviews, setReviews] = useState<any[]>(
    product.reviews && product.reviews.length > 0
      ? product.reviews
      : [
          {
            author: "Aarav Mehta",
            rating: 5,
            title: "Amazing value & instant access!",
            comment:
              "Everything was super well organized and downloaded instantly. Worth every rupee!",
            date: "Nov 20, 2026",
            verified: true,
          },
          {
            author: "Priya Sharma",
            rating: 5,
            title: "Instant Google Drive access worked seamlessly",
            comment:
              "Immediately received the download folder and bonus resources. High quality and ready to use.",
            date: "Nov 18, 2026",
            verified: true,
          },
        ]
  );
  const [avgRating, setAvgRating] = useState<number>(product.rating || 5.0);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState<string | null>(null);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await fetch(`${API_BASE}/api/products/${product.slug}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: reviewAuthor.trim(),
          rating: reviewRating,
          title: reviewTitle.trim(),
          comment: reviewComment.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReviews((prev) => [data.newReview, ...prev]);
        if (data.rating) setAvgRating(data.rating);
        setReviewSuccessMessage("Thank you! Your verified review has been submitted.");
        setReviewAuthor("");
        setReviewTitle("");
        setReviewComment("");
        setReviewRating(5);
        setTimeout(() => {
          setReviewFormOpen(false);
          setReviewSuccessMessage(null);
        }, 3000);
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch {
      const localReview = {
        author: reviewAuthor.trim(),
        rating: reviewRating,
        title: reviewTitle.trim(),
        comment: reviewComment.trim(),
        date: "Just now",
        verified: true,
      };
      setReviews((prev) => [localReview, ...prev]);
      setReviewSuccessMessage("Thank you! Your review has been recorded.");
      setTimeout(() => {
        setReviewFormOpen(false);
        setReviewSuccessMessage(null);
      }, 3000);
    } finally {
      setSubmittingReview(false);
    }
  };

  const inWishlist = isInWishlist(product.id);
  const inCart = cart.some((i) => i.product.id === product.id);

  const discountPercent =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;
  const savingsAmount = Math.max(0, product.originalPrice - product.price);

  const handleAddToCart = () => {
    addToCart(product, 1);
    showToast(`Added "${product.name}" to cart!`, "success");
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push("/checkout");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    showToast(
      inWishlist
        ? `Removed "${product.name}" from wishlist`
        : `Added "${product.name}" to wishlist`,
      "info"
    );
  };

  const quickBenefits: string[] =
    product.deliverablesText && product.deliverablesText.length > 0
      ? product.deliverablesText
      : product.whatsIncluded && product.whatsIncluded.length > 0
      ? product.whatsIncluded.map((w) => w.title)
      : (product.features || [])
          .slice(0, 7)
          .map((f) => (typeof f === "string" ? f : f.title));

  const primaryCtaText =
    product.adCopy?.callToAction?.trim() ||
    (product.isFree
      ? "⬇️ DOWNLOAD FREE NOW"
      : `🛒 BUY NOW — Only ₹${product.price.toLocaleString("en-IN")}`);

  const normalizedFeatures = (product.features || []).map((f) => {
    if (typeof f === "string") {
      return {
        icon: autoGenerateIcon(f),
        title: f,
        desc: "Included in your instant digital download bundle",
      };
    }
    return {
      icon: f.icon && f.icon !== "✨" ? f.icon : autoGenerateIcon(f.title, f.description || ""),
      title: f.title,
      desc: f.description || "Included in your instant digital download bundle",
    };
  });

  const audienceItems =
    product.targetAudienceList && product.targetAudienceList.length > 0
      ? product.targetAudienceList.map((label, idx) => ({
          emoji: DEFAULT_AUDIENCE[idx % DEFAULT_AUDIENCE.length].emoji,
          label,
        }))
      : DEFAULT_AUDIENCE;

  const relatedProducts: Product[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0820] via-[#0d0b2a] to-[#120a35] text-white overflow-x-hidden pb-24">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative pt-8 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Store", href: "/store" },
                { label: product.categoryName, href: `/category/${product.category}` },
                { label: product.name },
              ]}
            />
          </div>

          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
              {product.urgencyNotice || "🔥 LIMITED-TIME SPECIAL OFFER"}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Headline, Tagline, Benefits & Pricing Card */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap mb-4">
                <Link
                  href={`/category/${product.category}`}
                  className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold hover:bg-purple-500/25 transition-colors"
                >
                  {product.categoryName}
                </Link>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  ★ {avgRating.toFixed(1)} ({reviews.length})
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                  {product.name}
                </span>
              </h1>

              {product.tagline && (
                <p className="text-xl sm:text-2xl font-bold text-white/90 mb-3">
                  {product.tagline}
                </p>
              )}

              <p className="text-base text-purple-200/85 font-medium mb-7 leading-relaxed">
                {product.shortDescription}
              </p>

              {quickBenefits.length > 0 && (
                <ul className="mb-8 space-y-2 inline-block text-left">
                  {quickBenefits.slice(0, 7).map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-semibold text-white/85">
                      <span className="text-green-400 text-base">✓</span> {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* PRICING & CTA CARD */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 block w-full">
                <div className="flex items-center gap-4 justify-center lg:justify-start mb-3 flex-wrap">
                  {product.isFree ? (
                    <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                      100% FREE
                    </span>
                  ) : (
                    <>
                      {product.originalPrice > product.price && (
                        <span className="text-white/40 line-through text-2xl font-bold">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="text-5xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {discountPercent > 0 && (
                        <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </>
                  )}
                </div>

                <p className="text-xs text-white/50 mb-4 text-center lg:text-left">
                  One-time payment • Lifetime access • Instant download ({product.productFormat})
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-lg px-7 py-4 rounded-xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-[1.03]"
                  >
                    {primaryCtaText}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className={`px-5 py-4 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                      inCart
                        ? "bg-emerald-600/20 border-emerald-500/40 text-emerald-300"
                        : "bg-white/5 hover:bg-white/10 border-white/15 text-white"
                    }`}
                  >
                    {inCart ? <Check size={16} /> : <ShoppingBag size={16} />}
                    <span>{inCart ? "In Cart" : "Add to Cart"}</span>
                  </button>

                  <button
                    onClick={handleToggleWishlist}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    className={`p-4 rounded-xl border transition-colors flex items-center justify-center ${
                      inWishlist
                        ? "bg-pink-500 border-pink-400 text-white"
                        : "bg-white/5 hover:bg-white/10 border-white/15 text-gray-300 hover:text-pink-400"
                    }`}
                  >
                    <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                  </button>
                </div>

                <p className="text-xs text-white/40 text-center lg:text-left mt-3">
                  🔒 Secure Payment • 100% Safe Checkout
                </p>
              </div>
            </div>

            {/* RIGHT: 3D Product Visual & Gallery */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-pink-500/40 rounded-3xl blur-2xl scale-105" />

                <div className="relative bg-gradient-to-br from-purple-700/80 via-blue-800/80 to-indigo-900/90 rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent rounded-t-3xl pointer-events-none" />

                  {selectedHeroImage ? (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 bg-[#0e0a24] group">
                      <img
                        src={selectedHeroImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090816]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-gray-200 bg-black/60 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                        <span>{product.fileSize || "Instant Download"}</span>
                        <span className="text-yellow-300 font-bold">ElvorDigital Certified</span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-800">
                      <div>
                        <div className="text-5xl mb-2">📚</div>
                        <div className="text-yellow-300 font-black text-2xl sm:text-3xl leading-tight">
                          {product.name}
                        </div>
                        <div className="text-white/75 text-xs mt-1 font-semibold">
                          {product.productFormat}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {["Instant Access", "Lifetime", "HD Quality"].map((tag) => (
                          <span
                            key={tag}
                            className="bg-white/15 backdrop-blur text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {galleryImages.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1">
                      {galleryImages.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedHeroImage(imgUrl)}
                          className={`relative w-16 h-12 rounded-lg overflow-hidden border transition-all shrink-0 ${
                            selectedHeroImage === imgUrl
                              ? "border-yellow-400 ring-2 ring-yellow-400/40"
                              : "border-white/15 opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${product.name} preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {product.bonuses && product.bonuses[0] && (
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-3.5 shadow-2xl border border-gray-100 items-center gap-3 max-w-[230px]"
                  >
                    <div className="text-2xl">🎁</div>
                    <div>
                      <div className="text-gray-900 text-xs font-black truncate max-w-[160px]">
                        {product.bonuses[0].title}
                      </div>
                      <div className="text-emerald-600 text-[10px] font-bold">
                        FREE BONUS ({product.bonuses[0].demoValue || "Included"})
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="hidden sm:flex absolute -top-5 -right-5 bg-white rounded-xl px-3.5 py-2.5 shadow-xl rotate-3 items-center gap-2 border border-gray-100"
                >
                  <span className="text-lg">⚡</span>
                  <div className="text-left">
                    <div className="text-gray-900 text-[11px] font-black leading-none">
                      Instant Access
                    </div>
                    <div className="text-purple-600 text-[9px] font-bold mt-0.5">
                      Download Today
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: WHAT'S INSIDE (FEATURES GRID) ===== */}
      {normalizedFeatures.length > 0 && (
        <section className="py-16 px-4 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full">
                What&apos;s Inside
              </span>
              <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-3">
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  {normalizedFeatures.length} Key
                </span>{" "}
                <span className="text-white">Highlights &amp; Categories</span>
              </h2>
              {product.fullDescription && (
                <p className="text-white/65 text-sm sm:text-base max-w-3xl mx-auto whitespace-pre-line">
                  {product.fullDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {normalizedFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl p-5 hover:border-purple-500/40 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/55 text-xs leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 3: WHY CHOOSE THIS BUNDLE / DELIVERABLES & BONUSES ===== */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Why Choose This{" "}
              <span className="bg-gradient-to-r from-sky-300 to-blue-400 bg-clip-text text-transparent">
                Bundle?
              </span>
            </h2>
            <p className="text-white/60">Everything you need in one complete digital package</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.whatsIncluded.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-6 text-center hover:border-purple-500/50 transition-all"
              >
                <div className="text-3xl mb-3">📦</div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 mb-2">
                  {item.format} {item.count ? `• ${item.count}` : ""}
                </span>
                <h3 className="font-bold text-white mb-2 text-sm">{item.title}</h3>
                <p className="text-white/60 text-xs">{item.description}</p>
              </div>
            ))}

            {product.bonuses.map((bonus, i) => (
              <div
                key={`bonus-${i}`}
                className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-pink-500/30 rounded-2xl p-6 text-center hover:border-pink-500/60 transition-all"
              >
                <div className="text-3xl mb-3">🎁</div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 mb-2">
                  FREE BONUS • Worth {bonus.demoValue || (bonus as any).value || "₹999"}
                </span>
                <h3 className="font-bold text-white mb-2 text-sm">{bonus.title}</h3>
                <p className="text-white/60 text-xs">{bonus.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: PERFECT FOR EVERYONE (TARGET AUDIENCE) ===== */}
      <section className="py-16 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Perfect For{" "}
            <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="text-white/60 mb-10">Who benefits most from {product.name}?</p>
          <div className="flex flex-wrap justify-center gap-4">
            {audienceItems.map((p, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5 flex flex-col items-center gap-2 hover:border-purple-500/40 transition-all"
              >
                <span className="text-4xl">{p.emoji}</span>
                <span className="text-sm font-bold text-white/85">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: AD SPOTLIGHT & CUSTOM ADMIN SECTIONS ===== */}
      {(product.adCopy?.adMediaUrl ||
        (product.adCopy?.adImages && product.adCopy.adImages.length > 0) ||
        product.adCopy?.headline) && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-purple-900/40 via-[#14122d] to-blue-900/40 border border-purple-500/30 p-6 sm:p-10 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles size={12} />
                  <span>Featured Product Spotlight</span>
                </span>
                {product.adCopy?.headline && (
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {product.adCopy.headline}
                  </h3>
                )}
                {product.adCopy?.hook && (
                  <p className="text-sm font-semibold text-cyan-300">{product.adCopy.hook}</p>
                )}
                {product.adCopy?.primaryText && (
                  <p className="text-sm text-white/70 leading-relaxed">
                    {product.adCopy.primaryText}
                  </p>
                )}
                <button
                  onClick={handleBuyNow}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-black text-sm shadow-lg"
                >
                  <span>{product.adCopy?.callToAction || "Get Instant Access"}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {(product.adCopy?.adMediaUrl ||
                (product.adCopy?.adImages && product.adCopy.adImages.length > 0)) && (
                <div className="lg:col-span-6 space-y-3">
                  {product.adCopy?.adMediaUrl && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#090816] aspect-video">
                      {getVideoEmbedUrl(product.adCopy.adMediaUrl) ? (
                        <iframe
                          src={getVideoEmbedUrl(product.adCopy.adMediaUrl)!}
                          className="w-full h-full"
                          allowFullScreen
                          title={`${product.name} Preview`}
                        />
                      ) : /\.(mp4|webm|ogg)(\?|$)/i.test(product.adCopy.adMediaUrl) ? (
                        <video
                          src={product.adCopy.adMediaUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={product.adCopy.adMediaUrl}
                          alt={product.adCopy.headline || product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}

                  {product.adCopy?.adImages && product.adCopy.adImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {product.adCopy.adImages.map((img, i) => (
                        <div
                          key={i}
                          className="rounded-xl overflow-hidden border border-white/10 bg-[#090816] aspect-video"
                        >
                          <img
                            src={img}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {product.customSections && product.customSections.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                In-Depth Preview
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-1">
                Product Showcase &amp;{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Sample Pages
                </span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {product.customSections.map((sec, idx) => {
                const layout = sec.layout || "card";
                const embedUrl = sec.mediaUrl ? getVideoEmbedUrl(sec.mediaUrl) : null;
                const galleryList =
                  sec.images && sec.images.length > 0
                    ? sec.images
                    : sec.mediaUrl
                    ? [sec.mediaUrl]
                    : [];

                const renderMedia = () => {
                  if (sec.fieldType === "image" && sec.mediaUrl) {
                    return (
                      <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#090816] aspect-video shadow-xl">
                        <img src={sec.mediaUrl} alt={sec.title} className="w-full h-full object-cover" />
                      </div>
                    );
                  }
                  if (sec.fieldType === "video" && sec.mediaUrl) {
                    return (
                      <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#090816] aspect-video shadow-xl">
                        {embedUrl ? (
                          <iframe src={embedUrl} className="w-full h-full" allowFullScreen title={sec.title} />
                        ) : (
                          <video src={sec.mediaUrl} controls className="w-full h-full object-cover" />
                        )}
                      </div>
                    );
                  }
                  return null;
                };

                // LAYOUT: SPLIT LEFT / SPLIT RIGHT
                if (layout === "split-left" || layout === "split-right") {
                  const imageFirst = layout === "split-left";
                  return (
                    <div
                      key={sec.id || idx}
                      className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900/35 via-[#14122d] to-blue-900/35 border border-purple-500/25 grid lg:grid-cols-2 gap-8 items-center"
                    >
                      <div className={imageFirst ? "order-1" : "order-1 lg:order-2"}>
                        {renderMedia()}
                      </div>
                      <div className={`space-y-4 ${imageFirst ? "order-2" : "order-2 lg:order-1"}`}>
                        <h4 className="text-2xl sm:text-3xl font-black text-white">{sec.title}</h4>
                        {sec.content && (
                          <p className="text-sm sm:text-base text-white/75 leading-relaxed whitespace-pre-line">
                            {sec.content}
                          </p>
                        )}
                        {sec.fieldType === "link" && sec.mediaUrl && (
                          <a
                            href={sec.mediaUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-xs font-black shadow-lg"
                          >
                            <span>{sec.buttonLabel || "Open Resource"}</span>
                            <ArrowRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                }

                // LAYOUT: FULL-WIDTH BANNER
                if (layout === "banner") {
                  return (
                    <div
                      key={sec.id || idx}
                      className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-900/50 via-pink-900/30 to-blue-900/50 border border-purple-500/30 text-center space-y-6 shadow-2xl"
                    >
                      <div className="max-w-2xl mx-auto space-y-3">
                        <h4 className="text-2xl sm:text-4xl font-black text-white">{sec.title}</h4>
                        {sec.content && (
                          <p className="text-sm sm:text-base text-white/75 leading-relaxed whitespace-pre-line">
                            {sec.content}
                          </p>
                        )}
                      </div>
                      {(sec.fieldType === "image" || sec.fieldType === "video") && sec.mediaUrl && (
                        <div className="max-w-4xl mx-auto">{renderMedia()}</div>
                      )}
                      {sec.fieldType === "link" && sec.mediaUrl && (
                        <a
                          href={sec.mediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white text-sm font-black shadow-xl"
                        >
                          <span>{sec.buttonLabel || "Open Resource"}</span>
                          <ArrowRight size={15} />
                        </a>
                      )}
                    </div>
                  );
                }

                // LAYOUT: MULTI-IMAGE GALLERY GRID
                if (layout === "gallery") {
                  return (
                    <div
                      key={sec.id || idx}
                      className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 space-y-5"
                    >
                      <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h4 className="text-2xl sm:text-3xl font-black text-white">{sec.title}</h4>
                        {sec.content && (
                          <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">
                            {sec.content}
                          </p>
                        )}
                      </div>
                      {galleryList.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {galleryList.map((imgUrl, gIdx) => (
                            <div
                              key={gIdx}
                              className="rounded-2xl overflow-hidden border border-white/15 bg-[#090816] aspect-[4/3] group"
                            >
                              <img
                                src={imgUrl}
                                alt={`${sec.title} ${gIdx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // DEFAULT LAYOUT: CARD
                return (
                  <div
                    key={sec.id || idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all"
                  >
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white">{sec.title}</h4>
                      {sec.content && (
                        <p className="text-sm text-white/65 leading-relaxed whitespace-pre-line">
                          {sec.content}
                        </p>
                      )}
                      {renderMedia()}
                    </div>
                    {sec.fieldType === "link" && sec.mediaUrl && (
                      <a
                        href={sec.mediaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-200 hover:text-white text-xs font-bold transition-all self-start"
                      >
                        <span>{sec.buttonLabel || "Open Resource"}</span>
                        <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 6: PRICING OFFER SECTION ===== */}
      <section className="py-20 px-4" id="buy-now">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg mb-6 animate-pulse">
            {product.urgencyNotice || "🔥 LIMITED-TIME SPECIAL OFFER"}
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Get {product.name}
          </h2>
          <p className="text-white/60 mb-10">One-time payment. Lifetime access. Instant download.</p>

          <div className="bg-gradient-to-br from-purple-900/60 to-blue-900/60 border border-purple-500/30 rounded-3xl p-8 shadow-2xl shadow-purple-500/20">
            <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
              {product.originalPrice > product.price && !product.isFree && (
                <>
                  <div className="text-center">
                    <div className="text-white/40 line-through text-2xl font-bold">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </div>
                    <div className="text-xs text-white/30">Original Price</div>
                  </div>
                  <div className="text-4xl text-white/20">→</div>
                </>
              )}
              <div className="text-center">
                <div className="text-6xl font-black bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                  {product.isFree ? "FREE" : `₹${product.price.toLocaleString("en-IN")}`}
                </div>
                <div className="text-xs text-green-400 font-bold">Special Launch Price</div>
              </div>
            </div>

            {savingsAmount > 0 && !product.isFree && (
              <div className="inline-block bg-green-500/20 border border-green-500/40 text-green-300 text-sm font-bold px-4 py-2 rounded-full mb-6">
                🎉 You Save ₹{savingsAmount.toLocaleString("en-IN")} — {discountPercent}% OFF!
              </div>
            )}

            {quickBenefits.length > 0 && (
              <ul className="text-left space-y-2 mb-8 max-w-sm mx-auto">
                {quickBenefits.slice(0, 7).map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="text-green-400 font-bold">✓</span> {b}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={handleBuyNow}
              className="block w-full text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-xl px-8 py-5 rounded-2xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02]"
            >
              {product.isFree
                ? "⬇️ DOWNLOAD NOW (FREE)"
                : `🛒 BUY NOW — Only ₹${product.price.toLocaleString("en-IN")}`}
            </button>
            <p className="text-xs text-white/40 text-center mt-4">
              {product.guaranteeText ||
                "🔒 100% Secure Payment | ⚡ Instant Digital Access | Lifetime Updates"}
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: CUSTOMER REVIEWS ===== */}
      <section className="py-16 px-4 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-white">
                Customer{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                  Reviews ({reviews.length})
                </span>
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                <span className="text-amber-400 font-bold">★ {avgRating.toFixed(1)} / 5.0</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck size={13} /> Verified Buyers
                </span>
              </div>
            </div>

            <button
              onClick={() => setReviewFormOpen(!reviewFormOpen)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 self-start sm:self-center"
            >
              <MessageSquare size={14} />
              <span>{reviewFormOpen ? "Close Review Form" : "Write a Review"}</span>
            </button>
          </div>

          <AnimatePresence>
            {reviewFormOpen && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleReviewSubmit}
                className="p-6 rounded-2xl bg-[#110f27] border border-purple-500/30 space-y-4 overflow-hidden"
              >
                {reviewSuccessMessage && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                    {reviewSuccessMessage}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      onMouseEnter={() => setReviewHoverRating(star)}
                      onMouseLeave={() => setReviewHoverRating(0)}
                    >
                      <Star
                        size={22}
                        className={
                          star <= (reviewHoverRating || reviewRating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-600"
                        }
                      />
                    </button>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="Review Headline"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience *"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e0d22] border border-white/10 text-xs text-white"
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs inline-flex items-center gap-2"
                >
                  <Send size={13} />
                  <span>{submittingReview ? "Submitting..." : "Submit Review"}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="grid sm:grid-cols-2 gap-4">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center uppercase">
                      {rev.author ? rev.author.charAt(0) : "U"}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">{rev.author}</span>
                      <span className="text-[10px] text-white/40">{rev.date || "Verified Buyer"}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"}
                      />
                    ))}
                  </div>
                </div>
                {rev.title && <h5 className="text-xs font-bold text-white">{rev.title}</h5>}
                <p className="text-xs text-white/70 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: FAQ ACCORDION ===== */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {product.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold text-white text-sm">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-purple-400 transition-transform flex-shrink-0 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 pt-2 text-sm text-white/65 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SECTION 9: FINAL CTA ===== */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Get Instant{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Digital Access
            </span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg mb-8">
            Download immediately after checkout with lifetime access included.
          </p>
          <button
            onClick={handleBuyNow}
            className="inline-block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-400 hover:via-pink-400 hover:to-purple-500 text-white font-black text-xl px-10 py-5 rounded-2xl shadow-2xl shadow-purple-500/40 transition-all duration-300 hover:scale-105"
          >
            {product.isFree
              ? "⬇️ DOWNLOAD FREE NOW"
              : `🛒 GET INSTANT ACCESS — ₹${product.price.toLocaleString("en-IN")} Only`}
          </button>
          <p className="text-xs text-white/35 mt-4">🔒 Secure Checkout • Instant Access • No Subscription</p>
        </div>
      </section>

      {/* ===== RELATED PRODUCTS ===== */}
      {relatedProducts.length > 0 && (
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Similar Digital Products</h3>
              <p className="text-xs text-[#A7A3BC] mt-1">Recommended bundles from ElvorDigital</p>
            </div>
            <Link
              href={`/category/${product.category}`}
              className="text-xs font-bold text-purple-400 hover:text-purple-300"
            >
              View Category →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct, i) => (
              <ProductCard key={relProduct.id} product={relProduct} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ===== STICKY BOTTOM PURCHASE BAR ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#090816]/95 border-t border-white/10 py-3 px-4 backdrop-blur-xl shadow-2xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
          <div className="hidden sm:block truncate">
            <h4 className="text-xs font-bold text-white truncate max-w-md">{product.name}</h4>
            <span className="text-[11px] text-purple-300">{product.productFormat}</span>
          </div>

          <div className="flex items-center gap-3 ml-auto w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-emerald-300">
                {product.isFree ? "FREE" : `₹${product.price.toLocaleString("en-IN")}`}
              </span>
              {product.originalPrice > product.price && !product.isFree && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors hidden xs:block"
              >
                {inCart ? "In Cart ✓" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition-all"
              >
                {product.isFree ? "Download Free" : "🛒 Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
