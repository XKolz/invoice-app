/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import StreetAddress from "./StreetAddress";
import { useInvoice } from "@/context/invoice";
import Input from "./Input";
import Items from "./Items";

import { useAllInvoice } from "@/context/AllInvoices";
import useOnClickOutside from "@/hooks/useOnClickOutside";

export default function InvoiceForm({ edit, hide }) {
	const modalRef = useRef();
	const [ref] = useOnClickOutside(modalRef, hide);
	function generateUniqueCode() {
		const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const numbers = "0123456789";
		let code = "";

		// Generate the first two capital letters
		for (let i = 0; i < 2; i++) {
			const randomLetter = letters.charAt(
				Math.floor(Math.random() * letters.length)
			);
			code += randomLetter;
		}

		// Generate the 5 numbers
		for (let i = 0; i < 4; i++) {
			const randomNumber = numbers.charAt(
				Math.floor(Math.random() * numbers.length)
			);
			code += randomNumber;
		}

		return code;
	}

	// Example usage:

	const { addInvoice, editInvoice } = useAllInvoice();
	const {
		invoice,
		handleChange,
		handleClientAddress,
		resetInvoice,
		handleTotal,
		handleSenderAddress,
		handleStatus,
	} = useInvoice();

	const totals = invoice.items.map((item) => item.total);
	const total = totals.reduce((sum, cost) => {
		const amount = cost;
		if (isNaN(amount)) {
			return sum; // Keep the current sum if amount is NaN
		}
		return sum + amount;
	}, 0);
	useEffect(() => {
		handleTotal(total);
	}, [total]);
	const handleAddingInvoice = async (value) => {
		addInvoice({
			...invoice,
			status: value,
			id: generateUniqueCode(),
		});
		resetInvoice();
		hide();
	};
	const handleEdit = () => {
		editInvoice({
			id: invoice.id,
			data: {
				...invoice,
				status: invoice.status === "draft" ? "pending" : invoice.status,
			},
		});
		resetInvoice();
		hide();
	};

	return (
		<div
			ref={ref}
			className={`animate-left relative bg-[var(--primary-bg-color)] mt-[70px]  md:mt-0 md:ml-[60px] h-[90vh] md:h-full text-[var(--text-color)] p-4 md:p-11 w-[90%] md:w-[40%] rounded-tr-[30px]  rounded-br-[30px]`}>
			<div>
				<h1 className="text-[var(--text-color)] font-bold text-[20px] md:text-[40px] my-3">
					{!edit? "Create Invoice":`Editing #${invoice.id}`}
				</h1>
			</div>
			<form className="h-[70vh] overflow-auto remove-scrollbar ">
				<h2 className="text-[#9277FF] font-bold text-[14px] my-4">Bill From</h2>
				<StreetAddress
					data={invoice.clientAddress}
					onChange={handleClientAddress}
				/>
				<h2 className="text-[#9277FF] font-bold text-[14px] my-4">Bill To</h2>
				<div className="mt-4">
					<Input
						name="clientName"
						value={invoice.clientName}
						onChange={handleChange}
						label="Client's Name"
						type="text"
					/>
				</div>
				<div className="my-4">
					<Input
						name="clientEmail"
						value={invoice.clientEmail}
						onChange={handleChange}
						label="Client's Email"
						placeholder="e.g.email@example.com"
						text="email"
					/>
				</div>
				<StreetAddress
					data={invoice.senderAddress}
					onChange={handleSenderAddress}
				/>
				<div className="w-full flex justify-between mt-4">
					<div className="w-[45%] ">
						<Input
							value={invoice.createdAt}
							onChange={handleChange}
							name="createdAt"
							label="Invoice Date"
							type="date"
						/>
					</div>
					<div className="w-[45%]">
						<Input
							value={invoice.paymentDue}
							onChange={handleChange}
							name="paymentDue"
							label="Payment Due Date"
							type="date"
						/>
					</div>
				</div>
				<div className="w-full mt-5">
					<Input
						placeholder="e.g. Graphic Design Service"
						label="Description"
						value={invoice.description}
						onChange={handleChange}
						type="text"
						name="description"
					/>
				</div>
				<Items />
			</form>
			{!edit ? (
				<div className="flex justify-between w-full items-center absolute bottom-8 md:bottom-8 right-0 px-5 md:px-11">
					<div>
						<button
							onClick={hide}
							className="rounded-[30px] text-[14px] font-semibold text-[white]  py-3 px-6 bg-[var(--secondary-bg-color)]">
							Discard
						</button>
					</div>
					<div className="flex gap-3 items-center">
						<button
							onClick={() => handleAddingInvoice("draft")}
							className="text-[14px] rounded-[30px] font-semibold text-[white]   py-3 px-6 bg-[#363b53]">
							Save as Draft
						</button>
						<button
							className="rounded-[30px] text-[14px] font-semibold text-[white] py-3 px-6 bg-[#9277FF]"
							onClick={() => handleAddingInvoice("pending")}>
							Save & Send
						</button>
					</div>
				</div>
			)
		: (
				<div className="w-full absolute bottom-8 md:bottom-8  px-5 md:px-11 right-0">
					<div className="md:float-right">
						<button
							onClick={hide}
							className="rounded-[30px] text-[14px] font-semibold text-[white]  py-3 px-6 bg-slate-400">
							Cancel
						</button>
						<button
							onClick={handleEdit}
							className="rounded-[30px] text-[14px] font-semibold text-[white] py-3 px-6 bg-[#9277FF]">
							Save Changes
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
