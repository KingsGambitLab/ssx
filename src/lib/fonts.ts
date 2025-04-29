import { Nunito, Montserrat, Poppins, Plus_Jakarta_Sans } from 'next/font/google';

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-nunito',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-poppins',
});


export const PlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const fontVariables = [
  nunito.variable,
  montserrat.variable,
  poppins.variable,
  PlusJakartaSans.variable,
].join(' ');
