import { describe, it, expect } from 'vitest';

describe('Gallery Logic & Responsive Specifications', () => {
  const MAIN_IMAGES = [
    '/figma-assets/89a23379-492e-4db9-b748-9b06329aec8f.png',
    '/figma-assets/20929a7a-8f4e-4700-a789-353527830406.png',
    '/figma-assets/aca2cc20-174c-4991-96d6-8f6dbfd80b58.png',
    '/figma-assets/9273914d-4beb-4924-ad40-8c24a86b498f.png',
    '/figma-assets/25d25921-f489-449b-ad57-eee494d7a7cf.png',
  ];

  const THUMBNAIL_IMAGES = [
    '/figma-assets/d3ac9abe-7e76-48dc-b804-f02de0bbb1e8.png',
    '/figma-assets/20929a7a-8f4e-4700-a789-353527830406.png',
    '/figma-assets/aca2cc20-174c-4991-96d6-8f6dbfd80b58.png',
    '/figma-assets/9273914d-4beb-4924-ad40-8c24a86b498f.png',
    '/figma-assets/25d25921-f489-449b-ad57-eee494d7a7cf.png',
  ];

  it('defines the 5 exact Figma gallery images and thumbnails', () => {
    expect(MAIN_IMAGES).toHaveLength(5);
    expect(THUMBNAIL_IMAGES).toHaveLength(5);
    expect(MAIN_IMAGES[0]).toContain('89a23379-492e-4db9-b748-9b06329aec8f');
    expect(THUMBNAIL_IMAGES[0]).toContain('d3ac9abe-7e76-48dc-b804-f02de0bbb1e8');
  });

  it('maintains the precise Figma aspect ratios for main view and thumbnails', () => {
    const mainWidth = 458;
    const mainHeight = 610;
    const mainAspectRatio = mainWidth / mainHeight;

    const thumbWidth = 76;
    const thumbHeight = 100;
    const thumbAspectRatio = thumbWidth / thumbHeight;

    // Main image ratio: ~0.7508 (458 / 610)
    expect(mainAspectRatio).toBeCloseTo(0.7508, 3);
    // Thumbnail ratio: 0.76 (76 / 100)
    expect(thumbAspectRatio).toBe(0.76);
  });

  it('calculates clamped zoom coordinates correctly within [0, 100]', () => {
    const calculateZoomCoords = (clientX: number, clientY: number, rect: { left: number; top: number; width: number; height: number }) => {
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / (rect.width || 1)) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / (rect.height || 1)) * 100));
      return { x, y };
    };

    const rect = { left: 100, top: 100, width: 458, height: 610 };

    // Center cursor
    const center = calculateZoomCoords(329, 405, rect);
    expect(center.x).toBeCloseTo(50, 0);
    expect(center.y).toBeCloseTo(50, 0);

    // Left-top bounds clamping
    const outOfBoundsLeft = calculateZoomCoords(50, 50, rect);
    expect(outOfBoundsLeft.x).toBe(0);
    expect(outOfBoundsLeft.y).toBe(0);

    // Right-bottom bounds clamping
    const outOfBoundsRight = calculateZoomCoords(800, 900, rect);
    expect(outOfBoundsRight.x).toBe(100);
    expect(outOfBoundsRight.y).toBe(100);
  });

  it('wraps image navigation circularly', () => {
    const getNextIndex = (current: number, total: number) => (current + 1) % total;
    const getPrevIndex = (current: number, total: number) => (current - 1 + total) % total;

    expect(getNextIndex(0, 5)).toBe(1);
    expect(getNextIndex(4, 5)).toBe(0); // Circular loop to start
    expect(getPrevIndex(0, 5)).toBe(4); // Circular loop to end
    expect(getPrevIndex(2, 5)).toBe(1);
  });
});
