const itemTable = document.querySelector("#items-table");
const form = document.querySelector("#form-new-item");

const backendUrl = "http://localhost:3000";

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const data = new FormData(event.target);
})

async function renderItems() {
	const data = await fetch(`${backendUrl}/items`).then(res.josn());
	console.log(data);
}
