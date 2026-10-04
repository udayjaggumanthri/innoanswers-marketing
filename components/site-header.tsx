const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/solutions", label: "Technology / Solutions" },
  { href: "/blogs", label: "Blogs" },
] as const;

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground px-5 py-4">
      <nav aria-label="Main" className="site-nav">
        <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        className="contact-action inline-flex min-h-11 min-w-11 items-center justify-center bg-accent px-4 py-2 font-semibold text-accent-foreground no-underline"
        href="/contact"
      >
        Contact Us
      </a>
    </header>
  );
}
