
 $(function(){
 $('.slider-for').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '.slider-nav'
});

$('.slider-nav').slick({
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 1,
  asNavFor: '.slider-for',
  // dots: true,
  focusOnSelect: true,
  arrows:true,
  // autoplay:true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,

      }
    }
  ]

    });

$('.slider-about').slick({
  arrows:false,
  autoplay: true,
  fade: true,
  cssEase: 'linear',
  speed: 1000,
  autoplaySpeed: 5000,
});

})