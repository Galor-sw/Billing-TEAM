function changeRate(val) {
    let emojis = ['😠', '😦', '😑', '😀', '😍'];
    document.getElementById("emoji").textContent = emojis[val];
}

let mail='';
let urlParams = new URLSearchParams(window.location.search);
mail= urlParams.get('mail');

$.post('http://localhost:8080/emailCheck', mail)
    .done(function(msg)
    {
        console.log("success send to server");
        let feedBack=JSON.parse(msg);
    });

let object ={};
$("document").ready(() => {

        $('input[name="submit"]').click( function() {
            object.rate= $('input[name="rate"]').val()
        });
});