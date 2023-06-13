const userHTML = document.getElementById('user')
const posts = document.getElementById('posts')
const profile = document.getElementById('profile')
const templateTableU = document.getElementById('template-table-user').content
const templateTableP = document.getElementById('template-table-posts').content
const templateTablePr = document.getElementById('template-table-profile').content
const fragment = document.createDocumentFragment()
const arrow_left = document.getElementById('left')
const arrow_right = document.getElementById('right')
const arrow_left2 = document.getElementById('left2')
const arrow_right2 = document.getElementById('right2')
const div_profile = document.getElementById('div-profile')
const div_posts = document.getElementById('div-posts')

let x = 0; // Variable para los posts
let userId = 0;
let position = 1;

document.addEventListener('DOMContentLoaded', () => {
	fillData(userId).then()
})

const getDataUsers = async () => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/users');
		return await res.json();
	} catch (error) {
		throw error;
	}
}

const fillData = async (n) => {
	try {
		const data = await getDataUsers();
		fillUserDataTemplate(data, n).then()
	} catch (error) {
		console.log(error)
	}
}

const fillUserDataTemplate = async (data, n) => {
	const user = data[n]
	if (user) {
		const { id, name, username, email, website } = user

		templateTableU.querySelector(".id").textContent = id
		templateTableU.querySelector(".name").textContent = name
		templateTableU.querySelector(".username").textContent = username
		templateTableU.querySelector(".email").textContent = email
		templateTableU.querySelector(".website").textContent = website

		userHTML.innerHTML = '';
		userHTML.appendChild(templateTableU.cloneNode(true));
	} else {
		console.log('User not found')
	}
}

function nextUser() {
	userId++;
	position++;
	if (position === 0) {
		arrow_left.style.display = 'none';
	} else {
		if (position === 10) {
			arrow_right.style.display = 'none';
		}
		arrow_left.style.display = 'block';
	}
	userHTML.innerHTML = '';
	fillData(userId).then();
}

function backUser() {
	userId--;
	position--;
	if (position === 1) {
		arrow_left.style.display = 'none'
	} else {
		if (position < 10) {
			arrow_right.style.display = 'block'
		}
		arrow_left.style.display = 'block'
	}
	userHTML.innerHTML = '';
	fillData(userId).then();
}

const obtenerUsuarios = async (n) => {
	if(n !== null){
		try {
			const res = await fetch('https://jsonplaceholder.typicode.com/users')
			const data = await res.json()
			llenarDatosUsuario(data, n)
			llenarDatosPerfil(data, n)
		} catch (error) {
			console.log(error)
		}
	} else {
		try {
			const res = await fetch('https://jsonplaceholder.typicode.com/users')
			const data = await res.json()
			llenarDatosUsuario(data, n)
			llenarDatosPerfil(data, n)
		} catch (error) {
			console.log(error)
		}
	}
}

const obtenerPosts = async () => {
	try {
		const res = await fetch('https://jsonplaceholder.typicode.com/posts')
		const data = await res.json()
		const postsFiltrados = data.filter(posts => posts.userId === n + 1)
		llenarDatosPosts(postsFiltrados, x)
	} catch (error) {
		console.log(error)
	}
}

const llenarDatosPosts = (data, x) => {

	const { userId, id, title, body } = data[x]

	templateTableP.querySelector(".one").textContent = userId
	templateTableP.querySelector(".two").textContent = id
	templateTableP.querySelector(".three").textContent = title
	templateTableP.querySelector(".four").textContent = body

	const clone = templateTableP.cloneNode(true)
	fragment.appendChild(clone)

	posts.appendChild(fragment)
}

const llenarDatosPerfil = (data, n) => {

	const { phone } = data[n]
	const { street, suite, city, zipcode } = data[n].address
	const { lat, lng } = data[n].address.geo
	const { name, catchPhrase, bs } = data[n].company

	templateTablePr.querySelector(".one").textContent = street
	templateTablePr.querySelector(".two").textContent = suite
	templateTablePr.querySelector(".three").textContent = city
	templateTablePr.querySelector(".four").textContent = zipcode
	templateTablePr.querySelector(".five").textContent = 'Latitud: ' + lat + ' Longitud: ' + lng
	templateTablePr.querySelector(".six").textContent = phone
	templateTablePr.querySelector(".seven").textContent = name
	templateTablePr.querySelector(".eight").textContent = catchPhrase
	templateTablePr.querySelector(".nine").textContent = bs

	const clone = templateTablePr.cloneNode(true)
	fragment.appendChild(clone)

	perfil.appendChild(fragment)
}

function mostrarPerfil() {
	if (div_perfil.style.display === 'block') {
		div_perfil.style.display = 'none';
	} else {
		div_perfil.style.display = 'block';
		div_posts.style.display = 'none';
	}
}

function mostrarPosts() {
	if (div_posts.style.display === 'block') {
		div_posts.style.display = 'none';
	} else {
		div_posts.style.display = 'block';
		div_perfil.style.display = 'none';
	}
}

function avanzarPost() {
	x = x + 1

	if (x === 0) {
		arrow_left2.style.display = 'none'
	} else {
		if (x === 10) {
			arrow_right2.style.display = 'none'
		}
		arrow_left2.style.display = 'block'
	}

	console.log('boton funcionando adelante')
	console.log('x: ' + x)
}

function retrocederPost() {
	x = x - 1

	if (x === 0) {
		arrow_left2.style.display = 'none'
	} else {
		if (x < 10) {
			arrow_right2.style.display = 'block'
		}
		arrow_left2.style.display = 'block'
	}

	console.log('boton funcionando atras')
	console.log('x: ' + x)
}