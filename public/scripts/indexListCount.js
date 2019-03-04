$(document).ready(function () {
  function getListCounts(content) {
    let countArray = [];
    content.forEach(function (list) {
      countArray.push([list.cat_code, parseInt(list.count)]);
    });
    return countArray;
  }
  function updateCounts(listCounts) {
    listCounts.forEach(function (category) {
      $(`#${category[0]}Count`).html(category[1].toString());
    });
  }
  function updatePageCounts() {
    const user = $('#EATCount').data('id');
    $.ajax(`/api/listCounts/${user}`, { method: 'GET' }).then(function (content) {
      listCounts = getListCounts(content);
      updateCounts(listCounts);
    });
  }

  updatePageCounts();
  $('.bouton').fadeIn(1000);

  $(document).on('submit', '.didYouMean', function (event) {
    event.preventDefault();
    const cat_code = $(event.target).attr('buttonType');
    const name = $(event.target).attr('buttonText');
    $.ajax({
      url: `/lists/${cat_code}`,
      type: "POST",
      data: {
        text: name,
      },
      success: function () {
        $('.multi .multi-buttons').empty();
        updatePageCounts();
      },
      error: function () {
        alert('Something went wrong');
      }
    });
  });

  function makeButtons(data) {
    let multiString = '';
    data.forEach(function (result) {
      let typeFull;
      if (result.type === 'WAT') {
        typeFull = '(To Watch)';
      } else if (result.type === 'REA') {
        typeFull = '(To Read)';
      } else if (result.type === 'BUY') {
        typeFull = '(To Buy)';
      } else {
        typeFull = '(To Eat)';
      }
      multiString += `<form class='didYouMean' buttonText="${result.name}" buttonType="${result.type}" ><button type="submit" formmethod="POST" value="${result.name}" name="text" formaction="/lists/${result.type}" class="btn btn-dark">${result.name} ${typeFull}</button></form>`
    });
    $('.multi .multi-buttons').append(multiString);
  };

  $('.smart-search').submit(function (event) {
    event.preventDefault();
    const $newItemName = $('.smart-search .user-item');
    $.post('/sorter', { item: $newItemName.val(), user: $('#EATCount').data('id') })
      .done(function (data) {
        if (data.status === 201) {
          $newItemName.val('').focus().then(updatePageCounts());
        } else if (data === 'No match found') {
          $newItemName.val('').focus();
          alert(data);
        } else {
          $newItemName.val('').focus();
          makeButtons(data);
        }
      });
  });

  const user = $('#EATCount').data('id');
  $.ajax(`/api/listCounts/${user}`, { method: 'GET' }).then(function (content) {
    listCounts = getListCounts(content);
    console.log(listCounts);
    updateCounts(listCounts);
  });
});
