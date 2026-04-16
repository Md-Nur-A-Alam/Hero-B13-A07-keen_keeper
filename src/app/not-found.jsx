'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';



export default function NotFound() {
    const canvasRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);

    /* ── Particle canvas ──────────────────────────────────────────────── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);

        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 3 + 1,
            dx: (Math.random() - 0.5) * 0.6,
            dy: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.5 + 0.2,
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(74,222,128,${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > W) p.dx *= -1;
                if (p.y < 0 || p.y > H) p.dy *= -1;
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    /* ── Mouse parallax ────────────────────────────────────────────────── */
    useEffect(() => {
        const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, []);

    const px = (mousePos.x / (typeof window !== 'undefined' ? window.innerWidth : 1) - 0.5) * 20;
    const py = (mousePos.y / (typeof window !== 'undefined' ? window.innerHeight : 1) - 0.5) * 20;

    return (
        <>
            {/* ── Keyframes injected once ─────────────────────────────── */}
            <style>{`
                @keyframes floatUp {
                    0%   { transform: translateY(0px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
                }
                @keyframes glitch {
                    0%   { clip-path: inset(0 0 98% 0); transform: translate(-4px,0); }
                    10%  { clip-path: inset(40% 0 50% 0); transform: translate(4px,0); }
                    20%  { clip-path: inset(80% 0 5% 0);  transform: translate(-4px,0); }
                    30%  { clip-path: inset(20% 0 70% 0); transform: translate(0,0); }
                    40%  { clip-path: inset(60% 0 30% 0); transform: translate(4px,0); }
                    50%  { clip-path: inset(10% 0 85% 0); transform: translate(-4px,0); }
                    60%  { clip-path: inset(90% 0 2% 0);  transform: translate(4px,0); }
                    70%  { clip-path: inset(50% 0 40% 0); transform: translate(-4px,0); }
                    80%  { clip-path: inset(5% 0 92% 0);  transform: translate(0,0); }
                    90%  { clip-path: inset(75% 0 15% 0); transform: translate(4px,0); }
                    100% { clip-path: inset(0 0 98% 0);   transform: translate(-4px,0); }
                }
                @keyframes orbit1 {
                    from { transform: rotate(0deg) translateX(90px) rotate(0deg); }
                    to   { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
                }
                @keyframes orbit2 {
                    from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
                    to   { transform: rotate(-360deg) translateX(120px) rotate(360deg); }
                }
                @keyframes orbit3 {
                    from { transform: rotate(180deg) translateX(150px) rotate(-180deg); }
                    to   { transform: rotate(540deg) translateX(150px) rotate(-540deg); }
                }
                @keyframes pulseRing {
                    0%,100% { transform: scale(1); opacity: .3; }
                    50%     { transform: scale(1.12); opacity: .15; }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes spinSlow {
                    to { transform: rotate(360deg); }
                }
                @keyframes shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .not-found-404 {
                    font-size: clamp(6rem, 22vw, 16rem);
                    font-weight: 900;
                    line-height: 1;
                    background: linear-gradient(
                        90deg,
                        #166534 0%, #4ade80 20%, #16a34a 40%,
                        #86efac 60%, #166534 80%, #4ade80 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 3s linear infinite;
                    position: relative;
                    z-index: 1;
                }
                .not-found-404::before,
                .not-found-404::after {
                    content: "404";
                    position: absolute;
                    top: 0; left: 0;
                    -webkit-text-fill-color: transparent;
                    z-index: -1;
                }
                .not-found-404::before {
                    background: linear-gradient(90deg,#4ade80,#86efac);
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: glitch 4s infinite step-start;
                    opacity: .7;
                }
                .not-found-404::after {
                    background: linear-gradient(90deg,#f43f5e,#fb923c);
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: glitch 4s infinite step-start reverse;
                    opacity: .5;
                }
                .btn-404 {
                    transition: transform .2s, box-shadow .2s;
                }
                .btn-404:hover {
                    transform: translateY(-3px) scale(1.05);
                    box-shadow: 0 12px 40px rgba(74,222,128,.5) !important;
                }
                .btn-404:active { transform: scale(.96); }
                .card-404 {
                    animation: fadeSlideUp .8s ease both;
                }
            `}</style>

            {/* ── Particle canvas (background) ─────────────────────────── */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed', inset: 0, zIndex: 0,
                    pointerEvents: 'none',
                }}
            />

            {/* ── Page wrapper ─────────────────────────────────────────── */}
            <div style={{
                position: 'relative', zIndex: 1,
                minHeight: '80vh',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '3rem 1.5rem',
                overflow: 'hidden',
            }}>

                {/* ── Soft radial glow backdrop ──────────────────────── */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(74,222,128,.10) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* ── Orbit system ──────────────────────────────────── */}
                <div style={{
                    position: 'relative', width: 200, height: 200,
                    marginBottom: '1rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: `translate(${px * 0.3}px, ${py * 0.3}px)`,
                    transition: 'transform .1s linear',
                }}>
                    {/* Pulse rings */}
                    {[160, 200, 240].map((s, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: s, height: s,
                            borderRadius: '50%',
                            border: `1.5px solid rgba(74,222,128,${0.25 - i * 0.07})`,
                            animation: `pulseRing ${2 + i * 0.6}s ease-in-out infinite`,
                        }} />
                    ))}

                    {/* Orbit dots */}
                    {[
                        { anim: 'orbit1', dur: '4s', color: '#4ade80', size: 10 },
                        { anim: 'orbit2', dur: '6s', color: '#86efac', size: 7 },
                        { anim: 'orbit3', dur: '9s', color: '#166534', size: 12 },
                    ].map((o, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: o.size, height: o.size, borderRadius: '50%',
                            background: o.color,
                            boxShadow: `0 0 8px ${o.color}`,
                            animation: `${o.anim} ${o.dur} linear infinite`,
                        }} />
                    ))}

                    {/* Spinning dashed ring */}
                    <div style={{
                        position: 'absolute',
                        width: 130, height: 130, borderRadius: '50%',
                        border: '2px dashed rgba(74,222,128,.4)',
                        animation: 'spinSlow 12s linear infinite',
                    }} />

                    {/* Center icon */}
                    <div style={{
                        width: 72, height: 72, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem',
                        boxShadow: '0 4px 24px rgba(74,222,128,.3)',
                        zIndex: 2,
                    }}>
                        🌿
                    </div>
                </div>

                {/* ── Glitch 404 ─────────────────────────────────────── */}
                <div style={{
                    transform: `translate(${px * 0.15}px, ${py * 0.15}px)`,
                    transition: 'transform .12s linear',
                    position: 'relative',
                    userSelect: 'none',
                    marginBottom: '0.5rem',
                }}>
                    <span className="not-found-404">404</span>
                </div>

                {/* ── Card ──────────────────────────────────────────── */}
                <div className="card-404" style={{
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(74,222,128,.25)',
                    borderRadius: '1.5rem',
                    padding: '2.5rem 2rem',
                    maxWidth: 480,
                    width: '100%',
                    boxShadow: '0 8px 40px rgba(0,0,0,.08)',
                    animationDelay: '.2s',
                }}>
                    <h1 style={{
                        fontSize: 'clamp(1.4rem,4vw,1.9rem)',
                        fontWeight: 800,
                        color: '#1E293B',
                        marginBottom: '0.75rem',
                    }}>
                        Oops! Page Not Found
                    </h1>
                    <p style={{
                        color: '#64748b', fontSize: '1rem',
                        lineHeight: 1.7, marginBottom: '2rem',
                    }}>
                        It looks like this page wandered off. The route you are looking
                        for does not exist — but your friendships do!
                    </p>

                    {/* Tags row */}
                    <div style={{
                        display: 'flex', gap: '.5rem',
                        flexWrap: 'wrap', justifyContent: 'center',
                        marginBottom: '1.75rem',
                    }}>
                        {['#lost', '#404', '#oops', '#not-found'].map(tag => (
                            <span key={tag} style={{
                                padding: '.25rem .75rem',
                                borderRadius: 999,
                                fontSize: '.75rem', fontWeight: 600,
                                background: 'linear-gradient(135deg,#dcfce7,#bbf7d0)',
                                color: '#166534',
                                border: '1px solid rgba(74,222,128,.35)',
                            }}>{tag}</span>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            href="/"
                            className="btn-404"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                                padding: '.85rem 2rem',
                                borderRadius: 999,
                                fontWeight: 700, fontSize: '.9rem', color: '#fff',
                                background: 'linear-gradient(135deg,#4ade80 0%,#16a34a 100%)',
                                boxShadow: '0 4px 20px rgba(74,222,128,.35)',
                                textDecoration: 'none',
                            }}
                        >
                            <span style={{
                                display: 'inline-block',
                                transform: hovered ? 'translateX(-3px)' : 'translateX(0)',
                                transition: 'transform .2s',
                            }}>←</span>
                            Back to Home
                        </Link>

                        <button
                            onClick={() => typeof window !== 'undefined' && window.history.back()}
                            className="btn-404"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '.5rem',
                                padding: '.85rem 2rem',
                                borderRadius: 999,
                                fontWeight: 700, fontSize: '.9rem',
                                color: '#16a34a',
                                background: 'white',
                                border: '2px solid rgba(74,222,128,.5)',
                                boxShadow: '0 2px 12px rgba(74,222,128,.15)',
                                cursor: 'pointer',
                            }}
                        >
                            ↩ Go Back
                        </button>
                    </div>
                </div>

                {/* ── Floating emoji particles ────────────────────────── */}
                {['🌿','💚','✨','🍃','💫','🌱'].map((emoji, i) => (
                    <span key={i} style={{
                        position: 'fixed',
                        left: `${10 + i * 15}%`,
                        bottom: '-2rem',
                        fontSize: `${1 + (i % 3) * 0.4}rem`,
                        animation: `floatUp ${4 + i * 1.2}s ease-in infinite`,
                        animationDelay: `${i * 0.8}s`,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        zIndex: 0,
                    }}>{emoji}</span>
                ))}
            </div>
        </>
    );
}
