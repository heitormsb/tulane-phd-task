export type ConversionEvent = 'contact_click' | 'demo_started' | 'demo_completed' | 'scenario_selected';
export type ConversionProperties = { locale: string; placement?: string; scenario?: string; source_count?: number };

// Local event contract; the optional analytics integration is the only sender.
export function emitConversion(name: ConversionEvent, properties: ConversionProperties) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tessila:conversion', { detail: { name, properties } }));
  }
}
