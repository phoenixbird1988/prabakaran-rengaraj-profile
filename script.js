$(document).ready(function() {
    // Mobile Menu Toggle
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // Close mobile menu when clicking on a link
    $('.nav-link').on('click', function() {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    });

    // Smooth Scroll for Navigation Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Active Navigation Link on Scroll
    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if (refElement.length && refElement.position().top <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // Scroll Animation - Fade In Elements
    function checkScroll() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // Initial check
    checkScroll();

    // Check on scroll
    $(window).on('scroll', function() {
        checkScroll();
    });

    // Animate Circular Progress Rings on Scroll
    var skillsAnimated = [];
    var circumference = 2 * Math.PI * 54; // radius = 54
    
    function animateCircularProgress() {
        $('.circular-progress').each(function() {
            var $this = $(this);
            var element = $this[0];
            
            if (skillsAnimated.indexOf(element) === -1) {
                var skillsSection = $('#skills');
                var skillsTop = skillsSection.offset().top;
                var skillsBottom = skillsTop + skillsSection.outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                var elementTop = $this.offset().top;
                
                if (elementTop < viewportBottom && elementTop > viewportTop - 200) {
                    var percent = parseInt($this.attr('data-percent'));
                    var offset = circumference - (percent / 100) * circumference;
                    
                    $this.find('.progress-ring-circle').css({
                        'stroke-dashoffset': offset
                    });
                    
                    skillsAnimated.push(element);
                }
            }
        });
    }

    // Check skills on scroll
    $(window).on('scroll', function() {
        animateCircularProgress();
    });

    // Initial check for skills
    animateCircularProgress();

    // Back to Top Button
    var backToTop = $('#backToTop');
    
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });

    backToTop.on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Navbar Background on Scroll
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').css({
                'background': 'rgba(255, 255, 255, 0.98)',
                'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            });
        } else {
            $('.navbar').css({
                'background': 'rgba(255, 255, 255, 0.98)',
                'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            });
        }
    });

    // Project Cards Hover Animation
    $('.project-card').on('mouseenter', function() {
        $(this).find('.project-icon').css({
            'transform': 'rotate(10deg) scale(1.1)',
            'transition': 'transform 0.3s ease'
        });
    }).on('mouseleave', function() {
        $(this).find('.project-icon').css({
            'transform': 'rotate(0deg) scale(1)',
            'transition': 'transform 0.3s ease'
        });
    });

    // Timeline Items Animation
    $('.timeline-item, .exp-item').on('mouseenter', function() {
        $(this).find('.timeline-marker, .exp-marker').css({
            'transform': 'scale(1.3)',
            'transition': 'transform 0.3s ease'
        });
    }).on('mouseleave', function() {
        $(this).find('.timeline-marker, .exp-marker').css({
            'transform': 'scale(1)',
            'transition': 'transform 0.3s ease'
        });
    });

    // Achievement Cards Tilt Effect
    $('.achievement-card').on('mousemove', function(e) {
        var card = $(this);
        var cardOffset = card.offset();
        var x = e.pageX - cardOffset.left;
        var y = e.pageY - cardOffset.top;
        var centerX = card.outerWidth() / 2;
        var centerY = card.outerHeight() / 2;
        var rotateX = (y - centerY) / 10;
        var rotateY = (centerX - x) / 10;

        card.css({
            'transform': 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)',
            'transition': 'none'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'transform': 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)',
            'transition': 'transform 0.3s ease'
        });
    });

    // Contact Cards Pulse Animation
    $('.contact-card').on('mouseenter', function() {
        $(this).find('i').css({
            'animation': 'pulse 1s ease infinite'
        });
    }).on('mouseleave', function() {
        $(this).find('i').css({
            'animation': 'none'
        });
    });

    // Add pulse animation to CSS dynamically
    if (!$('#dynamic-styles').length) {
        $('head').append(`
            <style id="dynamic-styles">
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
            </style>
        `);
    }

    // Parallax Effect for Hero Section
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        var hero = $('.hero');
        if (scrolled < hero.outerHeight()) {
            hero.css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
        }
    });

    // Counter Animation for Years of Experience
    function animateCounter() {
        var experienceSection = $('#experience');
        var expTop = experienceSection.offset().top;
        var expBottom = expTop + experienceSection.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();

        if (expBottom > viewportTop && expTop < viewportBottom) {
            var counterAnimated = $('.hero-subtitle').data('animated');
            if (!counterAnimated) {
                $('.hero-subtitle').data('animated', true);
                // Counter animation can be added here if needed
            }
        }
    }

    $(window).on('scroll', function() {
        animateCounter();
    });

    // Smooth reveal animation for sections
    function revealOnScroll() {
        $('.section').each(function() {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();

            if (sectionBottom > viewportTop && sectionTop < viewportBottom) {
                $(this).addClass('revealed');
            }
        });
    }

    $(window).on('scroll', function() {
        revealOnScroll();
    });

    // Initial reveal check
    revealOnScroll();

    // Add typing effect to hero name (optional enhancement)
    function typeWriter(element, text, speed) {
        var i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize all animations on page load
    setTimeout(function() {
        checkScroll();
        animateCircularProgress();
    }, 100);
});

