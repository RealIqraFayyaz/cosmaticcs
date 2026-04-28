export const pageVariants = {
  initial: { opacity: 0, y: 10, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(10px)" },
};

export const pageTransition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
  mass: 0.9,
};

