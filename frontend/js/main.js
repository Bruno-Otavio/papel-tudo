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
			<td><img src="./assets/interface-edit.svg" class="edit-btn"></td>
			<td class="hidden"><img src="./assets/interface-checked.svg" class="apply-btn"></td>
			<td class="hidden"><img src="./assets/interface-close.svg" class="cancel-btn"></td>
			<td><img src="./assets/interface-delete.svg" class="delete-btn"></td>
		`;
	});

	document.querySelector("#total").textContent = await calculateTotal();
}

async function calculateTotal() {
	const items = await fetch(`${backendUrl}/items`, { method: "GET" }).then(res => res.json());

	let total = 0;
	items.forEach((item) => {
		total += parseInt(item.valor);
	});

	return total;
}

function getItem(element) {
	const item = { 
		id: element.querySelector(".item-id").textContent, 
		name: element.querySelector(".item-name").textContent, 
		description: element.querySelector(".item-desc").textContent, 
		price: element.querySelector(".item-value").textContent, 
	} 
	return item; 
}

function toggleEdit(element, bool) {
	const cells = element.cells;
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

	const request = new Request(`${backendUrl}/items/create`, {
		method: "POST",
		body: JSON.stringify(item),
		headers: new Headers({
			Accept: 'application/json',
			"Content-Type": "application/json",
		})
	});

	if (!checkDataError(item)) {
		fetch(request);
	} else {
		event.preventDefault();
		errorHandler("One of the fields is empty");
	}
});

function checkDataError(data) {
	for (let key in data) {
        if (data[key] === "") return true;
    }
}

function errorHandler(message) {
	console.log(message);
	const errorField = document.querySelector("#error");
	errorField.innerHTML = message;
}

async function cancel(item, element) {
	const defaultItem = await fetch(`${backendUrl}/items/${item.id}`)
		.then(res => res.json());

	element.querySelector(".item-name").textContent = defaultItem.nome;
	element.querySelector(".item-desc").textContent = defaultItem.descricao;
	element.querySelector(".item-value").textContent = defaultItem.valor;

	window.location.reaload();
}

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
		toggleEdit(itemElement, false);
		const item = getItem(itemElement);

		const request = new Request(`${backendUrl}/items/${item.id}`, {
			method: "PUT",
			body: JSON.stringify(item),
			headers: new Headers({
				Accept: "application/json",
				"Content-Type": "application/json"
			})
		})	

		if (!checkDataError(item)) {
			fetch(request)
				.then(res => res.json());
		} else {
			errorHandler("One of the fields is empty");
			cancel(item, itemElement);
		}

	} else if (button.classList.contains("cancel-btn")) {
		toggleEdit(itemElement, false);

		const item = getItem(itemElement);
		cancel(item, itemElement);
	}
})
