import { Roboto } from 'next/font/google';
import { Montserrat } from 'next/font/google';
import { Merriweather } from 'next/font/google';

// Body font (already configured)
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

// Title font (bold, attention-grabbing)
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

// Subtitle font (more elegant, complementary)
export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
});