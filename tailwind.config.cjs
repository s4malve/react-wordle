/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      keyframes: {
        'reset-flipped-font': {
          '0%': {
            transform: 'perspective(400px) rotateY(180deg)'
          },
          '100%': {
            transform: 'perspective(400px) rotateY(180deg)'
          }
        },
        scale: {
          '0%': {
            transform: 'scale(1)'
          },
          '50%': {
            transform: 'scale(1.2)'
          },
          '100%': {
            transform: 'scale(1)'
          }
        },
        'flip-with-rotate': {
          '0%': {
            transform: 'perspective(400px) rotateY(0)'
          },
          '100%': {
            transform: 'perspective(400px) rotateY(180deg)'
          }
        }
      },
      animation: {
        scale: 'scale .5s ease-in-out forwards',
        'flip-with-rotate': 'flip-with-rotate .5s ease-in-out forwards',
        'reset-flipped-font': 'reset-flipped-font .1s ease-in-out forwards'
      }
    }
  },
  plugins: []
}
