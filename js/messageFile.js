let urlParams = new URLSearchParams(window.location.search);
messageResult = urlParams.get('message');

$("document").ready(() => {

    $('h2').text(messageResult);
});

