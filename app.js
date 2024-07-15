document.addEventListener('DOMContentLoaded', function () {
    var points = document.querySelectorAll('.point');

    // Intersection Observer for fade-in effect
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-page');
            } else {
                entry.target.classList.remove('in-page');
            }
        });
    });

    let fadeIns = document.querySelectorAll('.fade-in');
    fadeIns.forEach(fadeIn => {
        observer.observe(fadeIn);
    });
});
