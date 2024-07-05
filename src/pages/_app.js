import Layout from "@/components/Layout";
import AllInvoicesProvider from "@/context/AllInvoices";
import InvoiceContextProvider from "@/context/invoice";
import { ThemeContextProvider } from "@/context/theme";
import { AnimatePresence } from "framer-motion";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<ThemeContextProvider>
			<InvoiceContextProvider>
				<AllInvoicesProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AllInvoicesProvider>
			</InvoiceContextProvider>
		</ThemeContextProvider>
	);
}
