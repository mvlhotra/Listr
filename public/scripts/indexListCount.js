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

  const user = $('#EATCount').data('id');
  $.ajax(`/api/listCounts/${user}`, { method: 'GET' }).then(function (content) {
    listCounts = getListCounts(content);
    updateCounts(listCounts);
  });
});
