function changeRate(val) {
    let emojis = ['😠', '😦', '😑', '😀', '😍'];
    document.getElementById("emoji").textContent = emojis[val];
}

let object ={};
$("document").ready(() => {

        $('input[name="submit"]').click( function() {
            object.rate= $('input[name="rate"]').val();
        });


});