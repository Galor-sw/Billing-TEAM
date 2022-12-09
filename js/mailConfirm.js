// Input email confirmation
const IAMbackupbyDB = () => {
    let mail = $('input[name="mail"]').val();
    let DBMail = {"mail": mail};
    if (mail) {
        $.post(`${window.location.origin}/users/emailCheck`, DBMail)
            .done(function (msg) {
                if (msg == "The email exists") {
                    window.location.replace(`${window.location.origin}/loginAndForm/form.html?mail=${mail}`);
                } else {
                    document.getElementById("failmsg").innerHTML = msg;
                }
            })
            .fail((xhr, status, error) => {
                console.log("failed send to server" + error);

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
            $.get(`http://iam-team.onrender.com/api/login/${mail}`)
                .done(msg => {
                    if (msg == "The user exists")
                    {
                        window.location.replace(`${window.location.origin}/loginAndForm/form.html?mail=${mail}`);
                    }
                    else {
                        document.getElementById("failmsg").innerHTML = "The email does not exist, try again";
                    }
                })
                .fail((xhr, status, error) => {
                    IAMbackupbyDB();
                })
        }



    });
});