const itemData = document.querySelector("#table-data");
const form = document.querySelector("#form-new-item");

const backendUrl = "http://localhost:3000";

window.onload = () => {
	renderItems(itemData);
}

async function renderItems(element) {
	const data = await fetch(`${backendUrl}/items`)
		.then(res => res.json());
	
	data.forEach((item) => {
		element.innerHTML += `
			<td>${item.id}</td>
			<td>${item.nome}</td>
			<td>${item.descricao}</td>
			<td>${item.valor}</td>
		`;
	});
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = new FormData(form);

	fetch(`${backendUrl}/items/create`, {
		method: "POST",
		body: data,
		headers: new Headers({
			Accept: 'application/json',
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin":'http://localhost:3000/items/create',
			"Access-Control-Allow-Methods": "POST"
		})
	});
})

