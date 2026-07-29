console.log("CodeCards V3 Lernmodus gestartet");



let cards = [];

let currentCardIndex = 0;



const category =
document.getElementById("category");


const question =
document.getElementById("question");


const answer =
document.getElementById("answer");


const showAnswer =
document.getElementById("showAnswer");


const rating =
document.getElementById("rating");





async function loadCards() {


    const response =
    await fetch("data/cards.json");


    cards =
    await response.json();



    showCard();

}





function showCard() {


    const card =
    cards[currentCardIndex];



    category.textContent =
    card.category;



    question.textContent =
    card.question;



    answer.textContent =
    card.answer;



    answer.style.display =
    "none";



    rating.style.display =
    "none";



    showAnswer.style.display =
    "inline-block";

}





showAnswer.addEventListener(
    "click",
    () => {


        answer.style.display =
        "block";


        rating.style.display =
        "block";


        showAnswer.style.display =
        "none";


    }
);





document
.querySelectorAll("#rating button")
.forEach(button => {


    button.addEventListener(
        "click",
        () => {


            const result =
            button.dataset.rating;



            console.log(
                "Bewertung:",
                result
            );



            nextCard();


        }
    );


});





function nextCard() {


    currentCardIndex++;



    if(
        currentCardIndex >= cards.length
    ){

        currentCardIndex = 0;

    }



    showCard();

}





loadCards();
