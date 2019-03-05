$(document).ready(function () {
  const userId = $('#user_id').data('id');
  const link = $(location).attr('href').split('/');
  const cat_code = link[link.length - 1];
  const cat_code_trnsltn = {
    EAT: 'To Eat',
    WAT: 'To Watch',
    BUY: 'To Buy',
    REA: 'To Read'
  }


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
  $('.heading').html(`<h1>Current List: ${cat_code_trnsltn[cat_code]}</h1>`)

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
        if (cat_code === 'REA') {
          $('.details').html(`<h2>${itemDetails.name}</h2><p><strong>Author:</strong> ${itemDetails.author}</p><p><strong>Released:</strong> ${itemDetails.released}</p>`);
        } else if (cat_code === 'EAT') {
          $('.details').html(`<h2>${itemDetails.name}</h2><p>Rating: ${itemDetails.rating}</p><p><strong>Price:</strong> ${itemDetails.price}</p>`);
          $('.summary').html(`<img src="${itemDetails.img}" width="250" height="300"> <p>Address:${itemDetails.address}</p>`);
        } else if (cat_code === 'WAT') {
          $('.details').html(`<h2>${itemDetails.name}</h2><p><strong>Rating:</strong> ${itemDetails.rating}/10</p><p><strong>Released:</strong> ${itemDetails.released}</p>`);
          $('.summary').html(`<img src="${itemDetails.img}" width="250" height="300"> <p>Synopsis:${itemDetails.plot}</p>`);
        } else if (cat_code === 'BUY') {
          $('.details').html(`<h2>${itemDetails.name}</h2><p><strong>Store:</strong> ${itemDetails.Store}</p><p>Price: ${itemDetails.Price}</p>`);
          $('.summary').html(`<img src="${itemDetails.img}" width="250" height="300"> <p><strong>Description:</strong> ${itemDetails.description}</p>`);
        }
        $('.cat-buttons').html(`<h2>Recategorize</h2><hr/> <form buttonText="Read" newCat="REA"><button type="submit" formmethod="POST" value="REA" name="newCat" formaction="/lists/${cat_code}/${editItemId}" class="btn btn-secondary btn-block">Read</button></form>
        <form buttonText="Watch" newCat="WAT"><button type="submit" formmethod="POST" value="WAT" name="newCat" formaction="/lists/${cat_code}/${editItemId}" class="btn btn-secondary btn-block">Watch</button></form>
        <form buttonText="Buy" newCat="BUY"><button type="submit" formmethod="POST" value="BUY" name="newCat" formaction="/lists/${cat_code}/${editItemId}" class="btn btn-secondary btn-block">Buy</button></form>
        <form buttonText="Eat" newCat="EAT"><button type="submit" formmethod="POST" value="EAT" name="newCat" formaction="/lists/${cat_code}/${editItemId}" class="btn btn-secondary btn-block">Eat</button></form>`)
      });
  });

  $('.item-input').submit(function (event) {
    event.preventDefault();
    const $newItemName = $('.item-input .item-name');
    $.post(`/lists/${cat_code}`, { text: $newItemName.val() })
      .done(function () {
        $('.list-group').empty();
        $newItemName.val('');
      })
      .then(function () {
        getListItems();
      });
  });
});
