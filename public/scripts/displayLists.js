$(document).ready(function () {
  const userId = $('#user_id').data('id');
  const link = $(location).attr('href').split('/');
  const cat_code = link[link.length - 1];

  function formatListItems(items) {
    items.forEach(item => {
      $('.list-group').append(`<li class="list-group-item"><i class="fas fa-check"> </i>${item.item_name}<i class="fas fa-times"></i>`);
    });
  }

  $.ajax(`/api/lists/${cat_code}/${userId}`, { method: 'GET' }).then(function (content) {
    formatListItems(content);

  });

});
