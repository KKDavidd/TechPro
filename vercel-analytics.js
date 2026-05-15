// Vercel Web Analytics
// This is a standalone bundle created from @vercel/analytics package
// It will automatically track page views when deployed to Vercel

(function() {
  'use strict';
  
  // Queue initialization
  var initQueue = function() {
    if (window.va) return;
    window.va = function a() {
      var params = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
      }
      if (!window.vaq) window.vaq = [];
      window.vaq.push(params);
    };
  };
  
  // Check if we're in a browser environment
  function isBrowser() {
    return typeof window !== "undefined";
  }
  
  // Detect environment
  function detectEnvironment() {
    try {
      var env = process && process.env && process.env.NODE_ENV;
      if (env === "development" || env === "test") {
        return "development";
      }
    } catch (e) {
      // Ignore errors
    }
    return "production";
  }
  
  // Inject analytics
  function inject(options) {
    if (!isBrowser()) return;
    
    var mode = options && options.mode || detectEnvironment();
    
    // Don't track in development mode
    if (mode === "development") {
      console.log("[Vercel Analytics] Running in development mode. Analytics disabled.");
      return;
    }
    
    initQueue();
    
    // The actual tracking script will be injected by Vercel when deployed
    // This queues any events until the real script loads
    var script = document.createElement("script");
    script.src = "/_vercel/insights/script.js";
    script.defer = true;
    script.setAttribute("data-sdkn", "@vercel/analytics");
    script.setAttribute("data-sdkv", "2.0.1");
    
    if (options && options.debug) {
      script.setAttribute("data-debug", "true");
    }
    
    var firstScript = document.getElementsByTagName("script")[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }
  
  // Auto-inject on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      inject({ mode: "production" });
    });
  } else {
    inject({ mode: "production" });
  }
  
  // Expose for manual usage if needed
  window.vercelAnalytics = { inject: inject };
})();
