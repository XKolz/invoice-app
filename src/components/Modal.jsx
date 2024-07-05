import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ render, isShowing, hide }) {
	return (
		<>
			{isShowing &&
				createPortal(
					<div className="absolute inset-0  bg-[#0A0B1290] h-screen w-full">
						<>{render(hide)}</>
					</div>,
					document.body
				)}
		</>
	);
}
