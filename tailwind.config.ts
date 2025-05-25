import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				card: {
					DEFAULT: 'var(--color-card)',
					foreground: 'var(--color-card-foreground)',
				},
				popover: {
					DEFAULT: 'var(--color-popover)',
					foreground: 'var(--color-popover-foreground)',
				},
				primary: {
					DEFAULT: 'var(--color-primary)',
					foreground: 'var(--color-primary-foreground)',
				},
				secondary: {
					DEFAULT: 'var(--color-secondary)',
					foreground: 'var(--color-secondary-foreground)',
				},
				muted: {
					DEFAULT: 'var(--color-muted)',
					foreground: 'var(--color-muted-foreground)',
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					foreground: 'var(--color-accent-foreground)',
				},
				destructive: {
					DEFAULT: 'var(--color-destructive)',
					foreground: 'var(--color-destructive-foreground)',
				},
				border: 'var(--color-border)',
				input: 'var(--color-input)',
				ring: 'var(--color-ring)',
				// Zawajuna elegant color palette
				zawajuna: {
					rosewood: '#9F8170',
					'desert-sand': '#F5E9E1',
					'dusty-pink': '#C3A6A0',
					'olive-taupe': '#80735C',
					'light-beige': '#FBF7F4',
					'deep-charcoal': '#333333',
					'muted-brown': '#7A6D64',
					'warm-clay': '#A68A79',
					linen: '#EDE5DD',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['Sora', 'Lato', 'system-ui', 'sans-serif'],
				arabic: ['Amiri', 'Times New Roman', 'serif'],
			},
		},
	},
	plugins: [],
}

export default config 