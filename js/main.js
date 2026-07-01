(function(){
    const backToTopButton = document.querySelector('[data-back-to-top]');

    if(backToTopButton){
        const toggleBackToTopButton = function(){
            backToTopButton.classList.toggle('button--back-to-top-visible', window.scrollY > 240);
        };

        backToTopButton.addEventListener('click', function(){
            window.scrollTo({
                top:0,
                behavior:'smooth'
            });
        });

        window.addEventListener('scroll', toggleBackToTopButton, { passive:true });
        toggleBackToTopButton();
    }

    document.querySelectorAll('a[href^="#"]').forEach(function(link){
        link.addEventListener('click', function(event){
            const target = document.querySelector(link.getAttribute('href'));

            if(target){
                event.preventDefault();
                target.scrollIntoView({ behavior:'smooth' });
            }
        });
    });
})();
