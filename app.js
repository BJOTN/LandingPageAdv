document.addEventListener('DOMContentLoaded', function () {
    var points = document.querySelectorAll('.point');
    var tooltip = document.getElementById('tooltip');
    var fadeIns = document.querySelectorAll('.fade-in');
    var observer;

    // Funzione per gestire l'animazione di fade-in
    function fadeInAnimation(entries, obs) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-page');
                obs.unobserve(entry.target); // Smetti di osservare dopo la prima animazione
            }
        });
    }

    // Intersection Observer per l'effetto fade-in
    observer = new IntersectionObserver(fadeInAnimation, { threshold: 0.5 });

    // Osserva tutti gli elementi con la classe .fade-in
    fadeIns.forEach(fadeIn => {
        observer.observe(fadeIn);
    });

    // Eventi per il tooltip
    points.forEach(function(point) {
        point.addEventListener('mouseenter', function() {
            var info = point.getAttribute('data-info');
            tooltip.innerText = info;
            tooltip.style.display = 'block';
            tooltip.style.opacity = 1;
        });

        point.addEventListener('mousemove', function(e) {
            tooltip.style.top = (e.clientY + 15) + 'px';
            tooltip.style.left = (e.clientX + 15) + 'px';
        });

        point.addEventListener('mouseleave', function() {
            tooltip.style.opacity = 0;
            setTimeout(function() {
                tooltip.style.display = 'none';
            }, 500); // Tempo di transizione CSS
        });
    });
});
