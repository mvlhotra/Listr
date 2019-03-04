$(document).ready(function () {
  const userId = $('#user_id').data('id');
  const link = $(location).attr('href').split('/');
  const cat_code = link[link.length - 1];


  function formatListItems(items) {
    items.forEach((item) => {
      $('.list-group').append(`<li class="list-group-item" data-itemId =${item.id}><i class="fas fa-check"></i> <span class="item-name" id=#${item.id}>${item.item_name}</span><i class="fas fa-times"></i>`);
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
      $('.list-group').empty();
      getListItems();
    });
  });

  $('.list-group').on('click', '.fas.fa-times', function (done) {
    const deletedItemId = $(this).parent($(done.target)).attr('data-itemId');
    $.ajax({
      type: 'POST',
      url: `${cat_code}/${deletedItemId}/delete`,
    }).done(function () {
      $('.list-group').empty();
      getListItems();
    });
  });

  $('.list-group').on('click', '.item-name', function (done) {
    const editItemId = $(this).parent($(done.target)).attr('data-itemId');
    $.get(`/lists/${cat_code}/${editItemId}`)
      .done(function (itemDetails) {
        console.log(itemDetails);
      });
  });

  $('.item-input').submit(function (event) {
    event.preventDefault();
    const $newItemName = $('.item-input .item-name');
    $.post(`/lists/${cat_code}`, { text: $newItemName.val() })
      .done(function() {
        $('.list-group').empty();
        $newItemName.val('');
      })
      .then(function() {
        getListItems();
      });
  });
});
