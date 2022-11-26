
$("document").ready(() => {
$('input[name="submit"]').click( function(e) {
    e.preventDefault();
    let mail= $('input[name="mail"]').val();
    if(mail)
    {
        $.post('http://localhost:8080/', mail)
            .done(function(msg)
                {
                    if(msg == "The email exist")
                    {
                        window.location.replace("http://localhost:8080/loginAndForm/form.html?mail="+mail);
                    }
                    else
                    {
                        failed=document.getElementById("failmsg");
                        failed.innerHTML = msg;
                    }

                })
            .fail(function(xhr, status, error)
            {
                console.log("failed send to server"+ error);

            });
    }
    else
    {
        $('article').text("Please insert an email address");
    }

});
});