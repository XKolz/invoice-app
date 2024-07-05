import { createContext, useContext, useEffect, useState } from "react";
import { invoicesData } from "@/data";
const allInvoicesContext = createContext();
const AllInvoicesProvider = ({ children }) => {
	const [allInvoices, setAllInvoices] = useState(null);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const storedInvoices = window.localStorage.getItem("invoices");
		if (storedInvoices === null) {
			// If the "invoices" item doesn't exist in local storage, set it with default data.
			window.localStorage.setItem("invoices", JSON.stringify(invoicesData));
			setAllInvoices(invoicesData);
		} else {
			// If the "invoices" item exists in local storage, parse and set the data.
			setAllInvoices(JSON.parse(storedInvoices));
		}
	}, []);

	const handleDelete = (id) => {
		const newInvoices = allInvoices.filter((invoice) => invoice.id !== id);
		setAllInvoices(newInvoices);
		window.localStorage.setItem("invoices", JSON.stringify(newInvoices));
	};
	const addInvoice = (invoice) => {
		window.localStorage.setItem(
			"invoices",
			JSON.stringify([ invoice, ...allInvoices,])
		);
		setAllInvoices([invoice, ...allInvoices, ]);
	};
	const changeStatus = (id) => {
		const newData = allInvoices.map((invoice) => {
			if (invoice.id === id) {
				return {
					...invoice,
					status: "paid",
				};
			}
			return invoice;
		});
		setAllInvoices(newData);
		window.localStorage.setItem("invoices", JSON.stringify(newData));
	};
	const editInvoice = (data) => {
		const newData = allInvoices.map((invoice) => {
			if (invoice.id === data.id) {
				return {
					...invoice,
					...data.data,
				};
			}
			return invoice;
		});
		setAllInvoices(newData);
		window.localStorage.setItem("invoices", JSON.stringify(newData));
	};
	return (
		<allInvoicesContext.Provider
			value={{
				allInvoices,
				setAllInvoices,
				handleDelete,
				addInvoice,
				changeStatus,
				editInvoice,
			}}>
			{children}
		</allInvoicesContext.Provider>
	);
};
export default AllInvoicesProvider;
export const useAllInvoice = () => {
	return useContext(allInvoicesContext);
};
