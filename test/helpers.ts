import { bigtestGlobals } from '@bigtest/globals';


function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function converge<T>(fn: () => T): Promise<T> {
  let startTime = performance.now();
  while (true) {
    try {
      return fn();
    } catch (e) {
      let diff = performance.now() - startTime;
      if (diff > bigtestGlobals.defaultInteractorTimeout) {
        throw e;
      } else {
        await wait(1);
      }
    }
  }
}

export const assertPathname = (url: string) => {
  return () => {
    return converge(() => {
      let currentURL = bigtestGlobals.testFrame?.contentWindow?.location.pathname;
      if (currentURL !== url) {
        throw new Error(`expected ${url}, received ${currentURL}`);
      }
    });
  };
};

export const assertSearch = (url: string) => {
  return () => {
    return converge(() => {
      let currentURL = bigtestGlobals.testFrame?.contentWindow?.location.search;
      if (currentURL !== url) {
        throw new Error(`expected ${url}, received ${currentURL}`);
      }
    });
  };
};