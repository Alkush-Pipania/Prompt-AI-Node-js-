import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'text-shady': '#D6D8E8',
  			'neutrals-1': '#ffffff',
  			'neutrals-2': '#fcfcfd',
  			'neutrals-3': '#f5f5f6',
  			'neutrals-4': '#f0f0f1',
  			'neutrals-5': '#d9d9dc',
  			'neutrals-6': '#c0bfc4',
  			'neutrals-7': '#8e8c95',
  			'neutrals-8': '#5b5966',
  			'neutrals-9': '#474553',
  			'neutrals-10': '#292637',
  			'neutrals-11': '#211f30',
  			'neutrals-12': '#171427',
  			'neutrals-13': '#030014',
  			'washed-purple-50': '#f8f7fd',
  			'washed-purple-100': '#e8e7fa',
  			'washed-purple-200': '#dddcf7',
  			'washed-purple-300': '#cdcbf4',
  			'washed-purple-400': '#c4c1f1',
  			'washed-purple-500': '#b5b2ee',
  			'washed-purple-600': '#a5a2d9',
  			'washed-purple-700': '#817ea9',
  			'washed-purple-800': '#646283',
  			'washed-purple-900': '#4c4b64',
  			'washed-blue-50': '#f0f3ff',
  			'washed-blue-100': '#d0daff',
  			'washed-blue-200': '#bac9ff',
  			'washed-blue-300': '#9ab0ff',
  			'washed-blue-400': '#86a1ff',
  			'washed-blue-500': '#6889ff',
  			'washed-blue-600': '#5f7de8',
  			'washed-blue-700': '#4a61b5',
  			'washed-blue-800': '#394b8c',
  			'washed-blue-900': '#2c3a6b',
  			'primary-blue-50': '#e6f0ff',
  			'primary-blue-100': '#b1d1ff',
  			'primary-blue-200': '#8cbaff',
  			'primary-blue-300': '#579bff',
  			'primary-blue-400': '#3687ff',
  			'primary-blue-500': '#0469ff',
  			'primary-blue-600': '#0460e8',
  			'primary-blue-700': '#034bb5',
  			'primary-blue-800': '#023a8c',
  			'primary-blue-900': '#022c6b',
  			'primary-purple-50': '#f1e6ff',
  			'primary-purple-100': '#d3b0ff',
  			'primary-purple-200': '#bd8aff',
  			'primary-purple-300': '#9f54ff',
  			'primary-purple-400': '#8d33ff',
  			'primary-purple-500': '#7000ff',
  			'primary-purple-600': '#6600e8',
  			'primary-purple-700': '#5000b5',
  			'primary-purple-800': '#3e008c',
  			'primary-purple-900': '#2f006b',
  			'brand-washedPurple': '#b5b2ee',
  			'brand-washedblue': '#6889ff',
  			'brand-primaryblue': '#7000ff',
  			'brand-asliblue': '#0469FF',
  			'brand-dark': '#030014',
  			'brand/main-bg': '#0F172A',
  			darkBg: '#1F1B2E',
  			lightGray: '#EAEAEA',
  			pureWhite: '#FFFFFF',
  			purpleShadow: '#3A275C',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
