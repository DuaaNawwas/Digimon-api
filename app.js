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

searchButton.addEventListener("click", function (e) {
	e.preventDefault();
	const digiName = searchInput.value;
	console.log(digiName);
	// const digiLevel = searchInput.value;
	if (digiName) {
		fetch("https://digimon-api.vercel.app/api/digimon/name/" + digiName)
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

		searchInput.value = "";
	}
});
