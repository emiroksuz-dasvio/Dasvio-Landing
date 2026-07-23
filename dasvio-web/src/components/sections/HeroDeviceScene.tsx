"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Environment, Lightformer } from "@react-three/drei";
import type { MotionValue } from "framer-motion";

/* ── Scroll timeline (mirrors HeroExperience WINDOWS — keep in sync) ──
   Each device fades/slides in over `in` and out over `out`; windows are
   sequential, so at most one device is on stage at any moment. */
const WINDOWS: { in: [number, number]; out: [number, number] }[] = [
  { in: [0.1, 0.16], out: [0.3, 0.36] },
  { in: [0.36, 0.42], out: [0.54, 0.6] },
  { in: [0.6, 0.66], out: [0.76, 0.82] },
  { in: [0.82, 0.88], out: [1.5, 1.6] },
];

/* Transition paths. Devices ARRIVE from depth (z) so they can never clip
   the right canvas edge, and EXIT to the left over the copy column — the
   only side where overflow is acceptable (they fade while crossing it). */
const ENTER_X = 1.1;
const ENTER_Z = -3.4;
const EXIT_X = -5.5;
const EXIT_Z = -1.2;

const BODY = "#101014";
const BODY_DARK = "#0b0b0f";
const ACCENT = "#f43f5e";

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export function HeroDeviceScene({
  p,
  locale,
}: {
  p: MotionValue<number>;
  locale: string;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10.6], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      {/* Neutral key/fill; rose stays a faint rim so bodies don't smear red */}
      <ambientLight intensity={0.75} />
      <hemisphereLight intensity={0.45} color="#ffffff" groundColor="#1a1a20" />
      <directionalLight position={[4, 6, 6]} intensity={1.6} />
      <pointLight position={[-6, -1, -3]} intensity={4} color={ACCENT} />
      {/* Self-contained studio reflections — no external HDR fetch */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 4, 3]} scale={[9, 2.5, 1]} />
        <Lightformer intensity={0.8} position={[5, 1, 2]} rotation-y={-Math.PI / 3} scale={[5, 2, 1]} />
        <Lightformer color={ACCENT} intensity={0.4} position={[-5, -0.5, 1]} rotation-y={Math.PI / 3} scale={[6, 2.5, 1]} />
      </Environment>

      <Rig p={p} locale={locale} />
    </Canvas>
  );
}

/* ── Rig: responsive placement + pointer parallax + choreography ── */

function Rig({ p, locale }: { p: MotionValue<number>; locale: string }) {
  const rig = useRef<THREE.Group>(null);
  const gLaptop = useRef<THREE.Group>(null);
  const gPhone = useRef<THREE.Group>(null);
  const gPos = useRef<THREE.Group>(null);
  const gKiosk = useRef<THREE.Group>(null);
  const mLaptop = useRef<THREE.MeshBasicMaterial>(null);
  const mPhone = useRef<THREE.MeshBasicMaterial>(null);
  const mPos = useRef<THREE.MeshBasicMaterial>(null);
  const mKiosk = useRef<THREE.MeshBasicMaterial>(null);
  const pointer = useThree((s) => s.pointer);

  useFrame((state) => {
    const pr = p.get();
    const t = state.clock.elapsedTime;
    const groups = [gLaptop, gPhone, gPos, gKiosk];
    const mats = [mLaptop, mPhone, mPos, mKiosk];

    if (rig.current) {
      // Whole-stage parallax follows the pointer, gently.
      rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, pointer.x * 0.09, 0.06);
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -pointer.y * 0.05, 0.06);
      // The canvas is full-bleed: park devices over the right column on
      // landscape viewports, lower-center (and smaller) on portrait.
      const { width: vw, height: vh, aspect } = state.viewport;
      const landscape = aspect > 1.05;
      rig.current.position.x = landscape ? vw * 0.24 : 0;
      rig.current.position.y = landscape ? 0 : -vh * 0.17;
      rig.current.scale.setScalar(landscape ? 1 : 0.58);
    }

    WINDOWS.forEach((w, i) => {
      const g = groups[i].current;
      if (!g) return;
      const tIn = smoothstep(w.in[0], w.in[1], pr);
      const tOut = 1 - smoothstep(w.out[0], w.out[1], pr);
      const pres = Math.min(tIn, tOut);

      const visible = pres > 0.003;
      g.visible = visible;
      const mat = mats[i].current;
      if (mat) mat.opacity = pres;
      if (!visible) return;

      // Arrive from depth (never clips the right edge), leave over the
      // copy column on the left while fading.
      const enter = 1 - tIn;
      const exit = 1 - tOut;
      const idleY = Math.sin(t * 0.8 + i * 1.7) * 0.05;
      const idleRot = Math.sin(t * 0.45 + i) * 0.035;

      g.position.x = enter * ENTER_X + exit * EXIT_X;
      g.position.z = enter * ENTER_Z + exit * EXIT_Z;
      g.position.y = idleY;
      g.rotation.y = enter * -0.55 + exit * 0.75 + idleRot;
      const s = 0.9 + 0.1 * pres;
      g.scale.setScalar(s);
    });
  });

  return (
    <group ref={rig}>
      <group ref={gLaptop}>
        <Laptop matRef={mLaptop} locale={locale} />
      </group>
      <group ref={gPhone}>
        <Phone matRef={mPhone} locale={locale} />
      </group>
      <group ref={gPos}>
        <PosTerminal matRef={mPos} locale={locale} />
      </group>
      <group ref={gKiosk}>
        <Kiosk matRef={mKiosk} locale={locale} />
      </group>
    </group>
  );
}

/* ── Shared bits ── */

/* Soft blob shadow that travels with its device — replaces a global floor
   so every device reads grounded no matter where it sits vertically. */
function BlobShadow({
  position,
  size,
  opacity = 0.45,
}: {
  position: [number, number, number];
  size: [number, number];
  opacity?: number;
}) {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,0,0,0.9)");
    grad.addColorStop(0.55, "rgba(0,0,0,0.38)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
  return (
    <mesh rotation-x={-Math.PI / 2} position={position} scale={[size[0], size[1], 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
}

function BodyMaterial({ color = BODY }: { color?: string }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.35}
      roughness={0.5}
      envMapIntensity={0.7}
    />
  );
}

/* ── Screen-as-texture ──────────────────────────────────────────────────
   The UI is painted onto an offscreen 2D canvas and mapped onto a plane.
   Pure WebGL: renders everywhere, rotates perfectly with the body and
   glows like a real display (toneMapped=false). Painted at 2× for
   sharpness. */

type Painter = (ctx: CanvasRenderingContext2D, tr: boolean) => void;

function makeScreenTexture(w: number, h: number, radius: number, tr: boolean, paint: Painter) {
  const c = document.createElement("canvas");
  c.width = w * 2;
  c.height = h * 2;
  const ctx = c.getContext("2d")!;
  ctx.scale(2, 2);
  rr(ctx, 0, 0, w, h, radius);
  ctx.clip();
  ctx.fillStyle = "#0a0a0f";
  ctx.fillRect(0, 0, w, h);
  paint(ctx, tr);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function ScreenPlane({
  matRef,
  locale,
  px,
  world,
  radius,
  paint,
  position,
}: {
  matRef: React.RefObject<THREE.MeshBasicMaterial | null>;
  locale: string;
  px: [number, number];
  world: [number, number];
  radius: number;
  paint: Painter;
  position: [number, number, number];
}) {
  const tr = locale === "tr";
  const texture = useMemo(
    () => makeScreenTexture(px[0], px[1], radius, tr, paint),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tr],
  );
  return (
    <mesh position={position}>
      <planeGeometry args={world} />
      <meshBasicMaterial ref={matRef} map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

/* ── 2D drawing helpers ── */

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

function card(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill = "rgba(255,255,255,0.05)",
  stroke: string | null = "rgba(255,255,255,0.09)",
) {
  rr(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function txt(
  ctx: CanvasRenderingContext2D,
  s: string,
  x: number,
  y: number,
  size: number,
  color: string,
  weight = 500,
  align: CanvasTextAlign = "left",
) {
  ctx.font = `${weight} ${size}px Inter, "Segoe UI", Arial, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
}

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

const WHITE = "#ffffff";
const MUT = "rgba(255,255,255,0.42)";
const FAINT = "rgba(255,255,255,0.28)";
const GREEN = "#34d399";

/* ── Screen painters ── */

const paintPanel: Painter = (ctx, tr) => {
  const W = 596;
  // header
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.moveTo(0, 40);
  ctx.lineTo(W, 40);
  ctx.stroke();
  dot(ctx, 18, 20, 3.5, "rgba(255,255,255,0.16)");
  dot(ctx, 30, 20, 3.5, "rgba(255,255,255,0.16)");
  dot(ctx, 42, 20, 3.5, "rgba(255,255,255,0.16)");
  txt(ctx, "Dasvio Panel", 56, 21, 12, WHITE, 600);
  card(ctx, W - 160, 10, 148, 20, 6, "rgba(52,211,153,0.14)", null);
  dot(ctx, W - 148, 20, 2.5, GREEN);
  txt(ctx, tr ? "Canlı · Tüm şubeler" : "Live · All branches", W - 140, 21, 10, GREEN, 600);
  // KPI cards
  const kpis: [string, string, string][] = [
    [tr ? "BUGÜNKÜ CİRO" : "TODAY'S REVENUE", "₺48.250", "▲ %12"],
    [tr ? "SİPARİŞ" : "ORDERS", "1.284", "▲ %8"],
    [tr ? "AKTİF MASA" : "ACTIVE TABLES", "36/42", ""],
  ];
  kpis.forEach((k, i) => {
    const x = 16 + i * 191;
    card(ctx, x, 52, 181, 58, 8);
    txt(ctx, k[0], x + 12, 68, 8.5, MUT, 600);
    txt(ctx, k[1], x + 12, 92, 17, WHITE, 600);
    if (k[2]) txt(ctx, k[2], x + 12 + ctx.measureText(k[1]).width + 8, 93, 10, GREEN, 600);
  });
  // chart
  card(ctx, 16, 122, 564, 92, 8, "rgba(255,255,255,0.03)");
  const bars = [42, 58, 40, 66, 52, 74, 60, 82, 68, 90, 74, 96, 80, 70, 88, 76, 94, 84];
  const bw = (564 - 24 - 17 * 5) / 18;
  bars.forEach((h, i) => {
    const bh = (h / 100) * 68;
    const x = 16 + 12 + i * (bw + 5);
    const last = i === bars.length - 1;
    ctx.globalAlpha = last ? 1 : 0.3 + (i / bars.length) * 0.55;
    rr(ctx, x, 122 + 80 - bh, bw, bh, 2.5);
    ctx.fillStyle = last ? ACCENT : "rgba(244,63,94,0.55)";
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  // order rows
  const rows: [string, string, string, string, string][] = [
    ["Masa 7", tr ? "Salon · 4" : "Dine-in · 4", "₺330", tr ? "Aktif" : "Active", "#fb7185"],
    ["Getir", tr ? "Paket · 2.1 km" : "Delivery · 2.1 km", "₺245", tr ? "Yeni" : "New", "#a78bfa"],
    ["Şube 3 · POS", "Kasa 2", "₺180", tr ? "Ödendi" : "Paid", "#22d3ee"],
  ];
  rows.forEach((r, i) => {
    const y = 226 + i * 46;
    card(ctx, 16, y, 564, 38, 8);
    card(ctx, 26, y + 8, 22, 22, 6, `${r[4]}26`, null);
    dot(ctx, 37, y + 19, 4, r[4]);
    txt(ctx, r[0], 58, y + 19, 11.5, WHITE, 600);
    ctx.font = `600 11.5px Inter, "Segoe UI", Arial, sans-serif`;
    const lw = ctx.measureText(r[0]).width;
    txt(ctx, r[1], 58 + lw + 8, y + 19, 10.5, MUT);
    txt(ctx, r[2], 500, y + 19, 11.5, WHITE, 600, "right");
    card(ctx, 512, y + 9, 56, 20, 5, "rgba(244,63,94,0.16)", null);
    txt(ctx, r[3], 540, y + 20, 9.5, "#fb7185", 600, "center");
  });
};

const paintPhone: Painter = (ctx, tr) => {
  const W = 248;
  txt(ctx, "9:41", 20, 26, 10, "rgba(255,255,255,0.6)", 600);
  txt(ctx, "●●●", W - 20, 26, 7, "rgba(255,255,255,0.45)", 400, "right");
  txt(ctx, "Bistro Kadıköy", 16, 58, 15, WHITE, 600);
  txt(ctx, tr ? "QR · 14 dil" : "QR · 14 languages", 16, 76, 9.5, MUT);
  card(ctx, W - 52, 48, 36, 20, 10, "rgba(255,255,255,0.07)");
  txt(ctx, tr ? "TR ▾" : "EN ▾", W - 34, 59, 9, WHITE, 600, "center");
  card(ctx, 16, 92, W - 32, 26, 13, "rgba(255,255,255,0.05)");
  txt(ctx, tr ? "Menüde ara..." : "Search the menu...", 28, 106, 9.5, FAINT);
  txt(ctx, tr ? "POPÜLER" : "POPULAR", 16, 136, 9, MUT, 600);
  // hero dish card
  card(ctx, 16, 148, W - 32, 122, 12, "rgba(255,255,255,0.04)");
  const grad = ctx.createLinearGradient(16, 148, W - 16, 232);
  grad.addColorStop(0, "#3f1d24");
  grad.addColorStop(0.55, "#7f1d2e");
  grad.addColorStop(1, ACCENT);
  rr(ctx, 16, 148, W - 32, 78, 12);
  ctx.fillStyle = grad;
  ctx.fill();
  txt(ctx, "Adana Dürüm", 26, 242, 12, WHITE, 600);
  txt(ctx, tr ? "Acılı · lavaş" : "Spicy · flatbread", 26, 257, 9.5, MUT);
  txt(ctx, "₺185", W - 26, 249, 12.5, ACCENT, 700, "right");
  // list items
  const items: [string, string, string, string][] = [
    ["Künefe", tr ? "Antep fıstıklı" : "With pistachio", "₺120", "#f59e0b"],
    ["Ayran", tr ? "Ev yapımı" : "Homemade", "₺35", "#38bdf8"],
  ];
  items.forEach((it, i) => {
    const y = 282 + i * 56;
    card(ctx, 16, y, W - 32, 48, 10);
    card(ctx, 24, y + 8, 32, 32, 8, `${it[3]}33`, null);
    txt(ctx, it[0], 66, y + 17, 11, WHITE, 600);
    txt(ctx, it[1], 66, y + 32, 9, MUT);
    txt(ctx, it[2], W - 62, y + 24, 11, WHITE, 600, "right");
    card(ctx, W - 52, y + 12, 24, 24, 7, ACCENT, null);
    txt(ctx, "+", W - 40, y + 25, 14, WHITE, 600, "center");
  });
  // cart bar
  card(ctx, 16, 468, W - 32, 40, 12, ACCENT, null);
  txt(ctx, tr ? "Sepet · 2 ürün" : "Cart · 2 items", 30, 488, 11, WHITE, 600);
  txt(ctx, "₺305", W - 30, 488, 12, WHITE, 700, "right");
};

const paintPos: Painter = (ctx, tr) => {
  const W = 376;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.moveTo(0, 40);
  ctx.lineTo(W, 40);
  ctx.stroke();
  txt(ctx, tr ? "Kasa 2 · Şube 3" : "Register 2 · Branch 3", 16, 21, 12, WHITE, 600);
  dot(ctx, W - 148, 20, 2.5, GREEN);
  txt(ctx, tr ? "Mutfak yazıcısı bağlı" : "Kitchen printer online", W - 140, 21, 9.5, GREEN);
  const lines: [string, string, string][] = [
    ["2×", "Adana Dürüm", "₺370"],
    ["1×", "Künefe", "₺120"],
    ["1×", "Ayran", "₺35"],
  ];
  lines.forEach((l, i) => {
    const y = 52 + i * 40;
    card(ctx, 16, y, W - 32, 32, 8);
    txt(ctx, l[0], 28, y + 16, 10.5, ACCENT, 700);
    txt(ctx, l[1], 52, y + 16, 11.5, WHITE, 600);
    txt(ctx, l[2], W - 28, y + 16, 11.5, WHITE, 600, "right");
  });
  card(ctx, 16, 176, W - 32, 36, 8, "rgba(255,255,255,0.07)", null);
  txt(ctx, tr ? "TOPLAM" : "TOTAL", 28, 194, 10, MUT, 600);
  txt(ctx, "₺525", W - 28, 194, 17, WHITE, 700, "right");
  // numpad
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"];
  keys.forEach((k, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const kw = (W - 32 - 12) / 3;
    const x = 16 + col * (kw + 6);
    const y = 222 + row * 30;
    card(ctx, x, y, kw, 24, 6, "rgba(255,255,255,0.03)", "rgba(255,255,255,0.06)");
    txt(ctx, k, x + kw / 2, y + 13, 10.5, FAINT, 500, "center");
  });
  // payment methods
  const pays = [tr ? "Kart" : "Card", tr ? "Nakit" : "Cash", "QR"];
  pays.forEach((pm, i) => {
    const pw = (W - 32 - 16) / 3;
    const x = 16 + i * (pw + 8);
    const active = i === 0;
    card(
      ctx, x, 346, pw, 40, 8,
      active ? "rgba(244,63,94,0.16)" : "rgba(255,255,255,0.04)",
      active ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.09)",
    );
    txt(ctx, pm, x + pw / 2, 366, 10.5, active ? ACCENT : "rgba(255,255,255,0.5)", 600, "center");
  });
  // pay button
  card(ctx, 16, 400, W - 32, 44, 11, ACCENT, null);
  txt(ctx, `${tr ? "Ödeme Al" : "Take payment"} · ₺525`, W / 2, 422, 13.5, WHITE, 700, "center");
};

const paintKiosk: Painter = (ctx, tr) => {
  const W = 278;
  // welcome header with rose wash
  const grad = ctx.createLinearGradient(0, 0, W, 96);
  grad.addColorStop(0, "rgba(244,63,94,0.24)");
  grad.addColorStop(0.7, "rgba(244,63,94,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, 96);
  txt(ctx, tr ? "Hoş geldiniz" : "Welcome", W / 2, 44, 19, WHITE, 600, "center");
  txt(ctx, tr ? "Sipariş için dokunun" : "Touch to order", W / 2, 68, 10, MUT, 500, "center");
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.beginPath();
  ctx.moveTo(0, 96);
  ctx.lineTo(W, 96);
  ctx.stroke();
  // categories
  const cats = tr ? ["Burgerler", "Pizzalar", "İçecekler", "Tatlılar"] : ["Burgers", "Pizzas", "Drinks", "Desserts"];
  const tints = [ACCENT, "#f59e0b", "#38bdf8", "#a78bfa"];
  cats.forEach((cat, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cw = (W - 32 - 8) / 2;
    const x = 16 + col * (cw + 8);
    const y = 110 + row * 58;
    const active = i === 0;
    card(
      ctx, x, y, cw, 50, 12,
      active ? "rgba(244,63,94,0.16)" : "rgba(255,255,255,0.04)",
      active ? "rgba(244,63,94,0.6)" : "rgba(255,255,255,0.09)",
    );
    dot(ctx, x + cw / 2, y + 17, 3, tints[i]);
    txt(ctx, cat, x + cw / 2, y + 35, 10.5, active ? ACCENT : "rgba(255,255,255,0.7)", 600, "center");
  });
  // featured product
  card(ctx, 16, 234, W - 32, 236, 12, "rgba(255,255,255,0.04)");
  const pg = ctx.createLinearGradient(16, 234, W - 16, 360);
  pg.addColorStop(0, "#42210f");
  pg.addColorStop(0.55, "#92400e");
  pg.addColorStop(1, "#f59e0b");
  rr(ctx, 16, 234, W - 32, 110, 12);
  ctx.fillStyle = pg;
  ctx.fill();
  txt(ctx, "Dasvio Burger", 28, 366, 13, WHITE, 600);
  txt(
    ctx,
    tr ? "Çift köfte · cheddar · soğan" : "Double patty · cheddar · onion",
    28, 384, 9.5, MUT,
  );
  txt(ctx, "₺185", 28, 440, 15, WHITE, 700);
  card(ctx, W - 108, 424, 92, 30, 9, ACCENT, null);
  txt(ctx, tr ? "Sepete Ekle" : "Add to cart", W - 62, 439, 10, WHITE, 700, "center");
  // pay bar
  card(ctx, 16, 494, W - 32, 42, 12, ACCENT, null);
  txt(ctx, `${tr ? "Sepet" : "Cart"} · ₺185`, 30, 515, 11, WHITE, 600);
  txt(ctx, `${tr ? "Öde" : "Pay"} →`, W - 30, 515, 11.5, WHITE, 700, "right");
};

/* ── Device models ── */

type ModelProps = {
  matRef: React.RefObject<THREE.MeshBasicMaterial | null>;
  locale: string;
};

function Laptop({ matRef, locale }: ModelProps) {
  return (
    <group position={[0, -0.15, 0]}>
      <BlobShadow position={[0, -1.6, 0.85]} size={[5.6, 3.6]} opacity={0.5} />
      {/* base / keyboard deck */}
      <RoundedBox args={[4.7, 0.15, 2.95]} radius={0.06} position={[0, -1.42, 0.85]}>
        <BodyMaterial />
      </RoundedBox>
      <mesh position={[0, -1.34, 0.75]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[4.2, 2.1]} />
        <meshStandardMaterial color={BODY_DARK} metalness={0.3} roughness={0.65} />
      </mesh>
      {/* lid, hinged at the back of the base, leaning back */}
      <group position={[0, -1.36, -0.58]} rotation-x={-0.28}>
        <RoundedBox args={[4.62, 3.05, 0.13]} radius={0.07} position={[0, 1.52, 0]}>
          <BodyMaterial color={BODY_DARK} />
        </RoundedBox>
        <ScreenPlane
          matRef={matRef}
          locale={locale}
          px={[596, 364]}
          world={[4.34, 2.65]}
          radius={10}
          paint={paintPanel}
          position={[0, 1.52, 0.075]}
        />
      </group>
    </group>
  );
}

function Phone({ matRef, locale }: ModelProps) {
  return (
    <group position={[0, 0.15, 0]}>
      <BlobShadow position={[0, -2.3, 0]} size={[2.6, 1.5]} opacity={0.28} />
      <RoundedBox args={[2.02, 4.06, 0.19]} radius={0.28}>
        <BodyMaterial />
      </RoundedBox>
      {/* side buttons */}
      <mesh position={[1.03, 0.75, 0]}>
        <boxGeometry args={[0.03, 0.55, 0.09]} />
        <BodyMaterial color="#1c1c22" />
      </mesh>
      <mesh position={[-1.03, 0.85, 0]}>
        <boxGeometry args={[0.03, 0.34, 0.09]} />
        <BodyMaterial color="#1c1c22" />
      </mesh>
      <ScreenPlane
        matRef={matRef}
        locale={locale}
        px={[248, 524]}
        world={[1.83, 3.87]}
        radius={30}
        paint={paintPhone}
        position={[0, 0, 0.1]}
      />
      {/* notch */}
      <mesh position={[0, 1.78, 0.105]}>
        <boxGeometry args={[0.62, 0.15, 0.02]} />
        <meshStandardMaterial color="#000000" roughness={0.4} />
      </mesh>
    </group>
  );
}

function PosTerminal({ matRef, locale }: ModelProps) {
  return (
    <group position={[0, 0.55, 0]}>
      <BlobShadow position={[0, -2.68, 0.25]} size={[3.6, 2.4]} opacity={0.45} />
      {/* counter base */}
      <RoundedBox args={[2.75, 0.55, 2.0]} radius={0.09} position={[0, -2.35, 0.25]}>
        <BodyMaterial />
      </RoundedBox>
      {/* receipt sliding out of the base */}
      <mesh position={[0, -2.16, 1.05]} rotation-x={-0.35}>
        <planeGeometry args={[1.05, 0.75]} />
        <meshStandardMaterial color="#e8e8e6" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* screen body leaning back on the base */}
      <group position={[0, -2.1, -0.35]} rotation-x={-0.2}>
        <RoundedBox args={[2.8, 3.55, 0.22]} radius={0.12} position={[0, 1.95, 0]}>
          <BodyMaterial color={BODY_DARK} />
        </RoundedBox>
        <ScreenPlane
          matRef={matRef}
          locale={locale}
          px={[376, 466]}
          world={[2.56, 3.17]}
          radius={14}
          paint={paintPos}
          position={[0, 1.95, 0.12]}
        />
      </group>
    </group>
  );
}

function Kiosk({ matRef, locale }: ModelProps) {
  // Slightly scaled down so the tall totem clears the fixed navbar.
  return (
    <group position={[0, -0.05, 0]} scale={0.88}>
      <BlobShadow position={[0, -3.06, 0.1]} size={[3.0, 1.9]} opacity={0.45} />
      <RoundedBox args={[2.28, 4.35, 0.2]} radius={0.1} position={[0, 0.35, 0]}>
        <BodyMaterial />
      </RoundedBox>
      <ScreenPlane
        matRef={matRef}
        locale={locale}
        px={[278, 558]}
        world={[2.0, 4.01]}
        radius={12}
        paint={paintKiosk}
        position={[0, 0.35, 0.11]}
      />
      {/* stand */}
      <mesh position={[0, -2.35, -0.05]}>
        <boxGeometry args={[0.55, 1.15, 0.3]} />
        <BodyMaterial color={BODY_DARK} />
      </mesh>
      <RoundedBox args={[1.95, 0.14, 1.1]} radius={0.05} position={[0, -2.95, 0.1]}>
        <BodyMaterial />
      </RoundedBox>
    </group>
  );
}
