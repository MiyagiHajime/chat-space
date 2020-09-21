$(function () {
  $('#user-search-field').on('keyup', function () {

    user_search_list = $('#chat-group-users');


    function appendUser(user) {
      var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
            </div>
            `
      user_search_list.append(html);
    }


    function errorMsg() {
      var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
      user_search_list.append(html);
    }



    //画面から入力された文字列を取得
    let input = $('#user-search-field').val()

    //ajax通信開始
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function (users) {
        user_search_list.empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
            console.log("あるよ");
          });
        }
        else {
          console.log("ないよ");
          errorMsg()
        }
      })
      .fail(function () {
        console.log("失敗です。");
      })
  })
})
