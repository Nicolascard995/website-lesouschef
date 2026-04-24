# Le Sous Chef — Design System (implementación)

> Referencia técnica de componentes, patrones de clase y convenciones de layout.
> Complementa `BRANDING.md` (voz, paleta, estrategia) y `CLAUDE.md` (reglas del agente).
> Fuente de verdad para tokens: `src/app/globals.css`.

---

## 1. Tokens de diseño

Definidos en `@theme` de `globals.css`. Usar siempre estos nombres, nunca valores hexadecimales hardcodeados.

### Colores

| Token             | HEX         | Uso                                           |
|-------------------|-------------|-----------------------------------------------|
| `cream`           | `#F5F0E8`   | Fondo base, texto sobre fondos oscuros        |
| `cream-dark`      | `#EDE7D9`   | Divisores, bordes, hover suave                |
| `ink`             | `#1A1814`   | Texto principal, fondos oscuros               |
| `ink-mid`         | `#3D3830`   | Párrafos secundarios                          |
| `ink-muted`       | `#8C8478`   | Metadatos, captions, texto terciario          |
| `ember`           | `#D94F2B`   | Único acento: CTAs, eyebrows, highlights      |
| `moss`            | `#3D7A4A`   | Acento escaso: estados positivos              |

### Tipografía

| Token             | Familia          | Uso                                                        |
|-------------------|------------------|------------------------------------------------------------|
| `font-display`    | Fraunces         | Titulares, quotes, momentos editoriales. Itálica para emoción. |
| `font-body`       | DM Sans          | Párrafos, UI, formularios. Pesos 300–500.                  |
| `font-mono`       | DM Mono          | Eyebrows, labels, metadatos, CTAs secundarios.             |

### Radios

| Token         | Valor  | Uso                                |
|---------------|--------|------------------------------------|
| `rounded-sm`  | `2px`  | Badges, chips                      |
| `rounded`     | `3px`  | CTAs, inputs, la mayoría de elementos |
| `rounded-md`  | `4px`  | Cards, contenedores               |
| `rounded-[28px]` | —   | Solo retratos fotográficos (excepción explícita) |

---

## 2. Layout base

```tsx
// Sección estándar
<section
  className="py-24 md:py-32 bg-cream"
  style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}
>
  <div className="max-w-[1200px] mx-auto">
    {/* contenido */}
  </div>
</section>
```

- Fondo alternante: `bg-cream` / `bg-ink` entre secciones.
- Contenedor: `max-w-[1200px]` centrado con `mx-auto`.
- Padding lateral: siempre `clamp(20px, 5vw, 80px)` — nunca valores fijos en mobile.
- Secciones oscuras usan `bg-ink` con texto `text-cream` y `text-cream/76`.

### Grid editorial asimétrico

```tsx
<div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-16 items-center">
```

Nunca 50/50 estricto. La columna de imagen va al `0.95fr`, el texto al `1.05fr`.

---

## 3. Patrones de componente

### Eyebrow (badge encima de titular)

```tsx
<p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember mb-4">
  COCINAS INDEPENDIENTES
</p>
```

Con ícono cuchillo (Hero):
```tsx
<div className="flex items-center gap-2 text-ember font-mono text-[11px] tracking-widest uppercase mb-4">
  <KnifeIcon />
  <span>{t('eyebrow')}</span>
</div>
```

Tracking varía por contexto: `tracking-[0.22em]` (sutil) · `tracking-[0.28em]` (medio) · `tracking-[0.4em]` (máximo).

### Titular H1

```tsx
<h1
  className="font-display font-normal text-cream leading-[0.97] mb-6"
  style={{ fontSize: 'clamp(40px, 5.8vw, 78px)' }}
>
  <span className="block">{t('line1')}</span>
  <span className="block italic">{t('line2')}</span>
  <span className="block">{t('line3')}</span>
</h1>
```

### Titular H2

```tsx
<h2
  className="font-display italic text-ink leading-[1.08] mb-8"
  style={{ fontSize: 'clamp(34px, 4vw, 58px)' }}
>
  {t('title')}
</h2>
```

### Párrafo cuerpo

```tsx
<p className="font-body font-light text-ink-mid leading-relaxed max-w-[620px]">
  {t('description')}
</p>
```

`leading-[1.42]` en hero · `leading-relaxed` en secciones interiores.

### Blockquote / pull quote

```tsx
<p className="border-l-2 border-ember pl-5 font-display italic text-[28px] leading-snug text-ink">
  {t('quote')}
</p>
```

### Lista de principios (sin bullets)

```tsx
<div className="mt-10 border-t border-cream-dark/90">
  {items.map((item) => (
    <div key={item} className="py-4 border-b border-cream-dark/90">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink">
        {t(item)}
      </p>
    </div>
  ))}
</div>
```

### CTA primario

```tsx
<a
  href="#contact"
  className="bg-ember text-cream text-sm font-medium px-6 py-[0.7rem] rounded-[3px] hover:opacity-90 transition-opacity"
>
  {t('cta_primary')}
</a>
```

### CTA secundario

```tsx
<a
  href="#how-it-works"
  className="border border-cream/40 text-cream bg-transparent text-sm font-medium px-6 py-[0.7rem] rounded-[3px] hover:bg-cream/10 transition-colors"
>
  {t('cta_secondary')}
</a>
```

CTAs sobre fondo claro: `border-ink/30` · `text-ink` en lugar de cream.

---

## 4. Hero — patrón canónico

Archivo: `src/components/sections/Hero.tsx`

Estructura de capas (de abajo hacia arriba):

```
z-0  video grayscale (object-cover, w-full h-full)
z-0  overlay bg-gradient-to-b from-ink/60 via-ink/55 to-ink/88
z-0  glow ember: bg-[radial-gradient(circle_at_top_right,rgba(217,79,43,0.22),transparent_36%)]
z-10 contenido
z-10 scroll indicator (motion.div, bounce suave)
```

Tamaño: `min-h-[100svh]`. Contenido en `max-w-[700px] self-center`.

---

## 5. Fotografía e imagen

```tsx
<Image
  src="/images/foto.jpg"
  alt="descripción"
  fill
  className="object-cover object-center grayscale"
/>
```

- Siempre `grayscale`. Sin excepciones salvo justificación explícita.
- Overlay encima: `bg-gradient-to-t from-ink/62 via-transparent to-ink/10`.
- Glow ember debajo del texto: `radial-gradient` a ≤22% opacidad.
- Aspecto retratos: `aspect-[3/4]`, `rounded-[28px]`, `overflow-hidden`.

---

## 6. Sistema de animaciones

### Entrada al cargar (Hero)

Clases de `globals.css`:

```css
.animate-fade-up { opacity: 0; animation: fadeUp 0.7s ease forwards; }
.d1 { animation-delay: 0.05s; }
.d2 { animation-delay: 0.18s; }
.d3 { animation-delay: 0.32s; }
.d4 { animation-delay: 0.48s; }
.d5 { animation-delay: 0.65s; }
```

Uso en Hero (cascada):
```tsx
<div className="animate-fade-up d1">eyebrow</div>
<p   className="animate-fade-up d2">label</p>
<h1  className="animate-fade-up d3">titular</h1>
<p   className="animate-fade-up d4">párrafo</p>
<div className="animate-fade-up d5">CTAs + soporte</div>
```

### Entrada por scroll (secciones interiores)

Componente: `src/components/atoms/ScrollReveal.tsx`

```tsx
<ScrollReveal mode="slide-up">
  {/* contenido */}
</ScrollReveal>

<ScrollReveal mode="zoom">
  {/* imagen o card */}
</ScrollReveal>
```

Modos disponibles: `slide-up` (texto), `zoom` (imágenes, cards).

### Animación continua (marquee)

```tsx
<div className="animate-marquee">
  {/* banda de texto o logos */}
</div>
```

Duración: 24s linear infinite.

### Motion decorativo (Framer Motion)

Solo para elementos que requieren loop continuo (scroll indicator):

```tsx
<motion.div
  animate={{ y: [0, 6, 0] }}
  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
>
```

No usar spring agresivo, bounce ni efectos de rebote.

---

## 7. Iconografía

Siempre SVG inline con:

```tsx
<svg
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
>
```

- `stroke-width: 1.5` — línea fina, nunca solid/fill.
- `aria-hidden="true"` en todos los íconos decorativos.
- Ícono firma del proyecto: `KnifeIcon` (ver `Hero.tsx:6`).

---

## 8. Textura de ruido (global)

Definida en `globals.css` como `body::after`:

```css
body::after {
  content: '';
  position: fixed; inset: 0;
  opacity: 0.022; pointer-events: none; z-index: 999;
  background-image: url("data:image/svg+xml,...fractalNoise...");
  background-size: 200px;
}
```

No eliminar ni modificar. Da la sensación táctil de papel que define el sistema visual.

---

## 9. Selección de texto

```css
::selection { background: #D94F2B; color: #F5F0E8; }
```

Siempre ember sobre cream. No sobrescribir en componentes individuales.

---

## 10. Checklist antes de mergear un componente nuevo

- [ ] Tokens correctos: ningún hex hardcodeado, todo via `text-ink`, `bg-ember`, etc.
- [ ] Fuentes: display/body/mono según rol del texto.
- [ ] Radio ≤ `rounded-md` (4px) salvo retratos (28px).
- [ ] Foto con `className="grayscale"`.
- [ ] Overlay en `ink`, glow en `ember` ≤22%.
- [ ] Animación de entrada: `animate-fade-up d1–d5` (hero) o `ScrollReveal` (secciones).
- [ ] Sin bounce, spring agresivo ni degradados multicolor.
- [ ] Copy en `src/locales/`, no hardcodeado.
- [ ] CTAs en primera persona o imperativa de beneficio.
- [ ] Padding lateral con `clamp(20px, 5vw, 80px)`.

---

_Fuente técnica_: `src/app/globals.css` · Patrones canónicos: `Hero.tsx`, `AboutSection.tsx`
