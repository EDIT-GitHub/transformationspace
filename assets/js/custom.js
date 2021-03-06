jQuery(document).ready(function(){
  var scrollTop = 0;
  jQuery(window).scroll(function(){
    scrollTop = jQuery(window).scrollTop();
    jQuery('.counter').html(scrollTop);
    
    if (scrollTop >= 40) {
      jQuery('.navbar').addClass('scrolled-nav');
    } else if (scrollTop < 100) {
      jQuery('.navbar').removeClass('scrolled-nav');
    } 
    
    if (scrollTop >= 440) {
      jQuery('.left-sidebar .desktop').addClass('fixed');
    } else if (scrollTop < 400) {
      jQuery('.left-sidebar .desktop').removeClass('fixed');
    } 
    
  }); 
  
});


jQuery(document).ready(function(){
  
  /* Hamburger Menu */
  jQuery('.hamburger').click(function(){
    jQuery('.hamburger').toggleClass('is-active');
    jQuery('.overlay').toggleClass('open');
    jQuery('body').toggleClass('no-scroll');
  });
  
  /* close menu when click on anchor */
  jQuery('.close-menu-js').click(function(){
    jQuery('.hamburger').removeClass('is-active');
    jQuery('.overlay').removeClass('open');
  });
  
  jQuery( ".button-stories" ).on( "click", function(event) {
    event.preventDefault();  
    jQuery(this).toggleClass('open-stories');
    jQuery(this).closest('.bootcamp-stories-item').next('.bootcamp-stories-ajax').slideToggle();
  });
  
  
  /*3D Button effect*/
  jQuery('.button-effect-js').on('mousedown',function() {
    jQuery(this).addClass('clicked');
  });
  jQuery('.button-effect-js').on('mouseup',function() {
    jQuery(this).removeClass('clicked');
  });
  
});

jQuery(function() {
  jQuery('#bookmarkme').click(function(event) {
    event.preventDefault();
    if (window.sidebar && window.sidebar.addPanel) { // Mozilla Firefox Bookmark
      window.sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE Favorite
      window.external.AddFavorite(location.href, document.title);
    } else if (window.opera && window.print) { // Opera Hotlist
      this.title = document.title;
      return true;
    } else { // webkit - safari/chrome
      alert('Press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
    }
  });
});

jQuery(document).ready( function ($) {

var $form = jQuery('.form-newsletter-js');

  if ( $form.length > 0 ) {
    $($form).each(function(item) {
      var item = jQuery($form[item]);
      jQuery(this).find("input[type=submit]").bind('click', function ( event ) {
        if (event) event.preventDefault()
          register(item);
      });
    });
    
  }
});


function register(item) {
  jQuery.ajax({
    type: item.attr('method'),
    url: item.attr('action'),
    data: item.serialize(),
    cache       : false,
    dataType    : 'jsonp',
    contentType: "application/json; charset=utf-8",
    error       : function() { alert("Could not connect to the registration server. Please try again later."); },
    success    : function(data) {
      
      var form_name = item.attr('id');
      
      console.log(form_name);
      
      if (data.result === 'success') {
        // Yeahhhh Success
        console.log(data.result)
        jQuery('#'+form_name+' .btn').addClass("success").val('Success');
        jQuery('#'+form_name+' #mce-EMAIL').val('');
        jQuery('#'+form_name+' #mce-FNAME').removeClass('mce_inline_error');
        jQuery('#'+form_name+' #mce-EMAIL').removeClass('mce_inline_error');
        //jQuery('#'+form_name+' #mce-responses .response').html('<span>' + data.msg + '</span>')
      } else {
        // Something went wrong, do something to notify the user.
        console.log(data.result)
        jQuery('#'+form_name+' #mce-FNAME').addClass('mce_inline_error');
        jQuery('#'+form_name+' #mce-EMAIL').addClass('mce_inline_error');
        jQuery('#'+form_name+' #subscribe-result').css('color', '#ff8282')
        if (data.msg == '0 - Please enter a value') {
          //do nothing
        } else {
          jQuery('#'+form_name+' #mce-responses .response').html('<span>' + data.msg + '</span>')
        }
        
      }
    }
  });

  
}

/* filter bootcamps */
jQuery(function($) {
  /* check if Custom Select Box changed and filter */

  $(".row-filter .select-selected").change(function() {
    var a = $("#bootcamp-filter").val();
    var b = $("#bootcamp-location-filter").val();

    //falta verificar se cada box tem um ou ambos os filtros    
    // if(a === b) {          // Use strict comparison operator as a best practice
    //     alert(a + ' matches ' + b);
    // }
});

  jQuery("#category-select .select-selected").on('DOMSubtreeModified', function() {
    console.log("changed")
    
    
    var bootcamp = jQuery("#bootcamp-filter").val();
    console.log(bootcamp)

    if (bootcamp=='0'){
      jQuery('.bootcamp-box').show("fast");
    }else{
      jQuery('.bootcamp-box').not('[data-tipo='+bootcamp+']').fadeOut("fast");
      jQuery('.bootcamp-box').filter('[data-tipo='+bootcamp+']').fadeIn("fast");    
    }
  });
  
    /* check if Custom Select Box changed and filter */
    jQuery("#location-select .select-selected").on('DOMSubtreeModified', function() {
    var location = jQuery("#bootcamp-location-filter").val();
    
    if (location=='0'){
      jQuery('.bootcamp-box').show("fast");
    }else{
      jQuery('.bootcamp-box').not('[data-location='+location+']').fadeOut("fast");
      jQuery('.bootcamp-box').filter('[data-location='+location+']').fadeIn("fast");    
    }
  });
});


/* add bootcamp form after page load */
jQuery(document).ready(function($) {
  $(".enroll-btn .menu-item-js").attr('data-fancybox', '');
  $(".enroll-btn .menu-item-js").attr('data-src', '#bootCampModal');

  /* select facilitator on form */
  $('.facilitator-js').click(function () {
  //console.log("clicked2");

  var nameEls = document.querySelectorAll(".facilitatores-name .select-items div");
  var emailEls = document.querySelectorAll(".facilitatores-email .select-items div");

  /* check if facilitator name with equal to checkbox */
  for (var i = 0; i < nameEls.length; i++) {
  var name = nameEls[i].innerText;

  var facilitatorName = $(this).attr("data-name");
  //console.log(facilitatorName);

  if(facilitatorName == name) {
    $('#select-facilitator').val(facilitatorName);
    $(".facilitatores-name .select-selected").text(facilitatorName);
    nameEls[i].classList.add("same-as-selected");
    
    var email = emailEls[i].innerText;
    $('#select-email-facilitator').val(email);
    emailEls[i].classList.add("same-as-selected");
    
    // $(".select-items div").removeClass("same-as-selected");
    // $(".select-items div.1").addClass("same-as-selected");
   
  }

  //console.log("Name: " + name);
}
 
  var emailEls = document.querySelectorAll(".facilitatores-email .select-items div");
  for (var i = 0; i < emailEls.length; i++) {
  var email = emailEls[i].innerText;
 // console.log("Email: " + email);
}


});
});