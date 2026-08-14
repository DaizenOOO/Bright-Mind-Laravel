# Functional Animated Mega-Menu Wireframe

A reusable React + TypeScript + Tailwind CSS + Framer Motion navigation system inspired by the supplied layout references, using neutral content and replaceable assets.

## Run

```bash
npm install
npm run dev
```

## Main files

- `src/components/Navigation/MegaNavigation.tsx`
- `src/components/Navigation/DesktopNavigation.tsx`
- `src/components/Navigation/MobileNavigation.tsx`
- `src/components/Navigation/DropdownShell.tsx`
- `src/components/Navigation/NavigationTrigger.tsx`
- `src/components/Navigation/MediaPlaceholder.tsx`
- `src/components/Navigation/navigation.data.ts`
- `src/components/Navigation/navigation.types.ts`
- `src/components/Navigation/navigation.motion.ts`
- `src/components/Navigation/panels/*`

## Replace content and assets

Edit `navigation.data.ts`. All labels, links, cards, events, and asset paths live there. Put replacement files in `public/placeholders` or point the `assets` object at another public URL.

The placeholder image files are intentionally empty. `MediaPlaceholder` displays the replacement guidance overlay until valid images are supplied.
