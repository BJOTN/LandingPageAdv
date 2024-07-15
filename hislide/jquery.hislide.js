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
            interval: 4000,
            
        };
        // Fusione di oggetti

        $.extend(true, setting, options);
        // Definire la posizione e lo stato di ciascuna immagine

        var desktopStates = [
            { $zIndex: 1, width: "12%", height: "150px", top: "80px", left: "25%", $opacity: 0.2 },
            { $zIndex: 2, width: "13%", height: "170px", top: "110px", left: "15%", $opacity: 0.4 },
            { $zIndex: 3, width: "17%", height: "218px", top: "140px", left: "25%", $opacity: 0.7 },
            { $zIndex: 4, width: "40%", height: "350px", top: "70px", left: "30%", $opacity: 1 },
            { $zIndex: 3, width: "17%", height: "218px", top: "140px", left: "58%", $opacity: 0.7 },
            { $zIndex: 2, width: "13%", height: "170px", top: "110px", left: "72%", $opacity: 0.4 },
            { $zIndex: 1, width: "12%", height: "150px", top: "80px", left: "65%", $opacity: 0.2 }
        ];
        
        
        var mobileStates = [
            { $zIndex: 1, width: "20%", height: "200px", top: "50px", left: "15%", $opacity: 0.2 },
            { $zIndex: 2, width: "25%", height: "220px", top: "70px", left: "10%", $opacity: 0.4 },
            { $zIndex: 3, width: "30%", height: "250px", top: "80px", left: "1%", $opacity: 0.7 },
            { $zIndex: 4, width: "90%", height: "300px", top: "50px", left: "6%", $opacity: 1 },
            { $zIndex: 3, width: "30%", height: "250px", top: "80px", left: "70%", $opacity: 0.7 },
            { $zIndex: 2, width: "25%", height: "220px", top: "70px", left: "60%", $opacity: 0.4 },
            { $zIndex: 1, width: "20%", height: "200px", top: "50px", left: "50%", $opacity: 0.2 }
        ];
        

        var $lis = $ele.find('li');
        var timer = null;

        function updateStates() {
            return window.innerWidth <= 490 ? mobileStates : desktopStates;
        }

        function move() {
            var currentState = updateStates();
            $lis.each(function(index, element) {
                var state = currentState[index];
                $(element).css('zIndex', state.$zIndex).finish().animate({
                    width: state.width,
                    height: state.height,
                    top: state.top,
                    left: state.left,
                    
                }, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        function next() {
            var currentState = updateStates();
            currentState.unshift(currentState.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }

        $ele.find('.hi-next').on('click', function() {
            next();
        });

        $ele.find('.hi-prev').on('click', function() {
            var currentState = updateStates();
            currentState.push(currentState.shift());
            move();
        });

        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        $(window).on('resize', function() {
            move();
        });

        move();
        autoPlay();
    };

    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele, options);
        });
        return this;
    };
})(jQuery);
