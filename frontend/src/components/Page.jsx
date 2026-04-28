import { motion } from "framer-motion";
import { pageTransition, pageVariants } from "../lib/motion";

export function Page({ children }) {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="relative"
    >
      {children}
    </motion.main>
  );
}

