import Link from "next/link";
export default function Invoice({ data }) {
	return (
		<Link
			href={`/invoice/${data.id}`}
			className="text-[var(--text-color)]  duration-300 transition-all ease-linear hover:shadow-2xl cursor-pointer hover:border-[#9277FF] hover:border-2 hover:border-solid justify-between md:justify-start bg-[var(--secondary-bg-color)] mb-3 p-[25px] rounded-md grid  auto-rows-auto grid-cols-2  md:grid-cols-5  gap-3  ">
			<div className="">
				<span className=" inline-block text-[#9277FF]">#</span>
				<h4 className="inline-block font-bold text-[16px]">{data?.id}</h4>
			</div>
			<div className="text-[var(--small-text-color)] text=[14px] font-light">
				<p>Due {data?.paymentDue}</p>
			</div>
			<div className="col-span-2 md:col-auto">
				<p className="text=[14px] font-light">{data?.clientName}</p>
			</div>
			<div className="text-[18px]  font-extrabold">
				<h3>${data?.total}</h3>
			</div>
			<div
				className={`md:ml-6 h-9 flex rounded-md justify-center items-center gap-1 font-medium ${
					data.status === "pending"
						? "dark:bg-[#2B2736] bg-[#FFF8F0]"
						: data.status === "paid"
						? "dark:bg-[#1F2C3F] bg-[#F3FDF9] "
						: "dark:bg-[#292C45] bg-[#F3F3F5]"
				}`}>
				<div
					className={`w-2 h-2 rounded-full ${
						data.status === "pending"
							? "bg-[#FF8F00]"
							: data.status === "paid"
							? "bg-[#23B199]"
							: "bg-[#81BBEF]"
					}`}></div>
				<p
					className={`capitalize ${
						data.status === "pending"
							? "text-[#FF8F00]"
							: data.status === "paid"
							? "text-[#23B199]"
							: "text-[#81BBEF]"
					}`}>
					{data?.status}
				</p>
			</div>
		</Link>
	);
}
