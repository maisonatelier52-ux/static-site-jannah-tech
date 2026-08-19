import Link from 'next/link';
import Icon from '@/components/Icon';
import MobileMenu from '@/components/MobileMenu';
import NavLinks from '@/components/NavLinks';
import Logo from '@/components/Logo';
import { getSite, getTrendingPosts, formatFullDate } from '@/lib/data';
import BreakingNews from '@/components/BreakingNews';

export default function Header() {
  const site = getSite();
  const breaking = getTrendingPosts(6);
  const today = formatFullDate();

  return (
    <header className="bg-white">

      {/* Masthead: date left, wordmark centered, account actions right */}
      <div className="max-w-container mx-auto px-4 grid grid-cols-3 items-center h-14 sm:h-20">

        {/* Left: mobile hamburger + date (date hidden on small screens to make room for the logo) */}
        <div className="flex items-center justify-start gap-3">
          <MobileMenu navItems={site.mainNav} />
          <span className="hidden sm:inline text-xs sm:text-sm font-serif font-normal text-ink-light">
            {today}
          </span>
        </div>

        {/* Center: wordmark */}
        <Link href="/" className="flex items-center justify-center">
          <Logo size="lg" />
        </Link>

        {/* Right: log in + search (mobile), + account/search (desktop) */}
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <Link
            href="#"
            className="hidden sm:inline text-sm font-semibold text-ink hover:text-brand transition-colors"
          >
            Log in
          </Link>
          <span className="hidden sm:inline w-px h-4 bg-gray-300" aria-hidden="true" />
          <button
            aria-label="Search"
            className="flex items-center justify-center w-9 h-9 text-ink hover:text-brand transition-colors"
          >
            <Icon name="search" className="w-5 h-5" filled={false} />
          </button>
        </div>
      </div>

      {/* Nav bar: category links centered, Menu control right, separated by a rule */}
      <div className="hidden lg:block border-t border-b border-ink">
        <div className="max-w-container mx-auto px-4 grid grid-cols-3 items-center h-12">
          <span aria-hidden="true" />
          <div className="flex items-center justify-center">
            <NavLinks navItems={site.mainNav} />
          </div>

          <button
            aria-label="Menu"
            className="flex items-center justify-self-end gap-2 px-2 py-2 text-[15px] font-serif font-normal text-ink hover:text-brand transition-colors"
          >
            <span>Menu</span>
            <Icon name="menu" className="w-5 h-5" filled={false} />
          </button>
        </div>
      </div>

      {/* Thin rule under the masthead on mobile/tablet, where the desktop nav row is hidden */}
      <div className="lg:hidden border-t border-ink" />

{/* Breaking news ticker */}
<div className="
  flex
  items-center
  h-10
  overflow-hidden
  border-t
  border-gray-100
  bg-white
">

    {/* Flash Badge — flush to the left edge of the screen, no red container fill */}
<span className="
  flex
  items-center
  gap-2
  shrink-0
  bg-white
  text-[#0F3D91]
  pl-4
  pr-4
  sm:pl-6
  py-3
  text-sm
  font-extrabold
  uppercase
  tracking-wide
">

      <Icon
        name="bolt"
        className="
          w-3.5
          h-3.5
          animate-breaking-pulse
        "
      />

      Breaking News

    </span>



    {/* Flash Headline */}
    <div className="flex-1 px-4 min-w-0">
      <BreakingNews breaking={breaking} />
    </div>



    {/* Prev/Next controls — pinned to the right end of the bar */}
    <div className="
      hidden
      md:flex
      items-center
      gap-2
      shrink-0
      pr-4
      sm:pr-6
    ">


      <button
        aria-label="Previous headline"
        className="
          w-7
          h-7
          flex
          items-center
          justify-center
          border
          border-gray-300
          rounded
          text-gray-400
          hover:text-brand
          hover:border-brand
          transition
        "
      >

        <Icon
          name="chevronRight"
          className="w-3.5 h-3.5 rotate-180"
          filled={false}
        />

      </button>



      <button
        aria-label="Next headline"
        className="
          w-7
          h-7
          flex
          items-center
          justify-center
          border
          border-gray-300
          rounded
          text-gray-400
          hover:text-brand
          hover:border-brand
          transition
        "
      >

        <Icon
          name="chevronRight"
          className="w-3.5 h-3.5"
          filled={false}
        />

      </button>


    </div>

</div>
    </header>
  );
}
