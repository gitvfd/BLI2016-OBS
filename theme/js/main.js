$(function () {

  $('.js-slideshow__item').each(function () {
    $('.js-slideshow__indicators').append('<div class="slideshow__indicator js-slideshow__indicator"></div>')
  })
  $('.js-slideshow__indicator:eq(0)').addClass('is-active');

  // initialize slideshow
  $('.js-slideshow').iosSlider({
    desktopClickDrag: true,
    infiniteSlider: true,
    snapToChildren: true,
    navSlideSelector: $('.js-slideshow__indicator'),
    onSliderLoaded: slideshowLoaded,
    onSlideChange: slideshowContentChange,
    snapSlideCenter: true,
    autoSlide: true,
    autoSlideTimer: 5000,
  });

  function slideshowContentChange (args) {
    $('.js-slideshow__indicator').removeClass('is-active');
    $('.js-slideshow__indicator:eq(' + (args.currentSlideNumber - 1) + ')').addClass('is-active');
    args.currentSlideObject.removeClass('is-dimmed').siblings().addClass('is-dimmed');
  }

  function slideshowLoaded () {
    $('.js-slideshow img').css('visibility', 'visible');
    adjustSlideshowSize();
    $('.js-slideshow').data("args").currentSlideObject.removeClass('is-dimmed').siblings().addClass('is-dimmed');
  }

  function adjustSlideshowSize() {
    $('.js-slideshow').css('height', $('.js-slideshow img').width() / 600 * 619) // calculate aspect ratio from original image dimensions
  }

  // initialize sliders
  $('.js-slider').slider({change: function(){/* callback on change */}});

  // get all current settings from the sliders
  $('.js-submit-mixer').click(function(e) {

    var sliderValues = '/#/';
    $('.js-slider').each(function(){
      sliderValues += $(this).slider('value');
    });
    // It is very important that this does NOT point to a 301 redirect url like `oecdbetterlifeindex.org`
    // without the `www` because (Mobile) Safari and IE lose everything after the hash.
    var url = $(this).attr('href') + sliderValues;
    window.location = url;
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  $('.js-submit-responses').click(function(e) {
    // It is very important that this does NOT point to a 301 redirect url like `oecdbetterlifeindex.org`
    // without the `www` because (Mobile) Safari and IE lose everything after the hash.
    var country1 = $('.js-dropdown-1').val() !== null ? $('.js-dropdown-1').val() : "";
    var country2 = $('.js-dropdown-2').val() !== null ? $('.js-dropdown-2').val() : "";

    var url = $(this).attr('href') + '/#' + country1 + '+' + country2
    window.location = url;
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  $('.js-dropdown').change(function(e) {
    /* Prevent selecting the same country in both dropdowns */
    var that = $(this);
    $(this).siblings().each(function () {
      var t = that.val();
      $(this).find('[value="' + t + '"]').prop('disabled', true).siblings().prop('disabled', false);;
    });
  }).change();

  $(window).resize(function() {
    adjustSlideshowSize();
  });


  $('.js-expand').click(function(e) {
    $(this).parents('.expandable').addClass('is-expanded');
    $(this).remove();
    e.preventDefault();
  });


});
