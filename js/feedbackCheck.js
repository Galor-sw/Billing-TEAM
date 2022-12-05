const changeRate = (val) => {
    let emojis = ['😠', '😦', '😑', '😀', '😍'];
    document.getElementById("emoji").textContent = emojis[val];
}

let mail = '';
let urlParams = new URLSearchParams(window.location.search);
mail = urlParams.get('mail');
let isHaveFeedBack = false;

// Check if the user gave feedback already and set it to the form
$.get(`${window.location.origin}/users/${mail}`)
    .done((msg) => {
        if (msg != "The user hasn't given a feedback yet") {
            isHaveFeedBack = true;
            let feedBack = JSON.parse(msg);
            $('input[name="emoji"]').val(feedBack.rate);
            changeRate(feedBack.rate);
            if (feedBack.answers.recommend == "yes")
                $(".form-check-input").eq(0).prop("checked", true);
            else if (feedBack.answers.recommend == "no")
                $(".form-check-input").eq(1).prop("checked", true);

            if (feedBack.answers.choose_again == "yes")
                $(".form-check-input").eq(2).prop("checked", true);
            else if (feedBack.answers.choose_again == "no")
                $(".form-check-input").eq(3).prop("checked", true);

            $('textarea[name="improvement"]').val(feedBack.answers.improvement);

            if (feedBack.answers.customer_support == "yes")
                $(".form-check-input").eq(4).prop("checked", true);
            else if (feedBack.answers.customer_support == "no")
                $(".form-check-input").eq(5).prop("checked", true);

            $('textarea[name="free_text"]').val(feedBack.free_text);
        }
    })
    .fail((xhr, status, error) => {
        console.error("failed send to server" + error);
    });

let json = {};
$("document").ready(() => {
    // Send the feedback to the server to save
    $('input[name="submit"]').click((e) => {
        e.preventDefault();
        json.email = mail;
        json.free_text = $('textarea[name="free_text"]').val();
        json.rate = $('input[name="emoji"]').val();
        json.answers = {};
        json.answers.recommend = $("input[type='radio'][name='recommend']:checked").val();
        json.answers.choose_again = $("input[type='radio'][name='choose_again']:checked").val();
        json.answers.improvement = $('textarea[name="improvement"]').val();
        json.answers.customer_support = $("input[type='radio'][name='customer_support']:checked").val();
        $.post(`${window.location.origin}/users/${mail}/feedback`, json)
            .done((msg) => {
                if (msg == "The feedback was added") {
                    // Client clicked on "SEND" button
                    if (e.target.value == "Send")
                        window.location.replace(`/loginAndForm/message.html?message=${msg}`);
                    // Client clicked on "HELP" button
                    else if (e.target.value == "Help") {
                        $.get(`${window.location.origin}/contactSupport/${mail}`)
                            .done((link) => {
                                window.location.replace(link);
                            })
                            .fail((xhr, status, error) => {
                                console.error("failed to ask link for chat" + error);
                            });
                    }
                } else
                    alert("The feedback wasn't added");
            });
    });
    $('input[name="delete"]').click((e) => {
        e.preventDefault();
        json.email = mail;
        $.ajax({
            url: `${window.location.origin}/users/${mail}/feedback`,
            type: 'DELETE',
            data: json,
            success: (result) => {
                window.location.replace(`/loginAndForm/message.html?message=${result}`);
            }
        });

    });
});