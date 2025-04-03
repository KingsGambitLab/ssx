import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}