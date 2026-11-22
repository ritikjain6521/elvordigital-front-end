import { PURCHASE_URL } from "./constants";

export function handlePurchase(): void {
  if (PURCHASE_URL) {
    window.open(PURCHASE_URL, "_blank", "noopener,noreferrer");
  } else {
    alert(
      "Checkout is not configured yet. Please set the PURCHASE_URL in src/lib/constants.ts to enable purchases."
    );
  }
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id.replace("#", ""));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
