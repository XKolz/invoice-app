import React, { useRef, useState } from "react";
import Modal from "./Modal";
import InvoiceForm from "./InvoiceForm";
import { useInvoice } from "@/context/invoice";
import { FaPlus } from "react-icons/fa";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function HomeHeader({ data, allContent, setContent, invoices }) {
	const dropRef = useRef();
	const [ref] = useOnClickOutside(dropRef, () => setDropdown(false));
	const [dropdown, setDropdown] = useState(false);
	const { resetInvoice } = useInvoice();
	const [isShowing, setIsShowing] = useState(false);
	const categories = ["paid", "draft", "pending"];
	const [activeCategory, setActiveCategory] = useState();
	const handleFilter = (category) => {
		const result = allContent.filter((content) => content.status === category);
		setContent(result);
		setActiveCategory(category);
		setDropdown(false);
	};
	const handleAll = () => {
		setActiveCategory("");
		setContent(data);
		setDropdown(false);
	};
	const handleNewInvoice = () => {
		resetInvoice();
		setIsShowing(true);
	};
	return (
		<div className="flex justify-between py-7 md:p-0 md:h-[104px] items-center text-[var(--text-color)]">
			<div className="h-full">
				<h1 className= "text-[25px] md:text-[40px] font-bold">Invoices</h1>
				<p className="text-[var(--small-text-color)] text-sm">
					There are{" "}
					{!activeCategory
						? `${invoices?.length} total`
						: `${
								invoices.length > 0 ? invoices.length : "no"
						  } ${activeCategory}`}{" "}
					invoices
				</p>
			</div>
			<div className="flex justify-between md:w-1/2 h-full gap-3 items-center">
				<div className="relative ">
					<div>
						<button 
							className="inline-flex items-center gap-2"
							onClick={() => setDropdown(!dropdown)}>
							Filter by status{" "}
							{!dropdown ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
						</button>
					</div>
					{dropdown && (
						<div
							ref={ref}
							className="absolute top-9 py-7 px-5  bg-[var(--secondary-bg-color)] shadow-xlg text-[var(--text-color)]font-medium w-[200px] rounded-md left-[-30px] ">
							<div className="flex gap-5 items-center">
								<input
									type="checkbox"
									className="checked:bg-slate-500"
									checked={!activeCategory}
								/>
								<button
									className="capitalize w-full text-left font-semibold"
									onClick={handleAll}>
									All
								</button>
							</div>
							{categories.map((category) => (
								<div className="flex gap-5 items-center mt-3" key={category}>
									<input
										type="checkbox"
										checked={activeCategory === category}
									/>
									<button
										className="capitalize w-full text-left font-semibold"
										onClick={() => handleFilter(category)}>
										{category}
									</button>
								</div>
							))}
						</div>
					)}
				</div>
				<div className="h-[50px] flex items-center justify-start">
					<button
						className="md:pl-3 text-white md:pr-5 my-auto md:bg-[#7C5DFA] h-full rounded-[30px] gap-2   flex items-center text-left w-full "
						onClick={handleNewInvoice}>
						<div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
							<FaPlus
								style={{
									backgroundColor: "white",
									fontSize: "16px",
									color: "#7C5DFA",
								}}
							/>
						</div>
						<span className="hidden md:block">New Invoice</span>
					</button>
				</div>
			</div>
			<Modal
				isShowing={isShowing}
				hide={() => setIsShowing(false)}
				render={(hide) => <InvoiceForm hide={hide} />}
			/>
		</div>
	);
}
