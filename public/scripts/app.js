$(document).ready(function () {
  $('.logout').click(() => {
    console.log('yeye');
  });

});


$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

