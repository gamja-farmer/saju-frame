'use client';

import { useEffect, useRef } from 'react';

/**
 * Google AdSense display ad unit.
 * Renders an empty container until AdSense is approved and the script loads.
 * Uses `data-ad-slot` which should be replaced with an actual ad unit ID
 * once you create one in the AdSense dashboard.
 */
export function AdBanner() {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] })
        .adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      /* AdSense script not loaded yet — no-op */
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  if (!clientId) return null;

  return (
    <ins
      ref={adRef}
      className="adsbygoogle block w-full min-h-[90px]"
      style={{ display: 'block' }}
      data-ad-client={clientId}
      data-ad-slot="auto"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
