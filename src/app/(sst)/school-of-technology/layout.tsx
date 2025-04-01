import { AlumniProvider } from '@/hooks/useAlumniList';
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