export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 text-white p-4">
        <img src="/assets/AvistandooLogo.png" className="object-cover" />
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-blue-900 text-white p-2 text-center">
        &copy; 2025 Avistandoo
      </footer>
    </div>
  );
}
