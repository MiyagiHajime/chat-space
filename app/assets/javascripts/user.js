$(function () {
  $('#user-search-field').on('keyup', function () {

    user_search_list = $('#chat-group-users');


    //ユーザが存在した時にhtmlを構築
    function appendUser(user) {
      console.log(user)
      var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
            </div>
            `
      $("#user-search-result").append(html);
    }

    //ユーザが存在しないときにhtmlを構築
    function errorMsg() {
      var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
      $("#user-search-result").append(html);
    }

    //削除ボタンを追加
    function addDeleteUser(name, id) {
      let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
      $(".js-add-user").append(html);
    }


    function addMember(userId) {
      // console.log(userId)
      let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
      $(`#${userId}`).append(html);
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
        // console.log(users)
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendUser(user);
          });
        }
        else {
          errorMsg()
        }
      })
      .fail(function () {
        console.log("失敗です。");
      })



    $(document).on('click', '.chat-group-user__btn--add', function () {
      const userName = $(this).attr('data-user-name');
      const userId = $(this).attr('data-user-id');
      console.log(this)
      $(this).parent().remove();
      addDeleteUser(userName, userId);
      addMember(userId);
    });

    $(document).on("click", ".chat-group-user__btn--remove", function () {
      $(this).parent().remove();
    });
  })
})
