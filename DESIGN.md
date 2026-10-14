# MaxUp TutorHub — Design System Specification

## 1. Overview
MaxUp TutorHub is designed with a premium, focused tutoring atmosphere ("Warm Academic Studio") tailored for teachers and students. The interface emphasizes readability, clarity, and friction-free logging.

---

## 2. Color Palette

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Navy** | `#0B48A1` / `bg-blue-900` | Main CTA buttons, active navigation, brand headers |
| **Primary Light** | `#EFF6FF` / `bg-blue-50` | Primary callout backgrounds, active badge pills |
| **Accent Amber** | `#D97706` / `#F59E0B` | Secondary accents, syllabus badges, study streak stars |
| **Warm Canvas** | `#FFFDF7` | Page background providing eye-friendly, paper-like warmth |
| **Pure White** | `#FFFFFF` | Card backgrounds, modals, input fields |
| **Neutral Slate** | `#0F172A` / `#334155` | Primary body typography and headings |
| **Muted Slate** | `#64748B` / `#94A3B8` | Secondary labels, timestamps, placeholders |
| **Success Emerald** | `#059669` / `#10B981` | Paid status, completed lessons, verification badges |
| **Warning Orange** | `#EA580C` | Pending review alerts, slip review badges |
| **Danger Rose** | `#DC2626` | Delete actions, error banners, cancellation |

---

## 3. Typography

- **Thai Primary Font:** `Prompt` (`font-['Prompt',sans-serif]`) — clean modern geometric Thai typeface with high legibility across mobile and desktop.
- **English & Numeric:** `Plus Jakarta Sans` (`font-['Plus_Jakarta_Sans',sans-serif]`) — crisp numbers and metric counters.
- **Math & Formulas:** KaTeX rendering with display math `$$...$$` and inline math `$ ... $`.

### Type Scale & Hierarchy
- **Page Titles / Headers:** `text-xl` to `text-2xl font-black text-slate-900`
- **Section Headers:** `text-base` to `text-lg font-bold text-slate-900`
- **Card Subheadings:** `text-sm font-bold text-slate-800`
- **Body Text:** `text-xs font-normal text-slate-700 leading-relaxed`
- **Micro Badges & Metadata:** `text-[10px]` to `text-[11px] font-semibold`

---

## 4. Spacing & Shape Tokens

- **Card Corners:** `rounded-2xl` (`16px`) for primary cards and modals; `rounded-xl` (`12px`) for sub-cards and inputs.
- **Borders:** Subtle hairline borders: `border border-slate-200/90` or `border border-amber-900/10`.
- **Shadows:** Subtle modern depth: `shadow-2xs` for cards, `shadow-xl` for overlays and modals.
- **Touch Target Minimum:** All interactive buttons on mobile and desktop have at least `h-7 px-2.5` to `h-10 px-4` with cursor pointer.

---

## 5. Component Standards

### Buttons
- **Primary:** `bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl px-4 py-2 text-xs transition-all shadow-xs`
- **Secondary:** `bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 font-bold rounded-xl px-3 py-1.5 text-xs transition-all shadow-2xs`
- **Danger:** `text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors`

### Modals & Dialogs
- Backdrop: `fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto`
- Shell: `bg-[#FFFDF7] w-full max-w-2xl rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden my-8`
- Header: Sticky white header with close button `X` and descriptive subtitle.

### Print Layout (Sheet Mode)
- **Sheet Header:** Displayed only during `window.print()` with Institute name and date.
- **Print Hidden:** Navigation bars, action buttons, modals, and edit/delete icons are marked with `print:hidden`.
- **Page Breaks:** Cards styled with clean borders and page-break avoiding CSS for crisp PDF export.

---

## 6. Payment & Verification Flow
- **QR Code Generation:** Pure client-side generation using Thai PromptPay standard CRC16 payload.
- **Price Input:** Supports arbitrary custom amounts (`step="any"`, e.g., 375 THB for 1.5 hrs) with fast preset chips (`250`, `375`, `500`, `750`, `1000`).
- **Slip Upload:** Image compression and Base64 storage with offline `localStorage` fallback and Firestore persistence.
- **Status Badges:** Clearly differentiated `รอชำระเงิน` (slate/amber), `🔔 แนบสลิปแล้ว (รอตรวจ)` (amber pulse), `✓ ชำระแล้ว` (emerald).
