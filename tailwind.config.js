module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: '#5865F2',
        secondary: {
          DEFAULT: '#356C66',
          50: "#F5F8F7",
          100: "#EBF0F0",
          200: "#CDDAD9",
          300: "#AEC4C2",
          400: "#729894",
          500: "#356C66",
          600: "#30615C",
          700: "#28514D",
          800: "#20413D",
          900: "#223B41",
        },
        primary: {
          DEFAULT: '#3e3e3e',
        },
        silver: {
          DEFAULT: '#aaa9ad',
        },
        bronze: {
          DEFAULT: '#bf8970',
        },
        brand: {
          DEFAULT: '#257DE9',
          50: '#CCE0FA',
          100: '#B9D5F8',
          200: '#94BFF4',
          300: '#6FA9F0',
          400: '#4A93ED',
          500: '#257DE9',
          600: '#1462C2',
          700: '#0E488F',
          800: '#092F5C',
          900: '#041529',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans serif']
      }
    },
  },
  plugins: [],
}