import { useState, useEffect, useRef } from "react";

import IMG_HANDS from '../assets/shared-layout-asset-2.png';
import IMG_CASSETTE from '../assets/shared-layout-asset-1.png';

const items = [
  {
    id: 1,
    name: "Skilled Fingers Series",
    price: "0.855",
    token: "#209",
    bg: "#e8d5f5",
    img: IMG_HANDS,
  },
  {
    id: 2,
    name: "Vibrant Vibes Series",
    price: "0.209",
    token: "#808",
    bg: "#dbeafe",
    img: IMG_CASSETTE,
  },
];

const GoldDiamond = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <polygon points="7,1 13,5 13,9 7,13 1,9 1,5" fill="#f5c842" />
  </svg>
);

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <rect x="0" y="2" width="4" height="4" rx="1" />
    <rect x="6" y="2" width="12" height="4" rx="1" />
    <rect x="0" y="8" width="4" height="4" rx="1" />
    <rect x="6" y="8" width="12" height="4" rx="1" />
    <rect x="0" y="14" width="4" height="2" rx="1" />
    <rect x="6" y="14" width="12" height="2" rx="1" />
  </svg>
);

const CardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
    <rect x="0" y="0" width="7" height="7" rx="1.5" />
    <rect x="11" y="0" width="7" height="7" rx="1.5" />
    <rect x="0" y="11" width="7" height="7" rx="1.5" />
    <rect x="11" y="11" width="7" height="7" rx="1.5" />
  </svg>
);

const PackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="9" r="8" />
    <path d="M9 4 C9 4 13 7 13 10 C13 12.2 11.2 14 9 14 C6.8 14 5 12.2 5 10 C5 7 9 4 9 4Z" />
  </svg>
);

// Handles fade-out → swap content → fade-in on view change
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
      transform: visible ? "translateY(0px)" : "translateY(10px)",
      transition: "opacity 0.25s ease, transform 0.25s ease",
    }}>
      {displayed}
    </div>
  );
}

function CardView({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
      {items.map((item, index) => (
        <div key={item.id} style={{
          animation: `fadeSlideUp 0.3s ease both`,
          animationDelay: `${index * 80}ms`,
        }}>
          <div style={{ background: item.bg, borderRadius: "16px", height: "220px", overflow: "hidden", marginBottom: "14px" }}>
            <img
              src={item.img}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
              onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.target.style.transform = "scale(1)"}
            />
          </div>
          <div style={{ fontWeight: "700", fontSize: "18px", color: "#111", marginBottom: "6px" }}>{item.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontWeight: "800", fontSize: "17px", color: "#111" }}>
              {item.price} <span style={{ fontWeight: "400", color: "#9ca3af" }}>ETH</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }}>
              <GoldDiamond />
              <span style={{ fontWeight: "700", color: "#9ca3af" }}>{item.token}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ListView({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {items.map((item, index) => (
        <div key={item.id} style={{
          display: "flex", alignItems: "center", gap: "16px", padding: "8px 0",
          animation: `fadeSlideUp 0.3s ease both`,
          animationDelay: `${index * 80}ms`,
        }}>
          <div style={{ background: item.bg, borderRadius: "12px", width: "90px", height: "90px", overflow: "hidden", flexShrink: 0 }}>
            <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "700", fontSize: "17px", color: "#111", marginBottom: "4px" }}>{item.name}</div>
            <div style={{ fontWeight: "800", fontSize: "16px", color: "#111" }}>
              {item.price} <span style={{ fontWeight: "400", color: "#9ca3af" }}>ETH</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <GoldDiamond />
            <span style={{ fontWeight: "700", color: "#9ca3af", fontSize: "15px" }}>{item.token}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PackView({ items }) {
  const total = items.reduce((sum, i) => sum + parseFloat(i.price), 0).toFixed(3);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", animation: "fadeSlideUp 0.3s ease both" }}>
      <div style={{ position: "relative", width: "200px", height: "200px", marginBottom: "24px" }}>
        {items.map((item, i) => (
          <div key={item.id} style={{
            position: "absolute",
            width: "150px", height: "150px",
            borderRadius: "24px",
            background: item.bg,
            overflow: "hidden",
            left: `${i * 22}px`, top: `${i * 22}px`,
            boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
            zIndex: items.length - i,
            animation: `fadeSlideUp 0.3s ease both`,
            animationDelay: `${i * 80}ms`,
          }}>
            <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
      <div style={{ fontWeight: "700", fontSize: "22px", color: "#111", marginBottom: "6px" }}>{items.length} Collectibles</div>
      <div style={{ fontWeight: "800", fontSize: "20px", color: "#111" }}>
        {total} <span style={{ fontWeight: "400", color: "#9ca3af" }}>ETH</span>
      </div>
    </div>
  );
}

const views = [
  { id: "list", label: "List view", Icon: ListIcon },
  { id: "card", label: "Card view", Icon: CardIcon },
  { id: "pack", label: "Pack view", Icon: PackIcon },
];

export default function CollectiblesLayout() {
  const [activeView, setActiveView] = useState("card");

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: "#fff", minHeight: "100vh", padding: "48px 40px", maxWidth: "700px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#111", marginBottom: "28px" }}>Collectibles</h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "28px", flexWrap: "wrap" }}>
          {views.map(({ id, label, Icon }) => {
            const active = activeView === id;
            return (
              <button key={id} onClick={() => setActiveView(id)} style={{
                display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px",
                borderRadius: "999px", border: "none", cursor: "pointer", fontWeight: "600",
                fontSize: "15px", background: active ? "#29c4f6" : "#f0f0f0",
                color: active ? "#fff" : "#555",
                transition: "background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease",
                boxShadow: active ? "0 2px 10px rgba(41,196,246,0.35)" : "none",
                transform: active ? "scale(1.04)" : "scale(1)",
              }}>
                <Icon />{label}
              </button>
            );
          })}
        </div>

        <div style={{ height: "1px", background: "#e5e7eb", marginBottom: "28px" }} />

        <AnimatedView viewKey={activeView}>
          {activeView === "card" && <CardView items={items} />}
          {activeView === "list" && <ListView items={items} />}
          {activeView === "pack" && <PackView items={items} />}
        </AnimatedView>
      </div>
    </>
  );
}