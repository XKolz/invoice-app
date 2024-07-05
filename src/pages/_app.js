// import Layout from "@/components/Layout";
// import AllInvoicesProvider from "@/context/AllInvoices";
// import InvoiceContextProvider from "@/context/invoice";
// import { ThemeContextProvider } from "@/context/theme";
// import { AnimatePresence } from "framer-motion";
// import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
// 	return (
// 		<ThemeContextProvider>
// 			<InvoiceContextProvider>
// 				<AllInvoicesProvider>
// 					<Layout>
// 						<Component {...pageProps} />
// 					</Layout>
// 				</AllInvoicesProvider>
// 			</InvoiceContextProvider>
// 		</ThemeContextProvider>
// 	);
// }
import Layout from "@/components/Layout";
import AllInvoicesProvider from "@/context/AllInvoices";
import InvoiceContextProvider from "@/context/invoice";
import { ThemeContextProvider } from "@/context/theme";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <InvoiceContextProvider>
        <AllInvoicesProvider>
          <Layout>
            <Head>
              <title>Invoice App</title>
              <meta name="description" content="A simple and efficient invoice management application." />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </AllInvoicesProvider>
      </InvoiceContextProvider>
    </ThemeContextProvider>
  );
}
