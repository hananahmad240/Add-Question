const clearBtn = document.querySelector("#clear"),
	showBtn = document.querySelector("#show"),
	cardsConatiner = document.querySelector("#cards-container"),
	prevBtn = document.querySelector("#prev"),
	nextBtn = document.querySelector("#next"),
	currentEl = document.querySelector("#current"),
	addContainer = document.querySelector("#add-container"),
	hideBtn = document.querySelector("#hide"),
	questionEL = document.querySelector("#question"),
	answerEL = document.querySelector("#answer"),
	addCardBtn = document.querySelector("#add-card");
// current cards
let currentActiveCard = 0;

const cardsEL = [];

// const cardsData = [{
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ];
// get date from localStortage

const cardsData = getCardsData();

// create all cards
function createCards() {
	cardsData.forEach((data, index) => createCard(data, index));
}

// create single card in DOM
function createCard(data, index) {
	const card = document.createElement("div");
	card.classList.add("card");
	// check if index is zero
	if (index === 0) {
		card.classList.add("active");
	}
	card.innerHTML = `
                        <div class="inner-card">
                        <div class="inner-card-front">
                            <p>
                                ${data.question}
                            </p>
                        </div>
                        <div class="inner-card-back">
                            <p>
                                ${data.answer}
                            </p>
                        </div>
                    </div>
        `;

	// event listener
	card.addEventListener("click", () => {
		card.classList.toggle("show-answer");
	});
	cardsConatiner.appendChild(card);
	// save card in array
	cardsEL.push(card);

	updateCurrentText();
}

function updateCurrentText() {
	currentEl.innerHTML = `
    ${currentActiveCard + 1}/${cardsEL.length}
    `;
}

function getCardsData() {
	const cards = JSON.parse(localStorage.getItem("cards"));
	return cards === null ? [] : cards;
}

function setCardsData(data) {
	localStorage.setItem("cards", JSON.stringify(data));
	window.location.reload();
}

createCards();

showBtn.addEventListener("click", () => {
	addContainer.classList.add("show");
});
hideBtn.addEventListener("click", (e) => {
	addContainer.classList.remove("show");
});
addCardBtn.addEventListener("click", () => {
	const question = questionEL.value;
	const answer = answerEL.value;

	if (question.trim() && answer.trim()) {
		const data = {
			question,
			answer,
		};
		createCard(data);
		questionEL.value = "";
		answerEL.value = "";
		addContainer.classList.remove("show");
		cardsData.push(data);
		// set data in loaclstortage
		setCardsData(cardsData);
	} else {
		console.log("no");
	}
});
nextBtn.addEventListener("click", () => {
	cardsEL[currentActiveCard].className = "card left";
	currentActiveCard += 1;

	if (currentActiveCard > cardsEL.length - 1) {
		// currentActiveCard = 0;
		currentActiveCard = cardsEL.length - 1;
		alert("No More");
	}

	cardsEL[currentActiveCard].className = "card active";
	updateCurrentText();
});

prevBtn.addEventListener("click", () => {
	cardsEL[currentActiveCard].className = "card right";
	currentActiveCard = currentActiveCard - 1;

	if (currentActiveCard < 0) {
		currentActiveCard = 0;
		// currentActiveCard = cardsEL.length - 1;
		alert("No More");
	}

	cardsEL[currentActiveCard].className = "card active";
	updateCurrentText();
});

clearBtn.addEventListener("click", (e) => {
	localStorage.removeItem("cards");
	cardsConatiner.innerHTML = "";
	window.location.reload();
});
