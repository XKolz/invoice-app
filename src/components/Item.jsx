/* eslint-disable react-hooks/exhaustive-deps */
import Input from "./Input";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useEffect } from "react";
import { useInvoice } from "@/context/invoice";

const Item = ({ data, index, deleteItem }) => {
	const { handleItemChange } = useInvoice();

	useEffect(() => {
		const total = data.quantity * data.price;
		const rounded = Math.round((total + Number.EPSILON) * 100) / 100;
		handleItemChange({ index, data: { total: rounded || 0 } });
	}, [data.price, data.quantity]);
	return (
		<div className="grid md:grid-cols-8 grid-cols-6 mb-3 gap-3">
			<div className="col-span-3">
				<Input
					label="Item name"
					value={data.name}
					onChange={(e) =>
						handleItemChange({ index, data: { name: e.target.value } })
					}
					name="itemName"
					type="text"
				/>
			</div>
			<div className="">
				<Input
					label="Qty."
					value={data.quantity}
					onChange={(e) =>
						handleItemChange({ index, data: { quantity: e.target.value } })
					}
					name="quantity"
					type="number"
				/>
			</div>
			<div className="col-span-2">
				<Input
					label="Price"
					value={data.price}
					onChange={(e) =>
						handleItemChange({
							index,
							data: {
								price: e.target.value,
							},
						})
					}
					name="price"
					type="number"
				/>
			</div>
			<div className="h-full col-span-2 md:col-auto">
				<label className=" block mb-2 text-[15px] capitalize font-light text-[var(--input-label-color)]">
					Total
				</label>
				<div className="w-full py-3 px-1 font-bold text-[14px] bg-[var(--secondary-bg-color)] text-[var(--input-color)] shadow-md border border-[#252945] rounded-md ">
					{data.total}
				</div>
			</div>
			<button
				onClick={() => deleteItem(index)}
				type="button"
				className="mt-[25px]">
				<BiSolidTrashAlt />
			</button>
		</div>
	);
};
export default Item;
