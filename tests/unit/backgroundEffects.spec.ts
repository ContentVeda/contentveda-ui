import { describe, it, expect, vi } from 'vitest';
import { defaultBackgroundEffectPlugin, BackgroundEffectContext } from '../../src/utils/backgroundEffects';

describe('backgroundEffects', () => {
  it('should start an effect and populate ctxBox', () => {
    const canvas = document.createElement('canvas');
    canvas.getContext = vi.fn().mockReturnValue({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      fill: vi.fn(),
      arc: vi.fn(),
    });
    
    const ctxBox: BackgroundEffectContext = { animationFrameId: null, resizeHandler: null, resizeObserver: null };
    defaultBackgroundEffectPlugin.start(canvas, 'particles', ctxBox);
    
    expect(ctxBox.animationFrameId).not.toBeNull();
    expect(ctxBox.resizeHandler).not.toBeNull();
    
    // Cleanup
    defaultBackgroundEffectPlugin.stop(ctxBox);
    expect(ctxBox.animationFrameId).toBeNull();
  });
  
  it('should handle "none" effect properly', () => {
    const canvas = document.createElement('canvas');
    const ctxBox: BackgroundEffectContext = { animationFrameId: null, resizeHandler: null, resizeObserver: null };
    defaultBackgroundEffectPlugin.start(canvas, 'none', ctxBox);
    
    expect(ctxBox.animationFrameId).toBeNull();
  });

  it('should fall back to "none" on invalid effect', () => {
    const canvas = document.createElement('canvas');
    const ctxBox: BackgroundEffectContext = { animationFrameId: null, resizeHandler: null, resizeObserver: null };
    defaultBackgroundEffectPlugin.start(canvas, 'invalid_effect' as any, ctxBox);
    
    expect(ctxBox.animationFrameId).toBeNull();
  });
});
