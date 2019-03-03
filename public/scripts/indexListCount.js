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


  $('.smart-search').submit(function (event) {
    event.preventDefault();
    let searchHits;
    const $newItemName = $('.smart-search .user-item');
    $.post('/sorter', { item: $newItemName.val(), user: $('#EATCount').data('id') })
      .done(function(data) {
        if (data.status === 201) {
          $newItemName.val('').focus();
          updatePageCounts();
        } else if (data === 'No match found') {
          $newItemName.val('').focus();
          alert(data);
        } else {
          $newItemName.val('').focus();
          console.log(data);
          // Lightbox code here
        }
      });
    });
      // $.ajax({
      // url: '/sorter',
      // type: 'POST',
      // data: {
      //   item: newItemName.val()
      // },
      // success: (function(data) {
      //   console.log(data)
      // });
    // if (searchHits.length === 1) {
    //   console.log(searchHits);
    //   $.post(`/lists/${searchHits[0].type}`, searchHits[0].name)
    //     .done(updatePageCounts());
    // }
  // });

    // $postTweet.submit(function (ev) {
  //   ev.preventDefault();
  //   $('.errorMsg').slideUp(50);
  //   if ($tweetText.val() === '' || $tweetText.val() === null) {
  //     $('.errorMsg').html('Blank tweets are not accepted!');
  //     $('.errorMsg').slideDown(400);
  //   } else if ($tweetText.val().length > 140) {
  //     $('.errorMsg').html('Too many characters!');
  //     $('.errorMsg').slideDown(400);
  //   } else {
  //     $.post('/tweets', $postTweet.serialize())
  //       .done(loadTweets);
  //     $tweetText.val('');
  //     $counter.html(140);
  //   }
  // });

});
