/* Vercel Web Analytics integration for React
   Based on @vercel/analytics v2.0.1 */

function VercelAnalytics() {
  React.useEffect(() => {
    // Initialize the queue
    if (window.va) return;
    
    window.va = function(...params) {
      if (!window.vaq) window.vaq = [];
      window.vaq.push(params);
    };

    // Check if script is already loaded
    const scriptSrc = "/_vercel/insights/script.js";
    if (document.head.querySelector(`script[src*="${scriptSrc}"]`)) return;

    // Create and append the analytics script
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.dataset.sdkn = "@vercel/analytics/react";
    script.dataset.sdkv = "2.0.1";
    script.defer = true;
    
    script.onerror = () => {
      console.log(
        "[Vercel Web Analytics] Failed to load script. Be sure to enable Web Analytics for your project and deploy to Vercel. See https://vercel.com/docs/analytics/quickstart for more information."
      );
    };

    document.head.appendChild(script);
  }, []);

  return null;
}

window.VercelAnalytics = VercelAnalytics;
