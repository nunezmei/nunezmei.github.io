/**
 * Just some base site code to get the various libraries to do their work
 * in the portfolio.
 */
$(document).ready(function () {

    'use strict';

    function preload() {
        var $preloader = $('#page-preloader'),
            $spinner = $preloader.find('.spinner-loader');
        //$( window ).on('load', function() {
        $(document).ready(function() {
            $spinner.fadeOut();
            $preloader.delay(500).fadeOut('slow');
        });
    }
    preload();


    //fixed header
    function fixedHeader(wSc) {
        if(wSc > 10){
            $('.header').addClass('active');
        }else{
            $('.header').removeClass('active');
        }
    }


    //fixed sidebar
    var sidebarCheck = false;
    if($('div').is('.sidebar-form')){
        sidebarCheck = true;
        var sidebar = $('.sidebar-form');
        var sidebarPos, sidebarHeight, singleProjectSection, singleSectionBottom, ww;
        var posChecked = true;
        $(window).load(function () {
            ww = $(window).width();
            sidebarHeight = sidebar.outerHeight();
            singleProjectSection = $('.single-project-section');
            singleSectionBottom = singleProjectSection.offset().top + singleProjectSection.outerHeight() - 60;

            $(window).on('resize', function () {
                ww = $(window).width();
                if(ww > 991 && posChecked){
                    sidebarPos = sidebar.offset().top;
                    posChecked = false
                }
                sidebarHeight = sidebar.outerHeight();
                singleSectionBottom = singleProjectSection.offset().top + singleProjectSection.outerHeight() - 60;
            });

            $(window).trigger('resize');
        });
    }
    function fixedSidebar(wSc) {
        if(wSc > (sidebarPos - 85) && (wSc + 85 + sidebarHeight) < singleSectionBottom ){
            sidebar.addClass('fixed-sidebar');
            sidebar.removeClass('absolute-sidebar');
        }else if ((wSc + 85 + sidebarHeight) > singleSectionBottom){
            sidebar.removeClass('fixed-sidebar');
            sidebar.addClass('absolute-sidebar');
        }else{
            sidebar.removeClass('fixed-sidebar');
            sidebar.removeClass('absolute-sidebar');
        }
    }


    //use fixedSidebar and fixedHeader
    $(window).on('scroll', function () {
        var wSc = $(window).scrollTop();
        fixedHeader(wSc);

        if(sidebarCheck){
            fixedSidebar(wSc);
        }

    });
    $(window).load(function () {
        $(window).trigger('scroll');
    });


    //init isotope
    var $grid = $('.projects-wrapper').isotope({
        // options
        itemSelector: '.project-item',
        hiddenStyle: {
            opacity: 0
        },
        visibleStyle: {
            opacity: 1
        },
        masonry: {
            columnWidth: '.project-item'
        }
    });
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });
    //isotope filter
    $('.projects-filter ul li').on( 'click', function() {
        $('.projects-filter ul li').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $('.projects-wrapper').isotope({ filter: filterValue });
    });


    //init gradient
    if($('div').is('.first-screen') || $('div').is('.mob-menu-wrapper')) {
        drawGradient();
    }

    //open google map in new window
    $('.map-link').on('click', function (event) {
        event.preventDefault();
        window.open('https://www.google.com.ua/maps/place/' + $(this).text(), '_blank');
    });

    //scroll to anchor
    if($('header').is('.header-home')){
        $('.main-menu ul li a[href*="#"], .mobile-menu ul li a[href*="#"]').on('click', function(event){
            event.preventDefault();
            var anchor = $(this).attr('href');
            if($(anchor).position()){
                $('html, body').stop().animate({
                    scrollTop: $(anchor).offset().top
                }, 800);
            }
        });
    }


    //open bootstrap modal from modal
    $(document).on('hidden.bs.modal', '.modal', function () {
        if($('.modal:visible').length){
            $(document.body).addClass('modal-open');
            $(document.body).css({paddingRight: scrollWidth()});
            $('header').css('padding-right', scrollWidth());
        }else {
            $(document.body).css({paddingRight: 0});
            $('header').css({paddingRight: 0});
        }
    });


    //bootstrap modal fix for fixed header
    function scrollWidth() {
        var div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        var paddingRight = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return paddingRight;
    }
    $('.modal').on('show.bs.modal', function () {
        $('header').css('padding-right', scrollWidth());
    });
    $('.modal').on('hidden.bs.modal', function () {
        $('.header').css('padding-right', '0');
    });


    //mobile-menu
    $('.mobile-btn, .close-mob-menu').on('click', function () {
        $('.mob-menu-wrapper').toggleClass('active');
    });
    $('.mobile-menu ul li a').on('click', function () {
        $('.mob-menu-wrapper').removeClass('active');
    });


    //init highcharts
    /*
    if($('div').is('#highchart')){
        Highcharts.chart('highchart', {
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'column'
            },
            title: {
                text: 'Data extracted from a HTML table in the page'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Rate'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b class="legend-highchart">' + this.series.name + '</b><br/>' +
                        '<span class="highchart-title-desc">' + this.point.y + ' - ' + this.point.name.toLowerCase() + '</span>';
                }
            }
        });
    }
    */


    //init custom scroll
    $('.scroll-viewport').mCustomScrollbar({
        axis:"x",
        theme:"dark",
        mouseWheel:{
            enable: false
        },
        scrollInertia: 0
    });


    /*
    //init share buttons
    if($('span').is('#sharing-links')){
        $('#sharing-links').socialLikes();
    }
    */

        $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
            preventSubmit: true,
    
            submitError: function($form, event, errors) {
    
            },
            submitSuccess: function($form, event) {
                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
    
                var thisForm = event.target.getAttribute('id');
    
                var name = $('#' + thisForm).find("input.name-input").val();
                var email = $('#' + thisForm).find("input.email-input").val();
                var message = $('#' + thisForm).find("textarea.textarea").val();
    
                $.ajax({
                    url: "https://nzedd67e5a.execute-api.us-east-1.amazonaws.com/prod/sendContact",
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        name: name,
                        email: email,
                        description: message
                    }),
                    cache: false,
                    success: function(data) {
                        // Success message
                        $('#send-message-modal').modal();
                        //clear all fields
                        $('#' + thisForm).trigger("reset");
                        //close contact modal
                        $('#contact-me-modal').modal("hide");
                    }
                });
    
            },
            filter: function() {
                return $(this).is(":visible");
            }
        });
    
    
    
    /*When clicking on Full hide fail/success boxes */
    $('#form-first-name').focus(function() {
        $('#success').html('');
    });
    

    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        fitImagesInViewport: false
      });



      $("body").on("click", "#showmoreImg", function() {
          $("#restImages").toggle();
          $("#showmoreImg span").toggle();
      });


      function showFullQuote(quoteId) {
          $("#full-QuoteModal .inner-content").html($("#"+ quoteId + "FullQuote").html());
          $("#full-QuoteModal").modal();
      }

      $("body").on("click", ".showfullquote", function(event) {
          showFullQuote($(this).data("quoteId"));
          return false;
      });
});
