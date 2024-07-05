import React from "react";

export default function Input({
	label,
	value,
	onChange,
	type,
	name,
	placeholder,
}) {
	return (
		<>
			<label
				className=" block mb-2 text-[15px] capitalize font-light text-[var(--input-label-color)]"
				htmlFor={name}>
				{label}
			</label>
			<input
				className="w-full p-3 font-bold text-[14px] bg-[var(--secondary-bg-color)] text-[var(--input-color)] border border-[#DFE3FA] dark:border-[#252945] rounded-md "
				value={value}
				type={type}
				onChange={onChange}
				name={name}
				placeholder={placeholder}
			/>
		</>
	);
}
