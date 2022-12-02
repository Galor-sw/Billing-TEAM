// Input email confirmation

$("document").ready(() => {
    $('input[name="submit"]').click(function (e) {
        e.preventDefault();
        let mail = $('input[name="mail"]').val();
        let jsonMail = {"mail": mail};
        if (mail) {
            $.post(`${window.location.origin}/emailCheck`, jsonMail)
                .done(function (msg) {
                    if (msg == "The email exists") {
                        window.location.replace(`${window.location.origin}/loginAndForm/form.html?mail=${mail}`);
                    } else {
                        document.getElementById("failmsg").innerHTML = msg;
                    }

                })
                .fail(function (xhr, status, error) {
                    console.log("failed send to server" + error);

                })
            // Empty input
        } else {
            document.getElementById("failmsg").innerHTML = "Please insert an email address";
        }
    });
});