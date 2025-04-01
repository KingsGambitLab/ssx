import { AlumniProvider } from '@/modules/alumni-directory/context/AlumniContext';
export default function Layout(
  { children }:
    { children: React.ReactNode }
) {
  return (
    <AlumniProvider>
      {children}
    </AlumniProvider>
  )
}