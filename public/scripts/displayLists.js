$(document).ready(function () {
  const userId = $('#user_id').data('id');
  const link = $(location).attr('href').split('/');
  const cat_code = link[link.length - 1];


  function formatListItems(items) {
    items.forEach((item) => {
      $('.list-group').append(`<li class="list-group-item" data-itemId =${item.id}><i class="fas fa-check"></i> ${item.item_name}<span class="edit-delete"><a href=""><i class="fas fa-pencil-alt"></i></a><a href=""><i class="fas fa-times"></i></a></span>`);
    });
  }

  function getListItems() {
    $.ajax(`/api/lists/${cat_code}/${userId}`, { method: 'GET' }).then(function (content) {
      formatListItems(content);
    });
  }
  getListItems();
  $('.list-group').fadeIn();

  $('.list-group').on('click', '.fas.fa-check', function (done) {
    const checkedItemId = $(this).parent($(done.target)).attr('data-itemId');
    $.ajax({
      type: 'POST',
      url: `${cat_code}/${checkedItemId}/delete`,
    }).done(function () {
      getListItems();
    });

  });

});


