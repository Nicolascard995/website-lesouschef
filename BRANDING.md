# Le Sous Chef — Sistema de Marca

> Documento de referencia para que toda pieza que se construya (producto, landing, emails, posts, decks, material impreso) mantenga coherencia con el sitio.
> Marca padre: **DOZO TECH** · Tagline corporativa: `SYSTEMS THAT BREATHE`

---

## 1. Esencia

**Qué somos**
Software operativo para cocinas independientes. Orden para la cocina, control para el negocio.

**Qué no somos**
- No somos otra capa de burocracia.
- No reemplazamos criterio: lo estructuramos.
- No somos un SaaS de features infladas ni lenguaje corporativo.

**Banner manifiesto (tipografía mono, uppercase)**
`• COCINA REAL • SISTEMAS CLAROS • MENOS IMPROVISACIÓN • MÁS CONTROL •`

**Principio visual rector**
*Cocina real por delante. Sistemas claros por detrás.*

---

## 2. Paleta de colores

Todos los colores vienen del tema Tailwind en `src/app/globals.css`.

| Token            | HEX       | Uso principal                                                     |
|------------------|-----------|-------------------------------------------------------------------|
| `--color-cream`  | `#F5F0E8` | Fondo base claro. Color de papel/mantel. Soporte de toda la UI.   |
| `--color-cream-dark` | `#EDE7D9` | Divisores, bordes suaves, hover sobre cream.                  |
| `--color-ink`    | `#1A1814` | Texto principal, fondos oscuros, overlays sobre imagen.           |
| `--color-ink-mid`| `#3D3830` | Párrafos secundarios, descripciones, texto de apoyo.              |
| `--color-ink-muted` | `#8C8478` | Metadatos, captions, texto muy terciario.                      |
| `--color-ember` | `#D94F2B` | **Acento único.** CTAs, eyebrows, highlights, selección de texto. |
| `--color-moss`  | `#3D7A4A` | Acento secundario escaso (estados positivos, badges de éxito).    |

**Reglas**
- El `ember` es el único acento cromático de alto volumen. Nunca usar azul/rojo genérico. Nunca degradados multicolor.
- Los overlays sobre foto/video siempre se hacen con `ink` a opacidades entre 55% y 88%.
- Las fotos van **en escala de grises** (`grayscale`). El único color que pisa la foto es el glow `ember` en radial gradient.
- Evitar blanco puro (`#FFF`) y negro puro (`#000`): todo el sistema vive entre `cream` e `ink`.

**Selección de texto del sitio**
`::selection { background: #D94F2B; color: #F5F0E8; }` — mantener este patrón.

**Textura**
Ruido fractal SVG a `opacity: 0.022` cubriendo todo el viewport. Da sensación táctil, de papel. No eliminar.

---

## 3. Tipografía

Cargadas desde Google Fonts en `globals.css`.

| Token            | Familia            | Rol                                                    |
|------------------|--------------------|--------------------------------------------------------|
| `--font-display` | Instrument Serif   | Titulares, quotes, momentos editoriales. Usar en itálica cuando exprese emoción/criterio. |
| `--font-body`    | DM Sans            | Párrafos, UI, formularios. Pesos 300–500.              |
| `--font-mono`    | DM Mono            | Eyebrows, labels, metadatos, CTAs secundarios, tagline. |

**Patrones tipográficos estándar**

- **Eyebrow** (badge encima de título):
  `font-mono · text-[11px] · uppercase · tracking-[0.22em / 0.28em / 0.4em] · color ember o ink`
- **Titular H1/H2**:
  `font-display · font-normal · leading-[0.97–1.10] · clamp responsive` → ej. `clamp(34px, 4vw, 58px)`. Itálica para frases con carga emocional (“nace entre servicio y sistemas”).
- **Párrafo**:
  `font-body · font-light · leading-[1.42–1.7] · color ink-mid`. Ancho máximo ~620px.
- **CTA primario**:
  `bg-ember · text-cream · text-sm · font-medium · px-6 · py-[0.7rem] · rounded-[3px]`
- **CTA secundario**:
  `border border-cream/40 · text-cream · bg-transparent · rounded-[3px]`

**Radios**
`--radius-sm: 2px`, `--radius: 3px`, `--radius-md: 4px`. Siempre planos y casi rectos. Nada redondeado tipo consumer app.

---

## 4. Voz y tono

La marca habla como **un consultor/chef veterano que respeta al operador**. No vende humo. No usa “impulsá tu negocio con IA”. No promete transformación mágica.

### Principios de voz

1. **Directo, no agresivo.** Decir la verdad del operador (“si el salón está lleno pero la caja no sube”) antes de ofrecer solución.
2. **Cocina primero, software después.** Usar vocabulario real del oficio: brigada, servicio, escandallo, pass, food cost, inventario, recetario, chef-propietario.
3. **Criterio > Features.** Cada sección explica para qué sirve, no qué tiene.
4. **Cercanía de etapa temprana.** La marca admite que está en construcción y lo presenta como ventaja (“menos ruido comercial, más conversación útil”).
5. **Sin burocracia verbal.** Frases cortas, oraciones con sujeto claro. Evitar gerundios acumulados y corporativismo.
6. **Español rioplatense neutro aceptable.** Se usan formas como “ordená”, “entendé” en ES, pero sin marcar demasiado región. EN es funcional, seco.

### Vocabulario preferido
orden · claridad · control · margen · criterio · brigada · servicio · fuga · operación · rutina · discreción · sistemas · datos · márgenes reales.

### Vocabulario prohibido
- “Revolucioná tu restaurante”
- “Powered by AI”
- “All-in-one solution”
- “Disruptivo / innovador / game-changer”
- Emojis en copy de producto/landing.
- Exclamaciones múltiples.

### Plantillas de copy

- **Eyebrow**: 1–3 palabras, uppercase. `Cómo funciona`, `Qué incluye`, `Sobre el proyecto`.
- **Headline**: una frase breve + una explicación de 1 línea en itálica serif. Ej.: “Le Sous Chef nace *entre servicio y sistemas*.”
- **Subhead/párrafo**: 2 oraciones. La primera describe la realidad del operador. La segunda, qué hace el sistema al respecto.
- **CTA**: siempre en primera persona o imperativa de beneficio. *“Quiero que me contacten”*, *“Recuperar mi margen”*, *“Calcular pérdida”*. Nunca “Enviar” o “Submit” solos.
- **Nota legal/pie**: humana. *“Sin spam. Solo te escribimos cuando haya algo relevante para tu cocina.”*

### Tonos por contexto

| Contexto                  | Tono                                          |
|---------------------------|-----------------------------------------------|
| Landing / hero            | Editorial, sentencioso, imagen en b/n         |
| Secciones de producto     | Funcional, calmo, ordenado por pilares        |
| Formularios / waitlist    | Cercano, reduce fricción, agradece explícitamente |
| Errores / 404             | Empático, breve, salida clara                 |
| Blog / contenido          | Criterio experto, títulos provocadores pero demostrables |
| Outreach / cold email     | Seco, específico al restaurante, sin scripts genéricos |
| Redes (si se usan)        | Baja frecuencia, piezas editoriales, nunca memes |

---

## 5. Imagen y tratamiento fotográfico

- **Siempre grayscale.** Las fotos de cocina, equipo, producto pasan por `filter: grayscale(100%)`.
- **Composición editorial.** Cerca del servicio: manos, pass, brigada, luz dura. Nada de stock sonriendo a cámara.
- **Overlay `ink`** en gradient vertical de 55–88% para lectura de texto encima.
- **Glow `ember`** como único punto de color, en radial gradient sutil (≤22% opacidad) en una esquina.
- **Ratio recomendado** para retratos: 3/4 con radio 28px (el único lugar donde el radio se suaviza).
- **Movimiento**: video en loop silencioso, grayscale, sin música. Si hay animación: `fadeUp` suave 0.7s con delays escalonados (`d1–d5`).

---

## 6. Layout y composición

- **Contenedor**: `max-w-[1200px]` centrado. Paddings laterales `clamp(20px, 5vw, 80px)`.
- **Hero**: `min-h-[100svh]`, caja de contenido ≤700px sobre video en b/n.
- **Secciones**: `py-24 md:py-32`, fondo alternando `bg-cream` e `bg-ink`.
- **Grids editoriales** de 2 columnas asimétricas (`0.95fr / 1.05fr`) — nunca divididas 50/50 estricto.
- **Listas de principios**: stack vertical con divisores `border-cream-dark/90`, sin bullets.
- **Animaciones de entrada**: `ScrollReveal` con modos `slide-up` o `zoom`. Nunca rebote ni bounce.

---

## 7. Iconografía

- **Línea fina**: `stroke-width: 1.5`, `stroke-linecap: round`, `stroke-linejoin: round`.
- **Estilo**: contorno, sin relleno. Acompañan al texto, no lo reemplazan.
- **Ícono firma**: cuchillo (ver `KnifeIcon` en `Hero.tsx`). Usable como elemento decorativo en eyebrows y CTAs.
- No usar sets de íconos coloridos (Heroicons solid, Material filled, etc.).

---

## 8. Microcopy — ejemplos canónicos

| Pieza                | Ejemplo                                                                 |
|----------------------|------------------------------------------------------------------------|
| Eyebrow producto     | `COCINAS INDEPENDIENTES`                                               |
| Headline             | *Orden para la cocina. Control para el negocio.*                       |
| Subtítulo            | “Una plataforma para brigada, recetas, inventario y números pensada para dueños y chef-propietarios que siguen en el día a día del servicio.” |
| Principio            | “Pensado para cocinas independientes y pequeños grupos.”               |
| Waitlist success     | “Gracias. Recibimos tus datos. Te vamos a escribir cuando abramos acceso o tengamos algo concreto para mostrarte.” |
| 404                  | “Lo sentimos, la página que buscás no existe o fue movida.”            |
| Nota legal           | “Sin spam. Solo te escribimos cuando haya algo relevante para tu cocina.” |
| Footer tagline DOZO  | `SYSTEMS THAT BREATHE`                                                 |

---

## 9. Internacionalización

- Idiomas activos: **ES (default) · EN · DE**. Archivos en `src/locales/`.
- Toda copia nueva se escribe primero en ES con tono editorial y luego se traduce manteniendo brevedad. EN es más funcional; DE más formal.
- Los CTAs en EN usan primera persona directa: *“I want to hear from you”*, *“Reclaim my margin”*.

---

## 10. Checklist rápido para cualquier pieza nueva

Antes de publicar/mergear, la pieza debería cumplir:

- [ ] Fondo `cream` o `ink`, sin blanco/negro puros.
- [ ] Un único acento en `ember` (CTAs, highlights, eyebrow). Sin otros colores de acento.
- [ ] Titular en `Instrument Serif`, usar itálica si hay carga emocional.
- [ ] Párrafo en `DM Sans` light, ≤620px de ancho, `ink-mid`.
- [ ] Eyebrow en `DM Mono`, uppercase, tracking ancho.
- [ ] Radios entre 2–4px (excepto retratos 28px).
- [ ] Foto en grayscale con overlay `ink`.
- [ ] Copy directo, sin jerga corporativa ni emojis.
- [ ] CTA en primera persona o beneficio concreto.
- [ ] Sin promesas infladas; si es etapa temprana, decirlo.
- [ ] Animaciones `fadeUp`/`ScrollReveal` suaves, nunca bounce.

---

_Referencias técnicas_: `src/app/globals.css` (tokens), `src/components/sections/Hero.tsx` y `AboutSection.tsx` (patrones canónicos), `src/locales/es.json` (voz maestra).
