export default function Layout({ children }) {
  return (
    <>
      <main className="bg-yellow-50 min-h-screen p-4 md:p-8">
        { children }
      </main>
    </>
  )
}
