import { useState } from "react";

const useFormData = (initialValues) => {
	const [formData, setFormData] = useState(initialValues);

	const updateFormData = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const resetFormData = () => {
		setFormData(initialValues);
	};

	return [formData, setFormData, updateFormData, resetFormData];
};
export default useFormData;
