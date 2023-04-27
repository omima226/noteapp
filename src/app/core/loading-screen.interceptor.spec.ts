import { TestBed } from '@angular/core/testing';

import { LoadingScreenInterceptor } from './loading-screen.interceptor';

describe('LoadingScreenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoadingScreenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoadingScreenInterceptor = TestBed.inject(LoadingScreenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
