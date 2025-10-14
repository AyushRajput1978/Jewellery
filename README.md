# Jewelry Product Detail Page (Next.js 15 + TypeScript + Tailwind)

This project implements a full-featured, SEO-optimized jewelry product detail page with advanced variation handling, dynamic pricing, and intelligent availability management.

## Features

- Next.js App Router with Server Components
- TailwindCSS styling
- Dynamic variation handling with real-time availability checking
- Real-time price calculation with multipliers
- Price breakdown & related products
- SEO meta tags + JSON-LD
- Out-of-stock and backorder logic
- Intelligent variation disabling based on availability rules

## Run Locally

```bash
npm install
npm run dev
```

---

## Technical Implementation Summary

### 1. Variation and Pricing Logic

#### **Multiplier-Based Pricing System**
The pricing system uses a sophisticated multiplier approach that dynamically adjusts prices based on selected variations:

```typescript
// lib/multipliers.ts
- Gemstone multipliers: Diamond (2.5x), Sapphire (1.8x), Aquamarine (1.0x)
- Quality multipliers: Heirloom (2.5x), Best (1.8x), Better (1.3x), Good (1.0x)
- Metal multipliers: Rose Gold (1.2x), Yellow Gold (1.1x), White Gold (1.0x)
```

**Key Implementation Details:**
- **Base Price Calculation**: Starts with a base price (₹237,589) and applies multipliers sequentially
- **Rounding Strategy**: Uses `Math.round()` to ensure prices are whole numbers, avoiding decimal precision issues
- **Memoization**: Prices are recalculated only when variations change using `useMemo`, preventing unnecessary recalculations
- **Price Breakdown**: Separates metal value, stone value, and making charges for transparency

**Example Calculation:**
```
Diamond (2.5x) + Heirloom (2.5x) + Rose Gold (1.2x) = 7.5x multiplier
Base Price: ₹237,589 × 7.5 = ₹1,781,917
```

#### **Availability and Stock Management**
Implemented a two-tier availability checking system:

1. **Specific Combination Rules**: High-priority rules that check exact combinations (e.g., "Diamond + Heirloom + Size 10 = Out of Stock")
2. **Individual Stock Levels**: Fallback to per-variation stock status and backorder days

**Dynamic Variation Disabling:**
- Options are disabled in real-time based on current selections
- Visual indicators (red X badge) show unavailable options
- Tooltips provide reasons for unavailability
- Color-coded status messages (green for in-stock, yellow for backorder, red for out-of-stock)

### 2. SEO and Performance Optimization

#### **SEO Implementation**

**Server-Side Rendering (SSR):**
- All product pages are server-rendered using Next.js App Router
- Metadata is generated dynamically per product using `generateMetadata()`
- JSON-LD structured data for rich snippets (implemented via API routes)

**Performance Optimizations:**

1. **React Server Components**: Product data fetching happens on the server, reducing client-side JavaScript
2. **Memoization Strategy**:
   - Price calculations use `useMemo` to prevent recalculation on every render
   - Availability checks are memoized based on selection changes
3. **Code Splitting**: Each product page is automatically code-split by Next.js
4. **Image Optimization**: Next.js Image component handles lazy loading and responsive images
5. **API Route Caching**: Product API uses `cache: "no-store"` for fresh data but could be optimized with ISR

**Bundle Size Optimization:**
- Minimal client-side JavaScript (only interactive components are client-side)
- TailwindCSS purges unused styles in production
- Tree-shaking eliminates unused code

### 3. Tricky JavaScript and Data Scenarios

#### **Async Params Handling (Next.js 15)**
Next.js 15 introduced async params, requiring careful handling:

```typescript
export default async function ProductPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params; // Must await params in Next.js 15
  const product = await getProduct(awaitedParams.id);
  // ...
}
```

#### **Type Safety with Dynamic Variations**
Handled dynamic variation types without losing type safety:

```typescript
// variations can be string[] or number[]
variations: Record<string, string[] | number[]>

// Type-safe handling
(options as (string | number)[]).map((option) => {
  const isActive = selected[type as keyof typeof selected] === option;
  // ...
})
```

#### **Complex Availability Logic**
Implemented multi-level availability checking:

1. **Partial Matching**: Rules can specify partial combinations (e.g., just "quality: Heirloom + carat_weight: 2.0")
2. **Priority System**: Specific rules override general stock levels
3. **Fallback Logic**: If no specific rule matches, check individual stock levels
4. **Backorder Calculation**: Automatically calculates backorder time based on maximum backorder days across all selected variations

**Example Rule Matching:**
```typescript
// Checks if ALL specified fields in a rule match current selection
const matches = Object.entries(rule.combination).every(([key, value]) => {
  return selected[key] === value;
});
```

#### **Precision Handling in Price Calculations**
Avoided floating-point arithmetic issues:

```typescript
// Instead of: base * diamond * quality * metal (can cause precision errors)
// Use: Math.round() at the end
const total = Math.round(basePrice * gemstoneMultiplier * qualityMultiplier * metalMultiplier);
```

#### **State Management Without External Libraries**
Used React's built-in state management effectively:
- `useState` for selection state
- `useMemo` for derived calculations (pricing, availability)
- Props drilling for component communication (simple enough to not need Context/Redux)

#### **Dynamic Class Names with clsx**
Handled conditional styling elegantly:

```typescript
className={clsx(
  "base-classes",
  isActive && "active-classes",
  isDisabled && "disabled-classes"
)}
```

#### **Data Structure Design**
Created a flexible availability data structure that supports:
- Multiple rule types (specific combinations, stock levels)
- Extensible for future rule types
- Backward compatible (works without availability data)

```typescript
{
  rules: [{ combination: {...}, status: "...", message: "..." }],
  stock_levels: { variation_type: { option: { in_stock, backorder_days } } }
}
```

### 4. Testing the Availability Features

The implementation includes test data to verify functionality:

**Out-of-Stock Combinations:**
- Diamond + Heirloom + Size 10
- Sapphire + Best + Size 10

**Backorder Combinations:**
- Diamond + Heirloom + Size 9
- Sapphire + Heirloom (any size)
- Heirloom + 2.0 carat weight

**Individual Stock Issues:**
- Size 10 is completely out of stock (requires backorder)
- Rose Gold has 7-day backorder
- 2.0 carat has 14-day backorder

Try selecting different combinations to see the dynamic disabling and status messages in action!
