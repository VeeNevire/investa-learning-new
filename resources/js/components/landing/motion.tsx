import {
    LazyMotion,
    MotionConfig,
    animate,
    domAnimation,
    m,
    useInView,
    useReducedMotion,
} from 'motion/react';
import type { Variants } from 'motion/react';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Shared by every scroll-triggered animation: play once, when a fifth of the
// element is on screen.
export const VIEWPORT = { once: true, amount: 0.2 } as const;

type Tag = 'div' | 'ul' | 'ol' | 'li' | 'section';

const components = {
    div: m.div,
    ul: m.ul,
    ol: m.ol,
    li: m.li,
    section: m.section,
} as unknown as Record<Tag, typeof m.div>;

// A delay is only set when one is passed in (via `custom`): an explicit delay
// would override the one a parent Stagger hands each child.
export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay?: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: EASE_OUT,
            ...(delay ? { delay } : {}),
        },
    }),
};

// Loads only the DOM animation features, and turns transform animations off
// for visitors who ask their system to reduce motion.
export function MotionProvider({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
    );
}

export function Reveal({
    as = 'div',
    delay = 0,
    className,
    children,
}: {
    as?: Tag;
    delay?: number;
    className?: string;
    children: ReactNode;
}) {
    const Component = components[as];

    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeUp}
            custom={delay}
        >
            {children}
        </Component>
    );
}

export function Stagger({
    as = 'div',
    gap = 0.08,
    className,
    children,
}: {
    as?: Tag;
    gap?: number;
    className?: string;
    children: ReactNode;
}) {
    const Component = components[as];

    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: gap } },
            }}
        >
            {children}
        </Component>
    );
}

export function StaggerItem({
    as = 'div',
    className,
    children,
}: {
    as?: Tag;
    className?: string;
    children: ReactNode;
}) {
    const Component = components[as];

    return (
        <Component className={className} variants={fadeUp}>
            {children}
        </Component>
    );
}

// Counts up to `to` once visible. Writes straight to the text node so the
// count does not re-render React on every frame.
export function CountUp({
    to,
    from = 0,
    suffix = '',
    duration = 1.4,
}: {
    to: number;
    from?: number;
    suffix?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, VIEWPORT);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const node = ref.current;

        if (!node || !inView) {
            return;
        }

        if (reduceMotion) {
            node.textContent = `${to}${suffix}`;

            return;
        }

        const controls = animate(from, to, {
            duration,
            ease: EASE_OUT,
            onUpdate: (value) => {
                node.textContent = `${Math.round(value)}${suffix}`;
            },
        });

        return () => controls.stop();
    }, [inView, reduceMotion, from, to, suffix, duration]);

    return (
        <span ref={ref}>
            {from}
            {suffix}
        </span>
    );
}
