import type { Config } from 'tailwindcss';

/**
 * Fauzey colour system. Contrast notes (WCAG 2.2 AA):
 *  - espresso / ink on cream, butter, snow: > 9:1
 *  - muted on cream: ~5.6:1 (body-safe)
 *  - chestnut on cream: ~6:1 (body-safe)
 *  - amber is decorative only (rules, underlines, large display); never small text
 *  - on espresso use butter / almond / snow for text
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#611F0A',
        chestnut: '#8D4B1F',
        amber: '#B46F39',
        almond: '#D6AE7C',
        butter: '#F0D9A7',
        snow: '#FFFDF8',
        cream: '#FBF3E3',
        ink: '#2B160D',
        muted: '#765B49',
        rule: '#DCC09A',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"Manrope Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: { label: '0.18em' },
      maxWidth: { page: '88rem' },
      transitionTimingFunction: { slow: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    },
  },
  plugins: [],
};

export default config;
