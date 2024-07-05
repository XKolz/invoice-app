/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				myAnim: {
					"0%": {
						opacity: "0",
						transform: "translateX(-50px)",
					},

					"100% ": {
						opacity: "1",
						transform: "translateX(0)",
					},
				},
			},
			animation: {
				left: "myAnim 300ms ease-in",
			},
		},
	},
	plugins: [],
};
