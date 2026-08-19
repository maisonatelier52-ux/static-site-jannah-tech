'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({ navItems }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-[15px] font-normal font-serif transition-colors ${
              active ? 'text-brand' : 'text-ink hover:text-brand'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
