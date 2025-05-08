module.exports = {
    content: ['./src/**/*.{astro,html,,css,js,jsx,ts,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          heading: ['"Playfair Display"', 'serif'],
          body: ['"Open Sans"', 'sans-serif'],
          heading: ['"Open Sans"', '"serif"'],
          // sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
        },
        colors: {
          primary: '#002b45',
          accent: '#e9634b',
          background: '#f4eada',
        }
      }
    }
  }

