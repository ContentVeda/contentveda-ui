import { observeLazyMount } from '../../src/utils/lazyObserver';

describe('lazyObserver', () => {
  let mockObserver: any;
  let mockObserve: any;
  let mockUnobserve: any;
  let mockDisconnect: any;
  
  beforeEach(() => {
    mockObserve = vi.fn();
    mockUnobserve = vi.fn();
    mockDisconnect = vi.fn();
    
    mockObserver = {
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    };
    
    vi.stubGlobal('IntersectionObserver', vi.fn(function(callback: any) {
      this.observe = mockObserve;
      this.unobserve = mockUnobserve;
      this.disconnect = mockDisconnect;
      return this;
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should call onIntersect when element intersects', () => {
    const el = document.createElement('div');
    const onIntersect = vi.fn();
    
    observeLazyMount(el, onIntersect);
    
    expect(mockObserve).toHaveBeenCalledWith(el);
  });
});
