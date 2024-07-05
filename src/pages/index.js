import HomeHeader from "@/components/HomeHeader";
import Invoice from "@/components/Invoice";
import { useAllInvoice } from "@/context/AllInvoices";
import { emptyField } from "@/images";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
	const { allInvoices } = useAllInvoice();
	const [invoices, setInvoices] = useState();
	const sortedInvoices = allInvoices?.sort((a, b) => b.createdAt - a.createdAt);
	console.log(sortedInvoices)
	useEffect(() => {
		setInvoices(sortedInvoices);
	}, [sortedInvoices]);
	return (
		<>
			<HomeHeader
				allContent={allInvoices}
				data={sortedInvoices}
				invoices={invoices}
				setContent={setInvoices}
			/>
			<div className="w-full h-[90vh] md:h-[70vh] overflow-scroll remove-scrollbar">
				{invoices?.length === 0 && (
					<div className=" w-full text-center  ">
						<div className="my-5 w-full">
							<Image src={emptyField} alt="" style={{ margin: "auto" }} />
						</div>
						<h2 className="text-[20px] font-extrabold my-7 text-[var(--small-text-color)] ">
							There is nothing here
						</h2>
						<p className="text-[15px] text-[var(--small-text-color)] w-1/2 m-auto">
							Create an invoice by clicking the <strong>New Invoice</strong>{" "}
							button and get started.
						</p>
					</div>
				)}
				{invoices?.map((invoice) => (
					<Invoice data={invoice} key={invoice.id} />
				))}
			</div>
		</>
	);
}
