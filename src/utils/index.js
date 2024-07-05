function generateUniqueCode() {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numbers = "0123456789";
	let code = "";

	// Generate the first two capital letters
	for (let i = 0; i < 2; i++) {
		const randomLetter = letters.charAt(
			Math.floor(Math.random() * letters.length)
		);
		code += randomLetter;
	}

	// Generate the 5 numbers
	for (let i = 0; i < 4; i++) {
		const randomNumber = numbers.charAt(
			Math.floor(Math.random() * numbers.length)
		);
		code += randomNumber;
	}

	return code;
}

// Example usage:
export const uniqueCode = generateUniqueCode();
