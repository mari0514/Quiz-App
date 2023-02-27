// Variables

let count = 0;
let time = 30;
let marks = 0;
let answer = [];
let timer;

// Main ready functions

$(document).ready(function(){
    $('#finish').hide();
    $('#Result').hide();

    buttonsManager();

    // functions

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


    // Question function
    
    function addingQuestions(data, i) {
        $('#question').text(data[i].question);
        $('#option1').text(data[i].correctAnswer);
        $('#option2').text(data[i].incorrectAnswers[0]);
        $('#option3').text(data[i].incorrectAnswers[1]);
        $('#option4').text(data[i].incorrectAnswers[2]);
        $('#number').text(Number(i+1));


    }

    // Answer Function
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


    function createResult(data) {
        for (let i = 0; i < answer.length; i++) {
            marks += 5;
        }
        $('#main').hide();

        // $('#marks').text(marks);
        $('#correct-answer').text(marks / 5);
        $('#percentage').text(marks * 4 + '%');

        $('#Result').show();

    }
    $('#options').hide();


    // Attaching API
    fetch('quiz.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        $('#btn').click(function() {
            // console.log(data.Questions);
            $('#options').show();
            addingQuestions(data.Questions, count);
            $('#start_page').hide();
            $('#prev').hide();

            timer = setInterval(timerFunction, 1000);

            function timerFunction() {
                $('#time').text(time);
                if (timer < 1) {
                    clearInterval(timer);
                    alert('Oops, seems like you\'re out of your time');
                    createResult(data);
                    $('#main').hide();
                    $('#Result').show();
                }
                time--;
            }
        });

        // selecting option

        $('.option').click(function() {

            $(this).addClass("active");
            $(this).siblings().removeClass("active");
            answer[count] = $(this).html();
        });


        // next question

        $('#next').click(function() {
            if (count > answer.length - 1) {
                alert('Please choose one option');
            } else {
                count++;
                addingQuestions(data.Questions, count);
                $('#prev').show();
                $('.option').removeClass("active");
                buttonsManager();
                selectedAnswer();
            }
        });



        // previous question

        $('#prev').click(function() {
            count--;
            addingQuestions(data.Questions, count);
            buttonsManager();
            selectedAnswer();
        });


        // finishing the quiz

        $('#finish').click(function() {
            if (count > answer.length - 1) {
                alert('Please select an option');
            } else {
                createResult(data);
                clearInterval(timer);
            }
        });

    })



})

