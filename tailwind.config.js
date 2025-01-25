/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class", ""],
    important: true,
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
		extend: {
			colors: {
				primary: "#0f2a59"
			}
		}
	},
	plugins: []
};