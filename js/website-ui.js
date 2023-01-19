
document.addEventListener('DOMContentLoaded', function () {

    const WebsiteUi = (function () {

        const app = {};
        const moduleResources = './';
        
        let myChart;
        let mobile = window.matchMedia("(max-width: 991px)");
        
        let modals = {};

        /* 
         * =====================================================================
         * Private Members
         * =====================================================================
         */

        app.init = function () {
            app.bindings();
            app.menu();
//            app.initializeLinks();
            app.initializeModals();
            app.moveTestimonials();
            app.reveal();
            app.changeColor();
            app.manageLinks();
            app.about();
        };


        app.bindings = function () {
            
            
            Lazy.parallax('.tpl-parallax');
            app.chart();

        };
        
        app.about = function() {
            Lazy.don('click', 'a[href="#about"]', function() {
               app.redrawChart();
            });
        };
        
        app.redrawChart = function() {
            let logo = document.querySelector('#list-navigation > li:first-child > a');
            let accentColor = getComputedStyle(logo.querySelector(':scope > span:first-child')).getPropertyValue('color');
            let textColor = getComputedStyle(logo.querySelector(':scope > span:nth-child(2)')).getPropertyValue('color');
            let webColor = textColor == 'rgb(230, 230, 230)' ? textColor : Chart.defaults.borderColor;
            
            myChart.data.datasets[0].backgroundColor = accentColor;
            myChart.data.datasets[0].pointBackgroundColor = accentColor;
            myChart.options.scales.r.grid.color = webColor;
            myChart.options.scales.r.angleLines.color = webColor;
            myChart.options.scales.r.pointLabels.color = textColor;
            myChart.update();
        };
        
        app.chart = function() {
            
                let logo = document.querySelector('#list-navigation > li:first-child > a');
                let accentColor = getComputedStyle(logo.querySelector(':scope > span:first-child')).getPropertyValue('color');
                let textColor = getComputedStyle(logo.querySelector(':scope > span:nth-child(2)')).getPropertyValue('color');
//                let webColor = Chart.defaults.borderColor;
            
                const ctx = document.getElementById('star-chart');
                myChart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['Web Services', 'Back-end', 'Database', 'Server', 'Front-end', 'APIs'],
                        datasets: [{
                            label: false,
                            data: [7, 9, 8, 7, 7, 8],
                            fill: true,
                            color: accentColor,
                            backgroundColor: accentColor,
                            pointBackgroundColor: accentColor,
                            borderWidth: false
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scale: {
                            beginAtZero: true,
                            min: 0,
                            max: 10,
                            stepSize: 1,
                            pointLabels: {
                                fontColor: 'white'
                            }
                        },
                        scales: {
                            r: {
                                pointLabels:{ color: textColor},
                                grid: { color: textColor},
                                angleLines: { color: textColor },
                                ticks: {
                                    display: false // Hides the labels in the middel (numbers)
                                }
                            }
                        }
                    }
                });
        };
        
        app.changeColor = function() {
            
            let userColor = localStorage.getItem('color');
            const userGlass = localStorage.getItem('glass');
            const userBorderRadius = localStorage.getItem('border-radius');
            const colors = Array.from(document.querySelectorAll('#site-color-picker input[name="color"]')).map(input => input.value);
            const bodyClasses = document.querySelector('body').classList;
            
            // dark mode
            if( userColor === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
                userColor = 'dark';
            }
            
            if( userColor !== null ) {
                document.querySelector(`#site-color-picker input[name="color"][value="${userColor}"]`).checked = true;
                for( let i = 0; i < colors.length; i++ ){ bodyClasses.remove(colors[i]); }
                bodyClasses.add(userColor);
            }
            
            if( userGlass === 'true' ) {
                bodyClasses.add('glass');
                document.querySelector('#site-color-picker input[name="glass"]').checked = true;
            } else {
                bodyClasses.remove('glass');
                document.querySelector('#site-color-picker input[name="glass"]').checked = false;
            }
            
            Lazy.on('change', '#site-color-picker input[name="color"]', function(e){
                for( let i = 0; i < colors.length; i++ ) { bodyClasses.remove(colors[i]); }
                bodyClasses.add(e.target.value);
                localStorage.setItem('color', e.target.value);
                app.redrawChart();
            });
            
            Lazy.on('change', '#site-color-picker input[type="checkbox"]', function(e){
                let value = e.target.value;
                if( e.target.checked ) {
                    localStorage.setItem(value, 'true');
                } else {
                    localStorage.removeItem(value);
                }
                bodyClasses.toggle(value);
                app.redrawChart();
            });
            
            setTimeout(function(){
                let siteColorPicker = document.querySelector('#site-color-picker');
                siteColorPicker.animate({ opacity: [1, 0]}, { duration: 1000 });
                siteColorPicker.style.opacity = 0;
            }, 6000);
            
//            Lazy.addEventListener('click', '#site-color-picker input[name="glass"]', function(e){
//                if( e.target.checked ) {
//                    localStorage.setItem('glass', 'true');
//                } else {
//                    localStorage.removeItem('glass');
//                }
//                bodyClasses.toggle('glass');
//            });

        };
        
        app.reveal = function() {
            
            // section reveals
//            Lazy.reveal('main > section > section');
            Lazy.reveal('#testimonials > #list-stories > li');
            Lazy.reveal('#list-services-offered > li');
            Lazy.reveal('#list-bring-on-board > li');
            
            // list reveals
            Lazy.childrenReveal(`#list-full-stack,
                                    #list-recent-works,
                                    #list-employers,
                                    #list-employees`);
            
            // list but not list reveals
            Lazy.childrenReveal('#specialization-navigation', {
                children: 'a'
            });
            
        };
        
        app.initializeLinks = function() {
            
            $(document).on('click', "[href^='#']", function(e){
               e.preventDefault();
               let id = $(this).attr('href');
               var link = id.substring(1);
               
               window.history.pushState('', '', link);
               
            });
            
        };
        
//        app.manageLinks = function() {
//            let manageLink = function(){
//                const activeLinks = document.querySelectorAll('a.active');
//                for (let i = 0; i < activeLinks.length; i++) {
//                    activeLinks[i].classList.remove('active');
//                }
//                const links = document.querySelectorAll(`a[href="${location.hash}"`);
//                for (let i = 0; i < links.length; i++) {
//                    links[i].classList.add('active');
//                }
//            };
//            window.addEventListener("load", manageLink);
//            window.addEventListener('popstate', manageLink);
//        };

        app.manageLinks = function() {
            let manageLink = function(){
                const activeLinks = document.querySelectorAll('a.active');
                for (let i = 0; i < activeLinks.length; i++) {
                    activeLinks[i].classList.remove('active');
                }
                const links = document.querySelectorAll(`a[href="${location.hash}"`);
                for (let i = 0; i < links.length; i++) {
                    links[i].classList.add('active');
                }
                
//                const hash = window.location.hash;
//                history.scrollRestoration = 'manual';
//                let url = hash.split('#')[1] || hash.split('#')[0];
//                history.replaceState('', document.title, url);

            };
            window.addEventListener("load", manageLink);
            window.addEventListener('popstate', manageLink);
        };
        
        app.initializeModals = function() {
            var links = document.querySelectorAll('#specialization-navigation a');
            if(links) {
                for(let i=0; i<links.length; i++) {
                    const href = links[i].getAttribute('href');
                    modals[href] = Lazy.overlay(href);
                    links[i].addEventListener('click', function(e){
                        e.preventDefault();
//                        console.log( links[i].getAttribute('href') );
//                        modals[href].open();
                    }, false);
                }
            }
        };
        
        app.moveTestimonials = function() {
            
//            $('a[href="#testimonials"]').click(function(e){
//                $('#testimonials').insertAfter($('#services'));
//            });
//            
//            $('a[href="#home"]').click(function(e){
//                $('#testimonials').insertAfter($('#strategic-partners'));
//            });
            
        };
        
        app.menu = function() {
          
            Lazy.on('click', '#list-navigation a', function(e){
                if( e.target.nodeName == 'A') {
                    document.getElementById('main-navigation').classList.toggle('collapsed');    
//                    if( e.target.closest('#main-navigation').classList.contains('collapsed') ) {
//                        document.querySelector('#main-navigation').animate({maxHeight: '80px'}, 1000);
//                    } else {
//                        document.querySelector('#main-navigation').animate({maxHeight: '500px'}, 1000);
//                    }
                }
            });

            Lazy.on('click', '#main-navigation a', function(e){
                var links = document.querySelectorAll('#main-navigation a');
                for (i = 0; i < links.length; ++i) {
                    links[i].classList.remove('active');
                }
                e.target.closest('a').classList.add('active');
            });

            window.onscroll = function() {
                if( window.scrollY == 0 ) {
                    document.getElementById('main-navigation').classList.remove('sticky');
                } else {
                    document.getElementById('main-navigation').classList.add('sticky');
                }
            };

        };

        app.init();

        /* 
         * =====================================================================
         * Public Members
         * =====================================================================
         */

        return {
//            functionName: function(params) {
//                return app.functionName(params);
//            },
        };

    }());

});