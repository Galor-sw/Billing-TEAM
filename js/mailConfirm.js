// Input email confirmation

const IAMbackupbyDB = () => {
    let mail = $('input[name="mail"]').val();
    let DBMail = {"mail": mail};
    if (mail) {
        $.post(`${window.location.origin}/users/emailCheck`, DBMail)
            .done(function (msg) {
                if (msg == "The email does not exist, try again") {
                    document.getElementById("failmsg").innerHTML = msg;
                } else {
                    window.location.replace(`${msg}/loginAndForm/form.html?mail=${mail}`);
                }
            })
            .fail((xhr, status, error) => {

            })
        // Empty input
    } else {
        document.getElementById("failmsg").innerHTML = "Please insert an email address";
    }
}

$("document").ready(() => {
    $('input[name="submit"]').click((e) => {
        e.preventDefault();
        let mail = $('input[name="mail"]').val();
        // Adding here the API of IAM - we'll validate through their server
        if (mail) {
            $.get(`http://iam-team.onrender.com/login/${mail}`)
                .done(msg => {
                    if (msg == "The user exists") {

                        window.location.replace(`${window.location.origin}/loginAndForm/form.html?mail=${mail}`);
                    } else {
                        document.getElementById("failmsg").innerHTML = "The email does not exist, try again";
                    }
                })
                .fail((xhr, status, error) => {
                    IAMbackupbyDB();
                })
        }
    });
});