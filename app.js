function Digimon(image, level, name) {
	this.image = image;
	this.level = level;
	this.name = name;
}
let digimonArr = [];
fetch("https://digimon-api.vercel.app/api/digimon")
	.then((res) => res.json())
	.then((data) => {
		console.log(data);
		for (let i = 0; i < 20; i++) {
			let newDigimon = new Digimon(data[i].img, data[i].level, data[i].name);
			digimonArr.push(newDigimon);
		}
		console.log(digimonArr);

		digimonArr.map(render);
		// render(data);
	});

let cardContainer = document.getElementById("card-container");

function render(digimonArr) {
	let card = document.createElement("div");
	cardContainer.append(card);

	let img = document.createElement("img");
	img.setAttribute("src", digimonArr.image);
	card.append(img);

	let cardText = document.createElement("div");
	card.append(cardText);

	let nameH2 = document.createElement("h2");
	nameH2.textContent = "Name: " + digimonArr.name;
	cardText.append(nameH2);

	let p = document.createElement("p");
	p.textContent = "Level: " + digimonArr.level;
	cardText.append(p);
}

// Search ----

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

const API = "https://digimon-api.vercel.app/api/digimon/";

const levels = [
	"champion",
	"ultimate",
	"mega",
	"rookie",
	"in training",
	"armor",
	"fresh",
];
console.log(levels.map((x) => console.log(x)));
let levelDigis = [];
searchButton.addEventListener("click", function (e) {
	e.preventDefault();
	let digiValue = searchInput.value;
	const x = ["name", "level"];

	// console.log(digiName);
	// const digiLevel = searchInput.value;
	if (digiValue) {
		if (levels.includes(digiValue)) {
			digiValue = digiValue.replace(" ", "");
			fetch(API + "level/" + digiValue)
				.then((res) => res.json())
				.then((newData) => {
					console.log(newData);
					if (newData.length > 0) {
						newData.forEach((one) => {
							let newDigi = new Digimon(one.img, one.level, one.name);
							cardContainer.innerHTML = "";

							levelDigis.push(newDigi);
						});
						levelDigis.map(render);
					} else {
						cardContainer.innerHTML = `<h2>This Digimon does not exist. <br> Try Again </h2>`;
					}
				});
		} else {
			fetch(API + "name/" + digiValue)
				.then((res) => res.json())
				.then((newData) => {
					console.log(newData);
					if (newData.length > 0) {
						newData.forEach((one) => {
							let newDigi = new Digimon(one.img, one.level, one.name);
							cardContainer.innerHTML = "";

							render(newDigi);
						});
					} else {
						cardContainer.innerHTML = `<h2>This Digimon does not exist. <br> Try Again </h2>`;
					}
				});
		}
		searchInput.value = "";
	}
});

// let levelDigis = [];
// fetch("https://digimon-api.vercel.app/api/digimon/level/" + digiLevel)
// 	.then((res) => res.json())
// 	.then((newData2) => {
// 		console.log(newData2);
// 		if (newData2.length > 0) {
// 			newData2.forEach((one2) => {
// 				let newDigi = new Digimon(one2.image, one2.level, one2.name);
// 				console.log(newDigi);
// 				levelDigis.push(newDigi);
// 				cardContainer.innerHTML = "";
// 			});
// 			levelDigis.map(render);
// 		} else {
// 			cardContainer.innerHTML = `<h2>This Digimon does not exist. <br> Try Again </h2>`;
// 		}
// 	});
