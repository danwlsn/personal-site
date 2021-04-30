export default function Layout({ children }) {
  return (
    <>
      <main className="bg-yellow-50 h-full min-h-full p-4 md:p-8">
        { children }
      </main>
    </>
  )
}
