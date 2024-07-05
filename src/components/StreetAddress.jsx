import Input from "./Input";

export default function StreetAddress({ data, onChange }) {
	const inputData = [
		{
			id: 1,
			value: data.street,
			type: "text",

			name: "street",
			label: "Street Address",
		},
		{
			id: 2,
			value: data.city,
			type: "text",

			name: "city",
			label: "City",
		},

		{
			id: 3,
			value: data.postCode,
			type: "text",

			name: "postCode",
			label: "Post Code",
		},
		{
			id: 4,
			value: data.country,
			type: "text",

			name: "country",
			label: "Country",
		},
	];
	return (
		<div className="text-black grid grid-cols-1 md:grid-cols-3 gap-3  w-full ">
			{inputData.map((input) => (
				<div key={input.id} className="md:first:col-span-3">
					<Input
						label={input.label}
						value={input.value}
						onChange={onChange}
						name={input.name}
						type={input.type}
					/>
				</div>
			))}
		</div>
	);
}
