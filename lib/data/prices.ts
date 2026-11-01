/**
 * RETAIL PRICES (GHS) — EDIT THIS FILE.
 *
 * No retail prices have been supplied, so this map is intentionally empty and every product
 * shows "Price awaiting configuration". Add prices by SKU, e.g.
 *
 *   'FZY-PB-500G': 55,
 *   'FZY-CP-250G': 30,
 *
 * Rules:
 *  - Amounts are in Ghana cedis (GHS), as numbers (no currency symbols).
 *  - A price must be greater than 0 to count as configured.
 *  - On the static GitHub Pages site these prices are display-only and can be inspected or
 *    changed by any visitor. A live backend must re-validate prices server-side (Blueprint §13, §19).
 *
 * SKUs follow the pattern FZY-<CODE>-<SIZE>, e.g. FZY-PB-500G, FZY-RSP-1KG.
 */
export const PRICES_GHS: Record<string, number> = {};
