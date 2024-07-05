import { useInvoice } from "@/context/invoice";
import Item from "./Item";
import { useEffect } from "react";

export default function Items() {
	const { invoice, handleAddItem, deleteItem, handleTotal } = useInvoice();
	// useEffect(() => {
	// 	const totals = invoice.items.map((item) => item.total);
	// 	const initialTotalAmount = totals.reduce((sum, cost) => {
	// 		const amount = cost;
	// 		if (isNaN(amount)) {
	// 			return sum; // Keep the current sum if amount is NaN
	// 		}
	// 		return sum + amount;
	// 	}, 0);

	// 	handleTotal(initialTotalAmount);
	// }, [invoice.items]);
	return (
		<div>
			<h3 className="text-[20px] text-[#363b53] font-bold my-9">Item List</h3>
			<div className="">
				{invoice.items.length > 0 &&
					invoice.items.map((item, i) => (
						<Item
							index={i}
							content={invoice.items}
							deleteItem={deleteItem}
							key={i}
							data={item}
						/>
					))}
			</div>
			<button
				type="button"
				className="text-[#9277FF] w-full text-center font-medium p-3 text-[14px] rounded-[30px] bg-[var(--secondary-bg-color)]"
				onClick={handleAddItem}>
				+ Add New Item
			</button>
		</div>
	);
}
