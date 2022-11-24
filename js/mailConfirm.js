
$("document").ready(() => {
$('input[name="submit"]').click( function(e) {
    e.preventDefault();
    let mail= $('input[name="mail"]').val();
    if(mail)
    {
        $.post('http://localhost:8080/', mail)
            .done(function(msg)
                {
                    console.log("successes send to server");
                    console.log(msg);
                    if(msg == "The email exist")
                    {
                        window.location.replace("http://localhost:8080/loginAndForm/form.html?mail="+mail);
                    }
                    else
                    {
                        sendFailMassage(msg);
                    }

                })
            .fail(function(xhr, status, error)
            {
                console.log("failed send to server"+ error);
            });
    }
    else
    {
        sendFailMassage("Enter Mail Please");
    }
});
});

function sendFailMassage(msg){
    $('input[name="mail"]').val(msg);
    $('input[name="mail"]').css({ 'color': 'red'});
}