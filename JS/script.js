// Variables

let count = 0;
let time = 45;
let marks = 0;
let answer = [];
let question = [];
let timer;


// Main ready functions

$(document).ready(function(){
    $('#finish').hide();
    $('#result').hide();
    $('#detailedResult').hide();

    buttonsManager();


    // prev, next, finish buttons

    function buttonsManager() {
        if (count > 0) {
            $('#prev').show();
            if (count == 4) {
                $('#next').hide();
                $('#finish').show();
            } else {
                $('#next').show();
            }
        } else {
            $('#prev').hide();
        }
    }


    // display the questions/answers by using the data from API
    
    function addingQuestions(data, i) {
        // ramdomly shuffling answer options
        const shuffle = ([...arr]) => {
            for (let i = arr.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
        let options = [data[i].correctAnswer, data[i].incorrectAnswers[0], data[i].incorrectAnswers[1], data[i].incorrectAnswers[2]];
        let shuffledOptions = shuffle(options);


        $('#question').text(data[i].question);
        // $('#option1').text(data[i].correctAnswer);
        // $('#option2').text(data[i].incorrectAnswers[0]);
        // $('#option3').text(data[i].incorrectAnswers[1]);
        // $('#option4').text(data[i].incorrectAnswers[2]);
        $('#option1').text(shuffledOptions[0]);
        $('#option2').text(shuffledOptions[1]);
        $('#option3').text(shuffledOptions[2]);
        $('#option4').text(shuffledOptions[3]);
        $('#number').text(Number(i + 1));

    }


    // select one option

    function selectedAnswer() {
        for (let i = 0; i < 4; i++) {
            let a = document.getElementById("options").children;
            if (a[i].innerHTML == answer[count]) {
                $('#options').children("button")[i].classList.add("active");
            } else {
                $('#options').children("button")[i].classList.remove("active");
            }
        }
    }


    // create the result by judging if the user chose the correct answer or not

    function createResult(data) {
        for (let i = 0; i < answer.length; i++) {
            // console.log(i + ': ' + answer[i]);
            if (answer[i] == data[i].correctAnswer) {
                marks++;
            }
        }
        $('#main').hide();

        $('#correct-answer').text(marks);
        $('#percentage').text(marks * 20 + '%');

        $('#view-btn').click(function() {
            $('#view-btn').hide();
            $('#question1InResultPage').text(question[0]);
            $('#correctAnswer1').text(data[0].correctAnswer);
            $('#usersAnswer1').text(answer[0]);
            $('#question2InResultPage').text(question[1]);
            $('#correctAnswer2').text(data[1].correctAnswer);
            $('#usersAnswer2').text(answer[1]);
            $('#question3InResultPage').text(question[2]);
            $('#correctAnswer3').text(data[2].correctAnswer);
            $('#usersAnswer3').text(answer[2]);
            $('#question4InResultPage').text(question[3]);
            $('#correctAnswer4').text(data[3].correctAnswer);
            $('#usersAnswer4').text(answer[3]);
            $('#question5InResultPage').text(question[4]);
            $('#correctAnswer5').text(data[4].correctAnswer);
            $('#usersAnswer5').text(answer[4]);
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] != data[i].correctAnswer) {
                    $('#usersAnswer' + (i + 1)).css('color', '#f68686');
                }
            }
            $('#detailedResult').show();
        })


        $('#result').show();

    }
    $('#options').hide();


    // Attaching API

    let API = "https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5&difficulty=easy";
    // fetch('quiz.json')
    fetch(API,
    {
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        $('#btn').click(function() {
            $('#options').show();
            // addingQuestions(data.Questions, count);
            addingQuestions(data, count);
            $('#start_page').hide();
            $('#prev').hide();

            timer = setInterval(timerFunction, 1000);

            function timerFunction() {
                if (time < 10 && time > 0) {
                    $('#time').text('0' + time);
                } else if (time == 0) {
                    $('#time').text('00');
                    $('.time').css('color', 'red');
                } else if (time < 0) {
                    clearInterval(timer);
                    // alert('Oops, seems like you\'re out of your time');
                    $('#message').text('Oops, seems like you\'re out of time...');
                    createResult(data);
                    $('#main').hide();
                    $('#result').show();
                } else {
                    $('#time').text(time);
                }
                time--;
            }
        });


        // selecting option

        $('.option').click(function() {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            answer[count] = $(this).html();
            question[count] = $('#question').html();
        });


        // moving to the next question

        $('#next').click(function() {
            if (count > answer.length - 1) {
                alert('Please choose one option');
            } else {
                count++;
                // addingQuestions(data.Questions, count);
                addingQuestions(data, count);
                $('#prev').show();
                $('.option').removeClass("active");
                buttonsManager();
                selectedAnswer();
            }
        });


        // moving to the previous question

        $('#prev').click(function() {
            count--;
            // addingQuestions(data.Questions, count);
            addingQuestions(data, count);
            buttonsManager();
            selectedAnswer();
        });


        // finishing the quiz

        $('#finish').click(function() {
            if (count > answer.length - 1) {
                alert('Please select an option');
            } else {
                createResult(data);
                if (marks == 5) {
                    // 5
                    $('#message').text('Excellent job, well done!');
                } else if (marks > 3) {
                    // 4
                    $('#message').text('Close enough, keep up the good work!');
                } else if (marks > 1) {
                    // 3, 2
                    $('#message').text('You\'re doing just fine!')
                } else  {
                    // 1, 0
                    $('#message').text('Try harder!')
                }
                clearInterval(timer);
            }
        });

    })

})

if (JSON.parse(localStorage.getItem('formData')).length != 0) {
    let firstName = JSON.parse(localStorage.getItem('formData'))[0].firstName;
    let lastName = JSON.parse(localStorage.getItem('formData'))[0].lastName;
    $('#greetName').text(', ' + firstName + ' ' + lastName + ' ');
}


