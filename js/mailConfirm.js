// Input email confirmation

$("document").ready(() => {
$('input[name="submit"]').click( function(e) {
    e.preventDefault();
    let mail= $('input[name="mail"]').val();
    if(mail)
    {
        $.post('http://localhost:8080/sendToForm', mail)
            .done(function(msg)
                {
                    if(msg == "The email exists")
                    {
                        window.location.replace("http://localhost:8080/loginAndForm/form.html?mail="+mail);
                    }
                    else
                    {
                        document.getElementById("failmsg").innerHTML = msg;
                    }

                })
            .fail(function(xhr, status, error)
            {
                console.log("failed send to server"+ error);

            })
        // Empty input
    }
    else
    {
        document.getElementById("failmsg").innerHTML = "Please insert an email address";
    }
});
});