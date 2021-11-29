$(function () {
    //アコーディオン
    $('.accordion__title').on('click', function () {
    $(this).next().slideToggle();
  });

  //グーグルフォーム遷移防止
  $('#form').submit(function (event) {
    var formData = $('#form').serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfIkCQX8DJQ7ZUF60HahRdPRhwootNv5rP_H2Q7kwOe2sCz-Q/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".contact-form__submit").fadeOut();
          $(".contact-form__end-message").delay(600).slideDown();
          //window.location.href = "thanks.html";
        },
        200: function () {
          $(".contact-form__false-message").slideDown();
        }
      }
    });
    event.preventDefault();
  });

  //プライバシーポリシーに同意すると送信可能にする
  const $submitBtn = $('#submit')
  $('#form input,#form textarea').on('change', function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('#form input[type="checkbox"]').val() !== "" &&
      $('#form #privacy-check').prop('checked') === true
    ) {
      $submitBtn.removeClass('disable');
      $submitBtn.prop('disabled', false);

    } else {
      $submitBtn.addClass('disable');
      $submitBtn.prop('disabled', true);
    }
  });

  //ハンバーガーメニュー用
  $('.humburger-btn').on('click',function(){
    $('.humburger-btn').toggleClass('cross');
    $('.humburger-nav-wrapper').fadeToggle(500);
  });

  $('.humburger-nav_item a').on('click',function(){
    $('.humburger-nav-wrapper').fadeOut(100);
    $('.humburger-btn').removeClass('cross');
  });

  //スムーススクロール
  $('a[href^="#"]').click(function(){
    var speed = 400;
    var adjust = $('#header').height();
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - adjust;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
});