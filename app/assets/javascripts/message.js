$(function () {


  function buildHTML(message) {

    if (message.image) {
      var html = `
      <div class="chat-messageAA">
        <div class="chat-message-box">
          <div class="message-info">
            <div class="message-info__name">
              ${message.user_name}
            </div>
            <div class="message-info__date">
              ${message.created_at}
            </div>
          </div>
        </div>
        <div class="message-text">
          <p class="lower-message__content"> ${message.content} </p>${message.image}
          <img src=${message.image}>
        </div>
      </div>
      `
      return html
    } else {
      var html = `
      <div class="chat-messageAA">
        <div class="chat-message-box">
          <div class="message-info">
            <div class="message-info__name">
              ${message.user_name}
            </div>
            <div class="message-info__date">
              ${message.created_at}
            </div>
          </div>
        </div>
        <div class="message-text">
          <p class="lower-message__content"> ${message.content} </p>
        </div>
      </div>
    `
      return html
    }
  }

  //submitボタン押して発動
  $('#new_message').on('submit', function (e) {
    e.preventDefault()

    //formオブジェクト取得
    let formData = new FormData(this);

    //送信先のurlを取得
    let url = $('.new_message').attr('action');

    //ajax通信処理開始
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      //成功した場合
      .done(function (rsData) {
        var html = buildHTML(rsData);
        $('.chat-message').append(html);
        $('form')[0].reset();
        $('.chat-message').animate({ scrollTop: $('.chat-message')[0].scrollHeight });
        $('.submit-btn').attr("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
      });
  });
});
