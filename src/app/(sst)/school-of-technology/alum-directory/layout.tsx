export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Alum Directory</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}