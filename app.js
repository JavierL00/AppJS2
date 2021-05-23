const usuario = document.getElementById('usuario')
const posts = document.getElementById('posts')
const perfil = document.getElementById('perfil')
const templateTableU = document.getElementById('template-table-user').content
const templateTableP = document.getElementById('template-table-posts').content
const templateTablePr = document.getElementById('template-table-profile').content
const fragment = document.createDocumentFragment()
const arrow_left = document.getElementById('left')
const arrow_right = document.getElementById('right')
const arrow_left2 = document.getElementById('left2')
const arrow_right2 = document.getElementById('right2')
const div_perfil = document.getElementById('div-perfil')
const div_posts = document.getElementById('div-posts')

let n = 0; // Variable para el userId
let x = 0; // Variable para los posts

document.addEventListener('DOMContentLoaded', () => {
	obtenerUsuarios()
	obtenerPosts()
})

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
		llenarDatosPosts(data, x)
	} catch (error) {
		console.log(error)
	}
}

const llenarDatosUsuario = (data, n) => {

	const { id, name, username, email, website } = data.filter((e) => e.id === n)[0]

	templateTableU.querySelector(".one").textContent = id
	templateTableU.querySelector(".two").textContent = name
	templateTableU.querySelector(".three").textContent = username
	templateTableU.querySelector(".four").textContent = email
	templateTableU.querySelector(".five").textContent = website

	const clone = templateTableU.cloneNode(true)
	fragment.appendChild(clone)

	usuario.appendChild(fragment)
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
	if (div_perfil.style.display == 'block') {
		div_perfil.style.display = 'none';
	} else {
		div_perfil.style.display = 'block';
		div_posts.style.display = 'none';
	}
}

function mostrarPosts() {
	if (div_posts.style.display == 'block') {
		div_posts.style.display = 'none';
	} else {
		div_posts.style.display = 'block';
		div_perfil.style.display = 'none';
	}
}

function avanzarUsuario() {
	n = n + 1

	if (n == 0) {
		arrow_left.style.display = 'none'
	} else {
		if (n == 10) {
			arrow_right.style.display = 'none'
		}
		arrow_left.style.display = 'block'
	}
	obtenerUsuarios()
	console.log('boton funcionando adelante')
	console.log('n: ' + n)
}

function retrocederUsuario() {
	n = n - 1

	if (n == 0) {
		arrow_left.style.display = 'none'
	} else {
		if (n < 10) {
			arrow_right.style.display = 'block'
		}
		arrow_left.style.display = 'block'
	}

	console.log('boton funcionando atras')
	console.log('n: ' + n)
}

function avanzarPost() {
	x = x + 1

	if (x == 0) {
		arrow_left2.style.display = 'none'
	} else {
		if (x == 10) {
			arrow_right2.style.display = 'none'
		}
		arrow_left2.style.display = 'block'
	}

	console.log('boton funcionando adelante')
	console.log('x: ' + x)
}

function retrocederPost() {
	x = x - 1

	if (x == 0) {
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