const { createContext, useState, useContext } = require("react");

const invoiceContext = createContext();
const date = new Date();
const currentDate = date.toISOString().split("T")[0];
const InvoiceContextProvider = ({ children }) => {
	const [invoice, setInvoice] = useState({
		id: false,
		clientAddress: {
			street: "",
			city: "",
			country: "",
			postCode: "",
		},
		clientName: "",
		clientEmail: "",
		createdAt: currentDate,
		description: "",
		items: [],
		paymentDue: "",
		paymentTerm: "",
		senderAddress: {
			street: "",
			city: "",
			country: "",
			postCode: "",
		},
		status: "",
		total: "",
	});
	const handleChange = (e) => {
		setInvoice((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleItemChange = (payload) => {
		const newData = invoice.items.map((item, i) => {
			if (payload.index === i) {
				return {
					...item,
					...payload.data,
				};
			}
			return item;
		});
		setInvoice((prev) => ({ ...prev, items: [...newData] }));
	};

	const handleSenderAddress = (e) => {
		setInvoice((prev) => ({
			...prev,
			senderAddress: {
				...prev.senderAddress,
				[e.target.name]: e.target.value,
			},
		}));
	};
	const handleClientAddress = (e) => {
		setInvoice((prev) => ({
			...prev,
			clientAddress: {
				...prev.clientAddress,
				[e.target.name]: e.target.value,
			},
		}));
	};
	const handleAddItem = () => {
		setInvoice({
			...invoice,
			items: [
				...invoice.items,
				{ name: "", quantity: "", price: "", total: "" },
			],
		});
	};
	const deleteItem = (id) => {
		setInvoice({
			...invoice,
			items: invoice.items.filter((item, i) => i !== id),
		});
	};

	const handleId = (id) => {
		setInvoice({ ...invoice, id: id });
	};
	const handleTotal = (amount) => {
		setInvoice({ ...invoice, total: amount });
	};
	const handleStatus = (value) => {
		setInvoice({ ...invoice, status: value });
	};
	const resetInvoice = () => {
		setInvoice({
			id: false,
			clientAddress: {
				street: "",
				city: "",
				country: "",
				postCode: "",
			},
			clientName: "",
			createdAt: currentDate,
			description: "",
			items: [],
			paymentDue: "",
			paymentTerm: "",
			senderAddress: {
				street: "",
				city: "",
				country: "",
				postCode: "",
			},
			status: "",
			total: "",
		});
	};
	const updateInvoice = (data) => {
		setInvoice(data);
	};

	return (
		<invoiceContext.Provider
			value={{
				handleChange,
				invoice,
				setInvoice,
				handleItemChange,
				handleSenderAddress,
				handleAddItem,
				deleteItem,
				handleId,
				updateInvoice,
				handleClientAddress,
				handleTotal,
				resetInvoice,
				handleStatus,
			}}>
			{children}
		</invoiceContext.Provider>
	);
};
export default InvoiceContextProvider;
export const useInvoice = () => {
	return useContext(invoiceContext);
};
