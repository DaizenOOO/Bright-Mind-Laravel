export const sharedSpring = {
    type: 'spring' as const,
    stiffness: 420,
    damping: 34,
    mass: 0.8,
};

export const contentVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        filter: 'blur(4px)',
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -50 : 50,
        opacity: 0,
        filter: 'blur(4px)',
    }),
};

export const contentTransition = {
    x: { type: 'spring' as const, stiffness: 320, damping: 30 },
    opacity: { duration: 0.18 },
    filter: { duration: 0.18 },
};
