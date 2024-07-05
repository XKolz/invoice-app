import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRef } from "react";
export default function DeleteModal({ hide, action, id }) {
	const modalRef = useRef();
	const [ref] = useOnClickOutside(modalRef, hide);
	return (
		<div
			ref={ref}
			className=" dark:text-white text-black p-11 w-[95%] md:w-[35%] my-auto h-full flex items-center justify-center mx-auto">
			<div className="bg-[var(--secondary-bg-color)] w-full my-auto p-[20px] md:p-[40px]  rounded-lg">
				<h2 className="font-extrabold text-[30px] my-5">Confirm Deletion</h2>
				<p className="text-[var(--input-label-color)] text-sm">
					Are you sure you want to delete invoice{" "}
					<span className="text-[#9277FF]">{id}</span>. This action cannot be
					undone
				</p>
				<div className="w-full mt-[20px]">
					<div className="float-right">
						<button
							onClick={hide}
							className="rounded-[30px] text-[14px] font-semibold text-black dark:text-[white]  py-3 px-6 bg-[var(--secondary-bg-color)]">
							Cancel
						</button>
						<button
							onClick={() => action(hide)}
							className="rounded-[30px] text-[14px] font-semibold text-[black] dark:text-[white] py-3 px-6 bg-[#f85f5f]">
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
