import { useState, useEffect, useRef } from "react";
import IMG_HANDS from '../assets/shared-layout-asset-2.png';
import IMG_CASSETTE from '../assets/shared-layout-asset-1.png';

const items = [
  { id: 1, name: "Skilled Fingers Series", price: "0.855", token: "#209", bg: "#e8d5f5", img: IMG_HANDS },
  { id: 2, name: "Vibrant Vibes Series", price: "0.209", token: "#808", bg: "#dbeafe", img: IMG_CASSETTE },
];

const GoldDiamond = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <polygon points="7,1 13,5 13,9 7,13 1,9 1,5" fill="#f5c842" />
  </svg>
);

const ListIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill={color}>
    <rect x="0" y="2" width="4" height="4" rx="1" /><rect x="6" y="2" width="12" height="4" rx="1" />
    <rect x="0" y="8" width="4" height="4" rx="1" /><rect x="6" y="8" width="12" height="4" rx="1" />
    <rect x="0" y="14" width="4" height="2" rx="1" /><rect x="6" y="14" width="12" height="2" rx="1" />
  </svg>
);

const CardIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill={color}>
    <rect x="0" y="0" width="7" height="7" rx="1.5" /><rect x="11" y="0" width="7" height="7" rx="1.5" />
    <rect x="0" y="11" width="7" height="7" rx="1.5" /><rect x="11" y="11" width="7" height="7" rx="1.5" />
  </svg>
);

const PackIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke={color} strokeWidth="1.5">
    <circle cx="9" cy="9" r="8" />
    <path d="M9 4 C9 4 13 7 13 10 C13 12.2 11.2 14 9 14 C6.8 14 5 12.2 5 10 C5 7 9 4 9 4Z" />
  </svg>
);

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

function AnimatedView({ children, viewKey }) {
  const [displayed, setDisplayed] = useState(children);
  const [visible, setVisible] = useState(true);
  const prevKey = useRef(viewKey);

  useEffect(() => {
    if (prevKey.current !== viewKey) {
      setVisible(false);
      const timer = setTimeout(() => {
        setDisplayed(children);
        setVisible(true);
        prevKey.current = viewKey;
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setDisplayed(children);
    }
  }, [viewKey, children]);

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0px)" : "translateY(12px)",
      transition: "opacity 0.25s ease, transform 0.25s ease",
    }}>
      {displayed}
    </div>
  );
}

function CardView({ items, t }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
      {items.map((item, index) => (
        <div key={item.id} style={{
          background: t.cardBg,
          border: `1px solid ${t.cardBorder}`,
          borderRadius: "20px",
          padding: "12px",
          animation: `fadeSlideUp 0.3s ease both`,
          animationDelay: `${index * 80}ms`,
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "pointer",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = t.cardHoverShadow; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <div style={{ background: item.bg, borderRadius: "14px", height: "200px", overflow: "hidden", marginBottom: "14px" }}>
            <img src={item.img} alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              onMouseEnter={e => e.target.style.transform = "scale(1.07)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            />
          </div>
          <div style={{ fontWeight: "700", fontSize: "16px", color: t.text, marginBottom: "8px" }}>{item.name}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontWeight: "800", fontSize: "16px", color: t.text }}>
              {item.price} <span style={{ fontWeight: "400", color: t.muted, fontSize: "13px" }}>ETH</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }}>
              <GoldDiamond />
              <span style={{ fontWeight: "700", color: t.muted, fontSize: "13px" }}>{item.token}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListView({ items, t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {items.map((item, index) => (
        <div key={item.id} style={{
          display: "flex", alignItems: "center", gap: "16px",
          padding: "12px 16px",
          borderRadius: "16px",
          background: t.cardBg,
          border: `1px solid ${t.cardBorder}`,
          animation: `fadeSlideUp 0.3s ease both`,
          animationDelay: `${index * 80}ms`,
          transition: "background 0.2s ease, transform 0.2s ease",
          cursor: "pointer",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = t.rowHover; e.currentTarget.style.transform = "translateX(4px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = t.cardBg; e.currentTarget.style.transform = "translateX(0)"; }}
        >
          <div style={{ background: item.bg, borderRadius: "12px", width: "80px", height: "80px", overflow: "hidden", flexShrink: 0 }}>
            <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "700", fontSize: "16px", color: t.text, marginBottom: "4px" }}>{item.name}</div>
            <div style={{ fontWeight: "800", fontSize: "15px", color: t.text }}>
              {item.price} <span style={{ fontWeight: "400", color: t.muted, fontSize: "13px" }}>ETH</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <GoldDiamond />
            <span style={{ fontWeight: "700", color: t.muted, fontSize: "14px" }}>{item.token}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PackView({ items, t }) {
  const total = items.reduce((sum, i) => sum + parseFloat(i.price), 0).toFixed(3);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", animation: "fadeSlideUp 0.3s ease both" }}>
      <div style={{ position: "relative", width: "200px", height: "200px", marginBottom: "32px" }}>
        {items.map((item, i) => (
          <div key={item.id} style={{
            position: "absolute", width: "155px", height: "155px",
            borderRadius: "24px", background: item.bg, overflow: "hidden",
            left: `${i * 24}px`, top: `${i * 24}px`,
            boxShadow: t.packShadow,
            zIndex: items.length - i,
            animation: `fadeSlideUp 0.3s ease both`,
            animationDelay: `${i * 80}ms`,
          }}>
            <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
      <div style={{ fontWeight: "700", fontSize: "22px", color: t.text, marginBottom: "6px" }}>{items.length} Collectibles</div>
      <div style={{ fontWeight: "800", fontSize: "20px", color: t.text }}>
        {total} <span style={{ fontWeight: "400", color: t.muted }}>ETH</span>
      </div>
    </div>
  );
}

const views = [
  { id: "list", label: "List view", Icon: ListIcon },
  { id: "card", label: "Card view", Icon: CardIcon },
  { id: "pack", label: "Pack view", Icon: PackIcon },
];

const darkTheme = {
  pageBg: "linear-gradient(135deg, #0f0f13 0%, #1a1a2e 50%, #0f0f13 100%)",
  containerBg: "rgba(255,255,255,0.06)",
  containerBorder: "rgba(255,255,255,0.1)",
  containerShadow: "0 24px 80px rgba(0,0,0,0.5)",
  tabBarBg: "rgba(255,255,255,0.05)",
  tabBarBorder: "rgba(255,255,255,0.08)",
  tabInactiveColor: "rgba(255,255,255,0.45)",
  divider: "rgba(255,255,255,0.08)",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.4)",
  cardBg: "rgba(255,255,255,0.05)",
  cardBorder: "rgba(255,255,255,0.1)",
  cardHoverShadow: "0 12px 40px rgba(0,0,0,0.3)",
  rowHover: "rgba(255,255,255,0.09)",
  packShadow: "0 8px 32px rgba(0,0,0,0.4)",
  toggleBg: "rgba(255,255,255,0.1)",
  toggleBorder: "rgba(255,255,255,0.15)",
  toggleColor: "#fff",
  titleGradient: "linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
};

const lightTheme = {
  pageBg: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f0f4ff 100%)",
  containerBg: "rgba(255,255,255,0.9)",
  containerBorder: "rgba(0,0,0,0.08)",
  containerShadow: "0 24px 80px rgba(0,0,0,0.1)",
  tabBarBg: "rgba(0,0,0,0.04)",
  tabBarBorder: "rgba(0,0,0,0.06)",
  tabInactiveColor: "rgba(0,0,0,0.45)",
  divider: "rgba(0,0,0,0.08)",
  text: "#111111",
  muted: "rgba(0,0,0,0.35)",
  cardBg: "rgba(0,0,0,0.03)",
  cardBorder: "rgba(0,0,0,0.07)",
  cardHoverShadow: "0 12px 40px rgba(0,0,0,0.1)",
  rowHover: "rgba(0,0,0,0.06)",
  packShadow: "0 8px 32px rgba(0,0,0,0.12)",
  toggleBg: "rgba(0,0,0,0.07)",
  toggleBorder: "rgba(0,0,0,0.1)",
  toggleColor: "#111",
  titleGradient: "linear-gradient(90deg, #111 0%, rgba(0,0,0,0.6) 100%)",
};

export default function CollectiblesLayout() {
  const [activeView, setActiveView] = useState("card");
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? darkTheme : lightTheme;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: t.pageBg,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.4s ease",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "620px",
        }}>

          {/* Dark/Light toggle button — top right */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 18px",
                borderRadius: "999px",
                border: `1px solid ${t.toggleBorder}`,
                background: t.toggleBg,
                color: t.toggleColor,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: "600",
                fontSize: "14px",
                transition: "all 0.3s ease",
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
              {isDark ? "Light mode" : "Dark mode"}
            </button>
          </div>

          {/* Glass container */}
          <div style={{
            background: t.containerBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${t.containerBorder}`,
            borderRadius: "28px",
            padding: "36px 32px",
            boxShadow: t.containerShadow,
            transition: "background 0.4s ease, border 0.4s ease, box-shadow 0.4s ease",
          }}>

            {/* Title */}
            <h1 style={{
  fontSize: "30px", fontWeight: "800", marginBottom: "28px",
  color: t.text,
  letterSpacing: "-0.5px",
}}>
  Collectibles
</h1>

            {/* View Toggle */}
            <div style={{
              display: "flex", gap: "4px", marginBottom: "24px",
              background: t.tabBarBg,
              border: `1px solid ${t.tabBarBorder}`,
              borderRadius: "999px",
              padding: "5px",
              transition: "background 0.4s ease",
            }}>
              {views.map(({ id, label, Icon }) => {
                const active = activeView === id;
                const iconColor = active ? "#fff" : t.tabInactiveColor;
                return (
                  <button key={id} onClick={() => setActiveView(id)} style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "7px", padding: "10px 16px", borderRadius: "999px",
                    border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px",
                    fontFamily: "'DM Sans', sans-serif",
                    background: active ? "#29c4f6" : "transparent",
                    color: active ? "#fff" : t.tabInactiveColor,
                    transition: "all 0.25s ease",
                    boxShadow: active ? "0 2px 12px rgba(41,196,246,0.4)" : "none",
                  }}>
                    <Icon color={iconColor} />{label}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: t.divider, marginBottom: "24px", transition: "background 0.4s ease" }} />

            {/* Content */}
            <AnimatedView viewKey={activeView}>
              {activeView === "card" && <CardView items={items} t={t} />}
              {activeView === "list" && <ListView items={items} t={t} />}
              {activeView === "pack" && <PackView items={items} t={t} />}
            </AnimatedView>

          </div>
        </div>
      </div>
    </>
  );
}