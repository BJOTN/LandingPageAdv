(function($) {
 // Questa funzione gestisce la funzionalità di un singolo carosello di immagini ogni volta che viene chiamata
// Vale a dire, creerà solo un carosello di immagini, e l'ambito di questa funzione può essere assegnato solo a un carosello di immagini
// È obbligatorio passare l'etichetta radice dell'attuale carosello di immagini

    var slide = function(ele,options) {
        var $ele = $(ele);
        // Opzioni di impostazione predefinite

        var setting = {
        		// Controlla il tempo di animazione del carosello
            speed: 1000,
            // Controlla il tempo di intervallo (velocità del carosello)
            interval: 2000,
            
        };
        // Fusione di oggetti

        $.extend(true, setting, options);
        // Definire la posizione e lo stato di ciascuna immagine

        var states = [
            { $zIndex: 1, width: "12%", height: "150px", top: "80px", left: "25%", $opacity: 0.2 },
            { $zIndex: 2, width: "13%", height: "170px", top: "110px", left: "15%", $opacity: 0.4 },
            { $zIndex: 3, width: "17%", height: "218px", top: "140px", left: "25%", $opacity: 0.7 },
            { $zIndex: 4, width: "40%", height: "350px", top: "70px", left: "30%", $opacity: 1 },
            { $zIndex: 3, width: "17%", height: "218px", top: "140px", left: "58%", $opacity: 0.7 },
            { $zIndex: 2, width: "13%", height: "170px", top: "110px", left: "72%", $opacity: 0.4 },
            { $zIndex: 1, width: "12%", height: "150px", top: "80px", left: "65%", $opacity: 0.2 }
        ];
        
        
        
        

        var $lis = $ele.find('li');
        var timer = null;

        // eventi
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        // Associa ogni li a ciascuno stato di states
// Fai espandere li dal centro
        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        // Passa alla prossima immagine
        function next() {
            // sposta l'ultimo elemento dell'array al primo.
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    //Trova l'etichetta radice dell'immagine del carosello da ruotare e chiama slide()
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        // Valore restituito per supportare le chiamate concatenate
        return this;
    }
})(jQuery);
