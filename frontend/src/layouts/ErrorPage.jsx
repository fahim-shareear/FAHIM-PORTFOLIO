import { useEffect, useState } from "react";

const glitchKeyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&display=swap');

  @keyframes glitch-1 {
    0%,100%{clip-path:inset(0 0 98% 0);transform:translate(-3px,0)}
    10%{clip-path:inset(20% 0 60% 0);transform:translate(3px,0)}
    20%{clip-path:inset(50% 0 30% 0);transform:translate(-2px,0)}
    30%{clip-path:inset(80% 0 5% 0);transform:translate(2px,0)}
    40%{clip-path:inset(10% 0 85% 0);transform:translate(-3px,0)}
    50%{clip-path:inset(40% 0 50% 0);transform:translate(3px,0)}
    60%{clip-path:inset(70% 0 20% 0);transform:translate(-1px,0)}
    70%{clip-path:inset(30% 0 65% 0);transform:translate(1px,0)}
  }
  @keyframes glitch-2 {
    0%,100%{clip-path:inset(50% 0 30% 0);transform:translate(3px,0)}
    15%{clip-path:inset(10% 0 80% 0);transform:translate(-3px,0)}
    35%{clip-path:inset(60% 0 20% 0);transform:translate(2px,0)}
    55%{clip-path:inset(25% 0 55% 0);transform:translate(-2px,0)}
    75%{clip-path:inset(75% 0 10% 0);transform:translate(1px,0)}
  }
  @keyframes scanline {
    0%{transform:translateY(-100%)}
    100%{transform:translateY(100vh)}
  }
  @keyframes flicker {
    0%,100%{opacity:1}
    48%{opacity:1}
    50%{opacity:0.85}
    52%{opacity:1}
    90%{opacity:1}
    92%{opacity:0.9}
    94%{opacity:1}
  }
  @keyframes pulse-glow {
    0%,100%{box-shadow:0 0 10px #00ffe7,0 0 30px #00ffe740,0 0 60px #00ffe720,inset 0 0 10px #00ffe710}
    50%{box-shadow:0 0 20px #00ffe7,0 0 50px #00ffe760,0 0 80px #00ffe730,inset 0 0 20px #00ffe720}
  }
  @keyframes blink {
    0%,49%{opacity:1}
    50%,100%{opacity:0}
  }
  @keyframes fadeUp {
    from{opacity:0;transform:translateY(20px)}
    to{opacity:1;transform:translateY(0)}
  }
  @keyframes bar-fill {
    from{width:0%}
    to{width:var(--target-width)}
  }
  @keyframes border-travel {
    0%{background-position:0% 50%}
    100%{background-position:200% 50%}
  }
  @keyframes spin-slow {
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
  }
  @keyframes ping {
    0%{transform:scale(1);opacity:1}
    75%,100%{transform:scale(2);opacity:0}
  }

  .glitch-wrap {position:relative;display:inline-block;}
  .glitch-wrap::before,.glitch-wrap::after {
    content:attr(data-text);
    position:absolute;
    top:0;left:0;width:100%;height:100%;
    font-family:'Orbitron',monospace;
    font-weight:900;
  }
  .glitch-wrap::before {
    color:#ff00c8;
    animation:glitch-1 2s infinite linear;
  }
  .glitch-wrap::after {
    color:#00ffe7;
    animation:glitch-2 2s infinite linear;
    animation-delay:0.08s;
  }
  .card-glow { animation: pulse-glow 3s ease-in-out infinite; }
  .scanline-anim { animation: scanline 5s linear infinite; }
  .flicker { animation: flicker 4s infinite; }
  .cursor { animation: blink 1s step-end infinite; }
  .fade-up { animation: fadeUp 0.6s ease forwards; }
  .fade-up-delay-1 { animation: fadeUp 0.6s ease 0.1s both; }
  .fade-up-delay-2 { animation: fadeUp 0.6s ease 0.2s both; }
  .fade-up-delay-3 { animation: fadeUp 0.6s ease 0.3s both; }
  .fade-up-delay-4 { animation: fadeUp 0.6s ease 0.4s both; }

  .cyber-btn {
    position:relative;overflow:hidden;
    background:transparent;
    border:1px solid #00ffe7;
    color:#00ffe7;
    font-family:'Share Tech Mono',monospace;
    font-size:12px;
    padding:11px 28px;
    cursor:pointer;
    letter-spacing:3px;
    text-transform:uppercase;
    clip-path:polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%);
    transition:all 0.2s ease;
  }
  .cyber-btn:hover {
    background:#00ffe715;
    color:#fff;
    box-shadow:0 0 20px #00ffe760;
  }
  .cyber-btn-pink {
    border-color:#ff00c8;
    color:#ff00c8;
  }
  .cyber-btn-pink:hover {
    background:#ff00c815;
    color:#fff;
    box-shadow:0 0 20px #ff00c860;
  }
  .bar-animate {
    animation: bar-fill 1.2s ease forwards;
  }
`;

const stackTrace = [
    { addr: "0x00A4", msg: "Route not found in registry", type: "error" },
    { addr: "0x00B1", msg: "Request terminated at gateway", type: "error" },
    { addr: "0x00C3", msg: "Auth token validation failed", type: "warn" },
    { addr: "0x00D7", msg: "Memory access violation — segment 7F", type: "error" },
];

const diagnostics = [
    { label: "Network", value: 8, color: "#00ffe7" },
    { label: "Memory", value: 43, color: "#ff9f00" },
    { label: "CPU", value: 91, color: "#ff00c8" },
];

export default function ErrorPage({
    code = "404",
    title = "NOT FOUND",
    message = "The requested resource could not be located in this sector. All nodes have been scanned.",
    onRetry,
    onGoHome,
}) {
    const [time, setTime] = useState(new Date().toISOString());
    const [typed, setTyped] = useState("");
    const fullText = "> SCANNING SECTOR... ACCESS DENIED";

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date().toISOString()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let i = 0;
        const t = setInterval(() => {
            setTyped(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(t);
        }, 45);
        return () => clearInterval(t);
    }, []);

    return (
        <>
            <style>{glitchKeyframes}</style>

            <div
                className="flicker"
                style={{
                    background: "#04070f",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                    fontFamily: "'Share Tech Mono', monospace",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* CRT scanlines bg */}
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background:
                            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,231,0.012) 2px,rgba(0,255,231,0.012) 4px)",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />

                {/* Moving scanline */}
                <div
                    className="scanline-anim"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "60px",
                        background:
                            "linear-gradient(transparent, rgba(0,255,231,0.05), transparent)",
                        pointerEvents: "none",
                        zIndex: 1,
                    }}
                />

                {/* Background grid */}
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(0,255,231,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,231,0.04) 1px,transparent 1px)",
                        backgroundSize: "60px 60px",
                        pointerEvents: "none",
                        zIndex: 0,
                    }}
                />

                {/* Corner decorations */}
                {["top:1rem;left:1rem", "top:1rem;right:1rem", "bottom:1rem;left:1rem", "bottom:1rem;right:1rem"].map(
                    (pos, i) => (
                        <div
                            key={i}
                            style={{
                                position: "fixed",
                                ...Object.fromEntries(pos.split(";").map((p) => p.split(":"))),
                                width: 40,
                                height: 40,
                                borderTop: i < 2 ? "1px solid #00ffe760" : "none",
                                borderBottom: i >= 2 ? "1px solid #00ffe760" : "none",
                                borderLeft: i % 2 === 0 ? "1px solid #00ffe760" : "none",
                                borderRight: i % 2 === 1 ? "1px solid #00ffe760" : "none",
                                zIndex: 2,
                            }}
                        />
                    )
                )}

                {/* Main card */}
                <div
                    className="card-glow fade-up"
                    style={{
                        position: "relative",
                        background: "#060c1a",
                        border: "1px solid #00ffe730",
                        borderRadius: 2,
                        padding: "2.5rem",
                        maxWidth: 560,
                        width: "100%",
                        zIndex: 3,
                    }}
                >
                    {/* Top gradient bar */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 2,
                            background:
                                "linear-gradient(90deg,transparent,#00ffe7,#ff00c8,#ff9f00,transparent)",
                        }}
                    />

                    {/* Corner brackets */}
                    {[
                        { top: -1, left: -1, borderTop: "2px solid #00ffe7", borderLeft: "2px solid #00ffe7" },
                        { top: -1, right: -1, borderTop: "2px solid #00ffe7", borderRight: "2px solid #00ffe7" },
                        { bottom: -1, left: -1, borderBottom: "2px solid #00ffe7", borderLeft: "2px solid #00ffe7" },
                        { bottom: -1, right: -1, borderBottom: "2px solid #00ffe7", borderRight: "2px solid #00ffe7" },
                    ].map((s, i) => (
                        <div
                            key={i}
                            style={{ position: "absolute", width: 16, height: 16, ...s }}
                        />
                    ))}

                    {/* Header */}
                    <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "2rem" }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                            <div
                                style={{
                                    width: 56,
                                    height: 56,
                                    border: "1px solid #ff00c8",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                                    background: "#ff00c810",
                                    position: "relative",
                                }}
                            >
                                <span style={{ fontSize: 26, color: "#ff00c8", fontWeight: 700 }}>!</span>
                            </div>
                            {/* ping dot */}
                            <span
                                style={{
                                    position: "absolute",
                                    top: -3,
                                    right: -3,
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#ff00c8",
                                }}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    top: -3,
                                    right: -3,
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#ff00c8",
                                    animation: "ping 1.5s ease-out infinite",
                                }}
                            />
                        </div>

                        <div>
                            <div
                                style={{
                                    fontSize: 10,
                                    color: "#ff00c8",
                                    letterSpacing: 4,
                                    marginBottom: 6,
                                }}
                            >
                                SYSTEM_ERROR :: SECTOR_7
                            </div>
                            <div
                                className="glitch-wrap"
                                data-text={`${code} ${title}`}
                                style={{
                                    fontFamily: "'Orbitron', monospace",
                                    fontSize: 22,
                                    fontWeight: 900,
                                    color: "#fff",
                                    letterSpacing: 2,
                                }}
                            >
                                {code} {title}
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div
                        className="fade-up-delay-1"
                        style={{
                            fontSize: 13,
                            color: "#4a8a9a",
                            lineHeight: 1.8,
                            marginBottom: "1.5rem",
                            borderLeft: "3px solid #00ffe740",
                            paddingLeft: 16,
                        }}
                    >
                        {message}
                    </div>

                    {/* Stack trace */}
                    <div
                        className="fade-up-delay-2"
                        style={{
                            background: "#020610",
                            border: "1px solid #00ffe720",
                            borderRadius: 2,
                            padding: "1rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 10,
                                color: "#00ffe760",
                                letterSpacing: 3,
                                marginBottom: 10,
                            }}
                        >
                            STACK_TRACE &gt; ERR_LOG
                        </div>
                        {stackTrace.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    fontSize: 12,
                                    color: s.type === "warn" ? "#ff9f00" : "#6ab0c0",
                                    marginBottom: 4,
                                    lineHeight: 1.6,
                                }}
                            >
                                <span style={{ color: "#00ffe740", flexShrink: 0 }}>
                                    [{s.addr}]
                                </span>
                                <span>{s.msg}</span>
                            </div>
                        ))}
                    </div>

                    {/* Diagnostics bars */}
                    <div
                        className="fade-up-delay-3"
                        style={{ marginBottom: "1.5rem" }}
                    >
                        <div
                            style={{
                                fontSize: 10,
                                color: "#00ffe760",
                                letterSpacing: 3,
                                marginBottom: 10,
                            }}
                        >
                            SYSTEM_DIAGNOSTICS
                        </div>
                        {diagnostics.map((d) => (
                            <div key={d.label} style={{ marginBottom: 8 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: 11,
                                        color: "#4a7a8a",
                                        marginBottom: 4,
                                    }}
                                >
                                    <span>{d.label}</span>
                                    <span style={{ color: d.color }}>{d.value}%</span>
                                </div>
                                <div
                                    style={{
                                        height: 3,
                                        background: "#0a1628",
                                        borderRadius: 0,
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        className="bar-animate"
                                        style={{
                                            height: "100%",
                                            background: d.color,
                                            boxShadow: `0 0 8px ${d.color}`,
                                            "--target-width": `${d.value}%`,
                                            width: `${d.value}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Meta info */}
                    <div
                        className="fade-up-delay-3"
                        style={{
                            fontSize: 11,
                            color: "#2a4a5a",
                            marginBottom: "1.5rem",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 4,
                        }}
                    >
                        <span>
                            <span style={{ color: "#00ffe750" }}>TIME:</span>{" "}
                            <span style={{ color: "#3a6a7a" }}>{time}</span>
                        </span>
                        <span>
                            <span style={{ color: "#00ffe750" }}>CODE:</span>{" "}
                            <span style={{ color: "#ff9f0090" }}>ERR_ROUTE_UNDEFINED</span>
                        </span>
                        <span>
                            <span style={{ color: "#00ffe750" }}>NODE:</span>{" "}
                            <span style={{ color: "#3a6a7a" }}>SRV-0x4F2A</span>
                        </span>
                        <span>
                            <span style={{ color: "#00ffe750" }}>SECTOR:</span>{" "}
                            <span style={{ color: "#3a6a7a" }}>GRID-7</span>
                        </span>
                    </div>

                    {/* Typewriter line */}
                    <div
                        className="fade-up-delay-3"
                        style={{
                            fontSize: 12,
                            color: "#1a4a5a",
                            marginBottom: "1.5rem",
                            letterSpacing: 1,
                        }}
                    >
                        {typed}
                        <span className="cursor" style={{ color: "#00ffe7" }}>
                            _
                        </span>
                    </div>

                    {/* Buttons */}
                    <div
                        className="fade-up-delay-4"
                        style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
                    >
                        <button className="cyber-btn" onClick={onRetry}>
                            &lt; RETRY /&gt;
                        </button>
                        <button className="cyber-btn cyber-btn-pink" onClick={onGoHome}>
                            GO HOME ↗
                        </button>
                    </div>

                    {/* Footer tag */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 8,
                            right: 12,
                            fontSize: 9,
                            color: "#1a3a4a",
                            letterSpacing: 2,
                        }}
                    >
                        SYS_v2.4.1 :: CYBERNET_OS
                    </div>
                </div>
            </div>
        </>
    );
};