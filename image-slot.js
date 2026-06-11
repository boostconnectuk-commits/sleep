/* Lightweight image placeholder utility.
   Loaded before React — exposes a plain global so components can request
   an image for a named slot. Anything not in IMAGE_MAP renders as a
   on-brand SVG placeholder until a real asset is wired in. */
(function () {
  var PALETTE = {
    bg: "#1c1826",
    border: "#D4939A",
    text: "#F2EDE8"
  };

  // key -> real asset URL. Add entries here as photography becomes available.
  var IMAGE_MAP = {};

  function placeholder(label, opts) {
    opts = opts || {};
    var w = opts.width || 96;
    var h = opts.height || 96;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<rect width="100%" height="100%" fill="' + PALETTE.bg + '"/>' +
      '<rect x="0.5" y="0.5" width="' + (w - 1) + '" height="' + (h - 1) + '" fill="none" stroke="' + PALETTE.border + '" stroke-opacity="0.22" stroke-width="1"/>' +
      '<text x="50%" y="50%" fill="' + PALETTE.text + '" fill-opacity="0.35" font-family="Inter, sans-serif" font-size="' + Math.max(9, Math.round(w / 8)) + '" text-anchor="middle" dominant-baseline="middle">' +
      (label || "") +
      '</text>' +
      '</svg>';
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }

  window.ImageSlot = {
    get: function (key, opts) {
      return IMAGE_MAP[key] || placeholder((opts && opts.label) || "", opts);
    },
    set: function (key, url) {
      IMAGE_MAP[key] = url;
    }
  };
})();
