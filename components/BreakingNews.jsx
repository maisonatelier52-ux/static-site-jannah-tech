'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPostUrl } from '@/lib/data';

export default function BreakingNews({ breaking }) {

  const [breakingIndex, setBreakingIndex] = useState(0);


  useEffect(() => {

    const timer = setInterval(() => {

      setBreakingIndex((prev) =>
        (prev + 1) % breaking.length
      );

    }, 5000);


    return () => clearInterval(timer);

  }, [breaking.length]);


  return (

    <div className="
      flex-1
      overflow-hidden
      relative
      h-full
      flex
      items-center
    ">

      <Link
        href={getPostUrl(breaking[breakingIndex])}
        className="
          breaking-flash
          text-sm
          font-medium
          text-ink
          hover:text-brand
          transition-colors
          truncate
        "
      >

        {breaking[breakingIndex]?.title}

      </Link>


    </div>

  );

}