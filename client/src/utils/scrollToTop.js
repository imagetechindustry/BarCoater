/**
 * Universally scrolls the window and document root to the very top (0, 0).
 * Disables browser auto-scroll restoration and schedules frame-based fallbacks
 * to guarantee navigation jumps directly to the top of the destination page,
 * even when clicked from the bottom/footer of the previous page.
 */
export const scrollToTop = () => {
  if (typeof window !== "undefined") {
    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {
      // Ignore if restricted
    }

    // 1. Immediate sync jump
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // 2. Next animation frame (after layout commit)
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    });

    // 3. 50ms timeout fallback for deferred DOM reflows
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    }, 50);
  }
};

export default scrollToTop;
