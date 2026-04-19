/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        const headerHeight = mainNav.clientHeight;
        window.addEventListener('scroll', function() {
            const currentTop = document.body.getBoundingClientRect().top * -1;
            if ( currentTop < scrollPos) {
                // Scrolling Up
                if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-visible');
                } else {
                    console.log(123);
                    mainNav.classList.remove('is-visible', 'is-fixed');
                }
            } else {
                // Scrolling Down
                mainNav.classList.remove(['is-visible']);
                if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-fixed');
                }
            }
            scrollPos = currentTop;
        });
    }

    // Venti Domande Game
    const words = ['mela', 'auto', 'gatto', 'casa', 'albero', 'libro', 'telefono', 'montagna', 'mare', 'pizza'];
    const questions = [
        "Is it an animal?",
        "Is it a food?",
        "Is it man-made?",
        "Is it bigger than a person?",
        "Can you eat it?",
        "Is it a place?",
        "Is it electronic?",
        "Is it alive?",
        "Is it a vehicle?",
        "Is it a building?",
        "Is it small?",
        "Does it have wheels?",
        "Is it round?",
        "Is it green?",
        "Can you hold it in your hand?",
    ];
    const answers = [
        [0,1,0,0,1,0,0,0,0,0,1,0,1,0,1], // mela
        [0,0,1,1,0,0,0,0,1,0,0,1,0,0,0], // auto
        [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0], // gatto
        [0,0,1,1,0,1,0,0,0,1,0,0,0,0,0], // casa
        [0,0,0,1,0,0,0,1,0,0,0,0,0,1,0], // albero
        [0,0,1,0,0,0,0,0,0,0,0,0,0,0,1], // libro
        [0,0,1,0,0,0,1,0,0,0,0,0,0,0,1], // telefono
        [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0], // montagna
        [0,0,0,1,0,1,0,0,0,0,0,0,0,0,0], // mare
        [0,1,1,0,1,0,0,0,0,0,0,0,0,0,0], // pizza
    ];
    const hints = [
        "It's a fruit you can eat.",
        "It moves on roads and has wheels.",
        "It has fur and meows.",
        "You live inside it.",
        "It grows in the ground and has leaves.",
        "You read it for stories.",
        "You use it to call people.",
        "It's a very tall landform.",
        "It's a large body of water.",
        "It's a round food from Italy.",
    ];

    const currentIndex = Math.floor(Math.random() * words.length);
    let questionsAsked = 0;
    let guessesMade = 0;
    let asked = new Array(questions.length).fill(false);

    function updateCounters() {
        document.getElementById('counters').innerText = `Questions asked: ${questionsAsked}, Guesses made: ${guessesMade}`;
    }

    window.askQuestion = function(i) {
        if (asked[i]) return; // Already asked, do nothing
        asked[i] = true;
        questionsAsked++;
        updateCounters();
        const ans = answers[currentIndex][i];
        document.getElementById('answer').innerText = ans ? 'Yes' : 'No';
        // Gray out the button
        const button = document.querySelector(`button[onclick="askQuestion(${i})"]`);
        button.disabled = true;
        button.style.opacity = '0.5';
        button.style.cursor = 'not-allowed';
        // Add to discovered
        const discoveredDiv = document.getElementById('discovered');
        const item = document.createElement('div');
        item.style.margin = '2px 0';
        item.innerText = `${questions[i]}: ${ans ? 'Yes' : 'No'}`;
        discoveredDiv.appendChild(item);
    };

    window.makeGuess = function() {
        guessesMade++;
        updateCounters();
        const guess = document.getElementById('guess').value.toLowerCase().trim();
        if (guess === words[currentIndex]) {
            document.getElementById('result').innerText = 'Correct! It was ' + words[currentIndex] + '. Refresh to play again!';
            document.getElementById('hint').innerText = '';
            // Disable further input
            document.getElementById('guess').disabled = true;
            document.querySelector('button[onclick="makeGuess()"]').disabled = true;
        } else {
            if (questionsAsked + guessesMade > 20) {
                document.getElementById('result').innerText = 'You lost! The word was ' + words[currentIndex] + '. Refresh to play again!';
                document.getElementById('hint').innerText = '';
                // Disable further input
                document.getElementById('guess').disabled = true;
                document.querySelector('button[onclick="makeGuess()"]').disabled = true;
            } else {
                document.getElementById('result').innerText = 'Wrong! Try again.';
                if (guessesMade % 5 === 0) {
                    document.getElementById('hint').innerText = 'Hint: ' + hints[currentIndex];
                } else {
                    document.getElementById('hint').innerText = '';
                }
            }
        }
    };
})
