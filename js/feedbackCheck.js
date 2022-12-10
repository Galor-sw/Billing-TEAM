const URL = window.location.origin;
let urlParams = new URLSearchParams(window.location.search);
let mail = urlParams.get('mail');
let json = {};
const changeRate = (val) => {
    let emojis = ['😠', '😦', '😑', '😀', '😍'];
    document.getElementById("emoji").textContent = emojis[val];
}
//save feedback details from client to js object
const saveJson =() =>
{
    json.email = mail;
    json.free_text = $('textarea[name="free_text"]').val();
    json.rate = $('input[name="emoji"]').val();
    json.answers = {};
    json.answers.recommend = $("input[type='radio'][name='recommend']:checked").val();
    json.answers.choose_again = $("input[type='radio'][name='choose_again']:checked").val();
    json.answers.improvement = $('textarea[name="improvement"]').val();
    json.answers.customer_support = $("input[type='radio'][name='customer_support']:checked").val();
    json.metaData = {};
    json.metaData.age = $("input[type='number'][name='age']").val();
    json.metaData.gender = $("input[type='radio'][name='gender']:checked").val();
    json.metaData.occupation = $("input[type='text'][name='occupation']").val();
}

const displayFeedbackDetails =(feedBack) =>
{
    $('input[name="emoji"]').val(feedBack.rate);
    changeRate(feedBack.rate);
    if (feedBack.answers[0]) {
        if (feedBack.answers[0].recommend == "yes")
            $(".form-check-input").eq(0).prop("checked", true);
        else if (feedBack.answers[0].recommend == "no")
            $(".form-check-input").eq(1).prop("checked", true);

        if (feedBack.answers[0].choose_again == "yes")
            $(".form-check-input").eq(2).prop("checked", true);
        else if (feedBack.answers[0].choose_again == "no")
            $(".form-check-input").eq(3).prop("checked", true);

        $('textarea[name="improvement"]').val(feedBack.answers[0].improvement);

        if (feedBack.answers[0].customer_support == "yes")
            $(".form-check-input").eq(4).prop("checked", true);
        else if (feedBack.answers[0].customer_support == "no")
            $(".form-check-input").eq(5).prop("checked", true);
    }
    $('textarea[name="free_text"]').val(feedBack.free_text);

    if (feedBack.metaData[0]) {
        if (feedBack.metaData[0].age)
            $("input[type='number'][name='age']").val(feedBack.metaData[0].age);
        if (feedBack.metaData[0].gender == "Female")
            $(".form-check-input").eq(6).prop("checked", true);
        else if (feedBack.metaData[0].gender == "Male")
            $(".form-check-input").eq(7).prop("checked", true);
        if (feedBack.metaData[0].occupation)
            $("input[type='text'][name='occupation']").val(feedBack.metaData[0].occupation);
    }
}

// get number of feedback that ever send and display to browser
$.get(`${URL}/counter`)
    .done(counter => {
        document.getElementsByTagName("p")[0].innerHTML = "Number of feedbacks that sent: " + counter;
    })
    .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
    });

// Check if the user gave feedback already and set it to the form
$.get(`${URL}/users/${mail}`)
    .done((msg) => {
        if (msg != "The user hasn't given a feedback yet") {
            let feedBack = JSON.parse(msg);
            displayFeedbackDetails(feedBack);
        }
    })
    .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
    });

$("document").ready(() => {
    // Send the feedback to the server to save
    $('input[name="submit"]').click((e) => {
        e.preventDefault();
        saveJson();
        $.post(`${URL}/users/${mail}/feedback`, json)
            .done((msg) => {
                if (msg == "The feedback was added") {
                    // Client clicked on "SEND" button
                    if (e.target.value == "Send")
                        window.location.replace(`/loginAndForm/message.html?message=${msg}`);
                    // Client clicked on "HELP" button
                    else if (e.target.value == "Help") {
                        $.get(`${URL}/contactSupport/${mail}`)
                            .done((link) => {
                                window.location.replace(link);
                            })
                            .fail((xhr, status, error) => {
                                console.error("failed to ask link for chat" + error);
                            });
                    }
                } else
                    window.location.replace(`/loginAndForm/message.html?message=${msg}`);
            })
            .fail((xhr, status, error) => {
            console.error("failed send to server" + error);
        });
    });
    // Send delete request to the server
    $('input[name="delete"]').click((e) => {
        e.preventDefault();
        json.email = mail;
        $.ajax({
            url: `${URL}/users/${mail}/feedback`,
            type: 'DELETE',
            data: json,
            success: (result) => {
                window.location.replace(`/loginAndForm/message.html?message=${result}`);
            }
        });

    });
});