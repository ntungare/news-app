import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals/attribution';

onCLS((metric) => console.log('CLS:', metric));
onFCP((metric) => console.log('FCP:', metric));
onINP((metric) => console.log('INP:', metric));
onLCP((metric) => console.log('LCP:', metric));
onTTFB((metric) => console.log('TTFB:', metric));
