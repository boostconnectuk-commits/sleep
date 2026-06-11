/* Generates the twinkling starfield + shooting stars behind the page.
   Plain JS, runs before React — populates #stars (sibling of #root). */
(function () {
  var STAR_COUNT = 60;
  var container = document.getElementById("stars");
  if (!container) return;

  var frag = document.createDocumentFragment();

  for (var i = 0; i < STAR_COUNT; i++) {
    var star = document.createElement("span");
    var size = (Math.random() * 1.6 + 0.6).toFixed(2);
    var classes = ["star"];

    if (Math.random() < 0.18) classes.push("amber");
    if (Math.random() < 0.35) classes.push("glow");

    star.className = classes.join(" ");
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = (Math.random() * 100).toFixed(2) + "%";
    star.style.top = (Math.random() * 100).toFixed(2) + "%";
    star.style.setProperty("--o", (0.25 + Math.random() * 0.45).toFixed(2));
    star.style.setProperty("--tw", (3 + Math.random() * 4).toFixed(1) + "s");
    star.style.setProperty("--d", (Math.random() * 5).toFixed(1) + "s");

    frag.appendChild(star);
  }

  var shootingOne = document.createElement("span");
  shootingOne.className = "shooting";
  shootingOne.style.top = "12%";
  shootingOne.style.left = "55%";
  frag.appendChild(shootingOne);

  var shootingTwo = document.createElement("span");
  shootingTwo.className = "shooting two";
  shootingTwo.style.top = "30%";
  shootingTwo.style.left = "10%";
  frag.appendChild(shootingTwo);

  container.appendChild(frag);
})();
