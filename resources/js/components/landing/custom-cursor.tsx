import { useEffect, useRef, useState } from 'react';

// Elements that grow the ring when hovered.
const INTERACTIVE =
    'a, button, summary, label, select, [role="button"], [data-cursor="hover"]';

// Where the native text cursor is kept and the dot and ring step aside.
const TEXT_ENTRY = 'input, textarea, [contenteditable="true"]';

// Share of the remaining distance the ring covers each frame.
const RING_FOLLOW = 0.18;

// Only for a real mouse, and not for visitors who ask to reduce motion.
const QUERY = '(pointer: fine) and (prefers-reduced-motion: no-preference)';

type Point = { x: number; y: number };

// Every page mounts its own layout, so the last pointer position is kept
// outside React. After a link click the new page shows the cursor right where
// the mouse is, instead of waiting for the next move.
let lastPointer: Point | null = null;

function rememberPointer(point: Point | null) {
    lastPointer = point;
}

function recallPointer(): Point | null {
    return lastPointer;
}

export default function CustomCursor() {
    const [enabled, setEnabled] = useState(false);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const media = window.matchMedia(QUERY);
        const update = () => setEnabled(media.matches);

        update();
        media.addEventListener('change', update);

        return () => media.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;

        if (!enabled || !dot || !ring) {
            return;
        }

        const root = document.documentElement;
        root.classList.add('custom-cursor');

        const start = recallPointer();
        let x = start?.x ?? 0;
        let y = start?.y ?? 0;
        let ringX = x;
        let ringY = y;
        let frame = 0;
        let seen = start !== null;

        // The ring eases toward the pointer and the loop stops once it
        // arrives, so nothing runs while the mouse is still.
        const follow = () => {
            ringX += (x - ringX) * RING_FOLLOW;
            ringY += (y - ringY) * RING_FOLLOW;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

            if (Math.abs(x - ringX) > 0.1 || Math.abs(y - ringY) > 0.1) {
                frame = requestAnimationFrame(follow);
            } else {
                frame = 0;
            }
        };

        const setVisible = (visible: boolean) => {
            root.toggleAttribute('data-cursor-visible', visible);
        };

        if (start) {
            dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            setVisible(true);
        }

        const onMove = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') {
                return;
            }

            x = event.clientX;
            y = event.clientY;
            rememberPointer({ x, y });

            if (!seen) {
                ringX = x;
                ringY = y;
                seen = true;
            }

            dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;

            const target = event.target as Element | null;
            const typing = Boolean(target?.closest(TEXT_ENTRY));
            setVisible(!typing);
            root.toggleAttribute(
                'data-cursor-hover',
                !typing && Boolean(target?.closest(INTERACTIVE)),
            );

            if (!frame) {
                frame = requestAnimationFrame(follow);
            }
        };

        const onLeave = () => {
            setVisible(false);
            seen = false;
            rememberPointer(null);
        };
        const onDown = () => root.toggleAttribute('data-cursor-down', true);
        const onUp = () => root.toggleAttribute('data-cursor-down', false);

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        document.addEventListener('mouseleave', onLeave);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerdown', onDown);
            window.removeEventListener('pointerup', onUp);
            document.removeEventListener('mouseleave', onLeave);
            root.classList.remove('custom-cursor');
            root.removeAttribute('data-cursor-visible');
            root.removeAttribute('data-cursor-hover');
            root.removeAttribute('data-cursor-down');
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <div aria-hidden="true" className="custom-cursor-layer">
            <div ref={ringRef} className="custom-cursor-ring">
                <span />
            </div>
            <div ref={dotRef} className="custom-cursor-dot">
                <span />
            </div>
        </div>
    );
}
