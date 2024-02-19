const itemData = document.querySelector("#table-data");
const form = document.querySelector("#form-new-item");
const deleteBtns = document.querySelector(".delete-btn");

const backendUrl = "http://localhost:3000";

window.onload = () => {
	renderItems(itemData);
}

async function renderItems(element) {
	const data = await fetch(`${backendUrl}/items`)
		.then(res => res.json());
	
	data.forEach((item) => {
		element.innerHTML += `
			<td class="item-id">${item.id}</td>
			<td class="item-name">${item.nome}</td>
			<td class="item-desc">${item.descricao}</td>
			<td class="item-value">${item.valor}</td>
			<td><button class="edit-btn">*</button></td>
			<td><button class="apply-btn hidden">V</button></td>
			<td><button class="cancel-btn hidden">X</button></td>
			<td><button class="delete-btn">✖</button></td>
		`;
	});
}

function getItem(element) {
	const item = { 
		id: element.querySelector(".item-id").textContent, 
		name: element.querySelector(".item-name").textContent, 
		description: element.querySelector(".item-desc").textContent, 
		value: element.querySelector(".item-value").textContent, 
	} 
	return item; 
}

function toggleEdit(element, bool) {
	const cells = element.cells;
	console.log(cells);
	for (let i = 1; i < cells.length-4; i++) {
		cells[i].setAttribute("contenteditable", `${bool}`);
	}
	for (let i = cells.length-2; i > cells.length-5; i--) {
		cells[i].classList.toggle("hidden");
	}
}

form.addEventListener("submit", (event) => {
	const item = {
		name: event.target.name.value,
		description: event.target.description.value,
		price: event.target.price.value,
	};

	fetch(`${backendUrl}/items/create`, {
		method: "POST",
		body: JSON.stringify(item),
		headers: new Headers({
			Accept: 'application/json',
			"Content-Type": "application/json",
		})
	});
});

itemData.addEventListener("click", (event) => {
	const itemElement = event.target.parentNode.parentNode;	
	const button = event.target;

	if (button.classList.contains("delete-btn")) {
		const item = getItem(itemElement);
		fetch(`${backendUrl}/items/${item.id}`, { method: "DELETE" })
			.then(res => res.json())
			.then(window.location.reload());
	} else if (button.classList.contains("edit-btn")) {
		toggleEdit(itemElement, true);
	} else if (button.classList.contains("apply-btn")) {
		console.log("apply");
	}
})
