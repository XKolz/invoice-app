import DeleteModal from "@/components/DeleteModal";
import InvoiceForm from "@/components/InvoiceForm";
import Modal from "@/components/Modal";
import { useAllInvoice } from "@/context/AllInvoices";
import { useInvoice } from "@/context/invoice";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Index() {
	const { allInvoices, changeStatus, handleDelete } = useAllInvoice();
	const [toggle, setToggle] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);
	const router = useRouter();
	const id = router.query.id;
	const result = allInvoices?.find((invoice) => invoice.id === id);
	const { updateInvoice } = useInvoice();
	const handleEdit = () => {
		updateInvoice(result);
		setToggle(true);
	};
	const handleInvoiceDelete = (hide) => {
		handleDelete(result.id);
		router.push("/");
		hide();
	};

	return (
		<>
			{result && (
				<div className="w-[95%]  md:w-[90%] mx-auto">
					<div>
						<button
							className="text-[#9277FF] items-center gap-3 text-[14px] inline-flex p-3 "
							onClick={() => router.back()}>
							<MdKeyboardArrowLeft />
							Go back
						</button>
					</div>
					<div className="flex flex-wrap p-[15px] md:p-[25px] mb-7 rounded-lg bg-[var(--secondary-bg-color)]  md:justify-between items-center text-[var(--text-color)]">
						<div className="flex items-center md:gap-2 lg:gap-5 gap-5  w-full md:w-1/5">
							<h2 className="">Status</h2>
							<div
								className={`lg:ml-6 h-9 flex rounded-md justify-center px-5 items-center gap-1 w-full font-medium ${
									result.status === "pending"
										? "dark:bg-[#2B2736] bg-[#FFF8F0]"
										: result.status === "paid"
										? "dark:bg-[#1F2C3F] bg-[#F3FDF9] "
										: "dark:bg-[#292C45] bg-[#F3F3F5]"
								}`}>
								<div
									className={`w-2 h-2 rounded-full ${
										result.status === "pending"
											? "bg-[#FF8F00]"
											: result.status === "paid"
											? "bg-[#23B199]"
											: "bg-[#81BBEF]"
									}`}></div>
								<p
									className={`capitalize ${
										result.status === "pending"
											? "text-[#FF8F00]"
											: result.status === "paid"
											? "text-[#23B199]"
											: "text-[#81BBEF]"
									}`}>
									{result?.status}
								</p>
							</div>
						</div>
						<div className="flex justify-between md:justify-start w-full md:w-auto gap-2 mt-4 md:mt-0 ">
							<button
								onClick={handleEdit}
								className="rounded-[10px] md:rounded-[30px]  text-[14px] font-semibold text-white py-3 px-6 bg-[#363b53]">
								Edit
							</button>
							<button
								className="rounded-[10px] md:rounded-[30px] text-[14px] font-semibold text-white py-3 px-6 bg-[#f85f5f]"
								onClick={() => setDeleteItem(true)}>
								Delete
							</button>
							{result.status !== "paid" && (
								<button
									onClick={() => changeStatus(result.id)}
									className="rounded-[10px] md:rounded-[30px]  text-[14px] font-semibold text-white py-3 px-6 bg-[#9277FF]">
									Mark as Paid
								</button>
							)}
						</div>
					</div>
					<div className="text-[var(--text-color)] w-full p-[15px] md:p-[25px] rounded-lg bg-[var(--secondary-bg-color)] ">
						<div className="flex justify-between ">
							<div className="">
								<span className=" inline-block text-[#9277FF]">#</span>
								<h4 className="inline-block font-bold text-[16px]">
									{result?.id}
								</h4>
								<p className="text-[14px] text-[var(--input-label-color)]  ">
									{result.description}
								</p>
							</div>
							<div className="text-right text-[14px] text-[var(--input-label-color)] ">
								<p>{result.senderAddress.street}</p>
								<p>{result.senderAddress.country}</p>
								<p>{result.senderAddress.postCode}</p>
								<p>{result.senderAddress.city}</p>
							</div>
						</div>
						<div className="grid grid-cols-2  md:grid-cols-3 text-[var(--text-color)] mt-5 ">
							<div className="h-inherit">
								<div className="w-">
									<p className="text-[var(--input-label-color)] text-[14px]">
										Invoice Date
									</p>
									<h3 className="text-[20px] font-extrabold">
										{result.createdAt}
									</h3>
								</div>
								<div className="mt-[30px]">
									<p className="text-[var(--input-label-color)] text-[14px]">
										Payment Due
									</p>
									<h3 className="text-[18px] font-extrabold">
										{result.paymentDue}
									</h3>
								</div>
							</div>
							<div className="justify-self-end md:justify-self-start text-right md:text-left">
								<p className="text-[var(--input-label-color)] text-[14px]">
									{" "}
									Bill To
								</p>
								<h2 className="font-bold">{result.clientName}</h2>
								<p className="text-[14px]">{result.clientAddress.street}</p>
								<p className="text-[14px]">{result.clientAddress.city}</p>
								<p className="text-[14px]">{result.clientAddress.postCode}</p>
								<p className="text-[14px]">{result.clientAddress.country}</p>
							</div>
							<div>
								<p className="text-[var(--input-label-color)] text-[14px]">
									Sent to
								</p>
								<h2 className="font-bold ">{result.clientEmail}</h2>
							</div>
						</div>
						<div className="w-full px-2 md:px-5 py-7 dark:bg-[#252945] bg-[#F9FAFE] mt-5 relative rounded-t-lg">
							<table className="w-full text-left p-9 ">
								<thead>
									<th className="font-light">Item Name</th>
									<th className="font-light">Qty</th>
									<th className="font-light">Price</th>
									<th className="font-light">Total</th>
								</thead>
								<tbody>
									{result.items?.map((item) => (
										<tr className="text-[15px] text-left" key={item.name}>
											<td className="py-2 font-bold text-left">{item.name}</td>
											<td className="py-2 font-bold">{item.price}</td>
											<td className="py-2 font-bold">{item.quantity}</td>
											<td className="py-2 font-bold">{item.total}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="p-9 flex justify-between text-[var(--input-label-color)] dark:text-white items-center rounded-b-lg dark:bg-black bg-[#252945] w-full">
							<div>
								<h2 className="text-[15px]">Amount Due</h2>
							</div>
							<div>
								<h2 className="text-[23px] font-extrabold">${result.total}</h2>
							</div>
						</div>
					</div>
				</div>
			)}
			<Modal
				isShowing={toggle}
				hide={() => setToggle(false)}
				render={(hide) => <InvoiceForm hide={hide} edit />}
			/>
			<Modal
				isShowing={deleteItem}
				hide={() => setDeleteItem(false)}
				render={(hide) => (
					<DeleteModal
						hide={hide}
						action={handleInvoiceDelete}
						id={result.id}
					/>
				)}
			/>
		</>
	);
}
