import { useRouter } from "next/router";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
	const router = useRouter();
	return (
		<div className="flex flex-col min-[850px]:flex-row  w-full h-[100vh] overflow-y-scroll remove-scrollbar bg-[var(--primary-bg-color)]">
			<Navbar />

			<AnimatePresence mode="wait">
				<motion.div
					key={router.route}
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					variants={{ delay: 0.4 }}
					exit={{ y: -300, opacity: 0 }}
					className="max-[800px]:w-[95%]  min-[850px]:w-[45%] mx-auto my-auto ">
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
