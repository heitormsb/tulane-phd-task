'use client';

import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';
import { emitConversion, type ConversionEvent, type ConversionProperties } from './conversions';

export default function ConversionAnalytics({ enabled, locale }: { enabled: boolean; locale: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[data-contact]') : null;
      if (target) emitConversion('contact_click', { locale, placement: target.dataset.contact });
    };
    const onConversion = (event: Event) => {
      if (!enabled) return;
      const { name, properties } = (event as CustomEvent<{ name: ConversionEvent; properties: ConversionProperties }>).detail;
      track(name, properties);
    };
    document.addEventListener('click', onClick);
    window.addEventListener('tessila:conversion', onConversion);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('tessila:conversion', onConversion);
    };
  }, [enabled, locale]);
  return enabled ? <Analytics mode="production" beforeSend={event => ({ ...event, url: event.url.split(/[?#]/)[0] })} /> : null;
}
