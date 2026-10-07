/* Werkbank – kleine Animationen. Ohne Tracking, ohne externe Dienste.
   Ohne JavaScript oder bei „Bewegung reduzieren“ ist alles sofort sichtbar. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var root = document.documentElement;
  root.classList.add('anim');
  document.addEventListener('DOMContentLoaded', function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    var top = document.querySelector('.top');
    var onScroll = function () { if (top) top.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  });
  // Sicherheitsnetz: nach 2,5 s alles zeigen, falls etwas nicht ausgelöst wurde
  window.addEventListener('load', function () {
    setTimeout(function () { document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
      var r = el.getBoundingClientRect(); if (r.top < window.innerHeight) el.classList.add('in'); }); }, 2500);
  });
})();
