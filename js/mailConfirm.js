const URL = window.location.origin;

// Input email confirmation

const IAMbackupbyDB = () => {
    let mail = $('input[name="mail"]').val();
    if (mail) {
        //check if the mail exist in db
        $.post(`${URL}/users/emailCheck`, {"mail": mail})
            .done( msg => {
                if (msg == "The email does not exist, try again") {
                    document.getElementById("failmsg").innerHTML = msg;
                } else {
                    window.location.replace(`${URL}/loginAndForm/form.html?mail=${mail}`);
                }
            })
            .fail((xhr, status, error) => {
                    console.log("Failed send to server " + error);
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
        if (mail) {
            $.get(`https://iam-team.onrender.com/login/${mail}`)
                .done(msg => {
                    if (msg == "The user exists") {

                        window.location.replace(`${URL}/loginAndForm/form.html?mail=${mail}`);
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
