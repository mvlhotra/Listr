$(document).ready(function () {
  const userId = $('#user_id').data('id');
  const link = $(location).attr('href').split('/');
  const cat_code = link[link.length - 1];


  function formatListItems(items) {
    items.forEach((item) => {
      $('.list-group').append(`<li class="list-group-item" data-itemId =${item.id}><i class="fas fa-check"></i> <span class="item-name" id=#${item.id}>${item.item_name}</span> <span class="edit-delete"><i class="fas fa-times"></i></span>`);
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
    console.log(editItemId);
    console.log($('.item-name ').html());
    $.get(`/lists/${cat_code}/${editItemId}`, { name: $('.item-name').html() })
      .done(function (itemDetails) {
        console.log(itemDetails);
      });


    // $.ajax({
    //   type: 'POST',
    //   url: `${cat_code}/${checkedItemId}`,
    // }).done(function () {
    //   $('.list-group').empty();
    //   getListItems();
    // });


  });


});


