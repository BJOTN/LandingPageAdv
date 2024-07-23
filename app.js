document.addEventListener('DOMContentLoaded', function () {

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



/* counter  */
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration) {
        let obj = document.getElementById(id),
            current = start,
            range = end - start,
            step = Math.abs(Math.floor(duration / range)),
            timer = null;

        function startCounter() {
            if (timer) return; // Previene la creazione di più timer

            timer = setInterval(() => {
                // Genera un incremento 
                let incrementValue = 5;

                // Aggiorna il valore corrente
                current += incrementValue;

                // Verifica se il valore corrente ha raggiunto o superato il valore finale
                if (current >= end) {
                    current = end;
                    clearInterval(timer);
                }

                // Aggiorna il contenuto dell'elemento
                obj.textContent = current;
            }, step);
        }

        function isElementInViewport(el) {
            let rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function onScroll() {
            if (isElementInViewport(obj)) {
                startCounter();
                document.removeEventListener('scroll', onScroll);
            }
        }

        document.addEventListener('scroll', onScroll);
        onScroll(); // Verifica se l'elemento è già visibile senza scroll
    }

    counter("count1", 0, 3500, 5000);
});