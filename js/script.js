//
// Hamburger Menu
const mainMenu = document.querySelector(".header__menu")
const menuButton = document.getElementById("menuButton")

menuButton.addEventListener("click", menuInteract)

function menuInteract() {
	menuButton.classList.toggle("active")
	if (menuButton.classList.contains("active")) {
		mainMenu.style.display = "flex"
		mainMenu.style.right = "0"
	} else {
		mainMenu.style.right = "-50%"
	}
}

//
// Carousel
const prevButton = document.getElementById("prevButton")
const nextButton = document.getElementById("nextButton")
const images = document.querySelectorAll(".gallery__container img")
let currentIndex = 0

prevButton.addEventListener("click", showPreviousImage)
nextButton.addEventListener("click", showNextImage)

function showPreviousImage() {
	images[currentIndex].style.display = "none"
	currentIndex = (currentIndex - 1 + images.length) % images.length
	images[currentIndex].style.display = "block"
}

function showNextImage() {
	images[currentIndex].style.display = "none"
	currentIndex = (currentIndex + 1) % images.length
	images[currentIndex].style.display = "block"
}

function handleScreenSize() {
	const screenWidth = window.innerWidth

	if (screenWidth > 720) {
		prevButton.style.display = "none"
		nextButton.style.display = "none"
		images.forEach(image => {
			image.style.display = "block"
		})
	} else {
		prevButton.style.display = "block"
		nextButton.style.display = "block"
		images.forEach(image => {
			image.style.display = "none"
		})
		images[0].style.display = "block"
	}
}

handleScreenSize()
window.addEventListener("resize", handleScreenSize)

//
// Visualizer
const closeButton = document.getElementById("closeButton")
closeButton.addEventListener("click", closeFullscreenVisualizer)

function closeFullscreenVisualizer() {
	const fullscreenVisualizer = document.querySelector(".visualizer__fullscreen")
	fullscreenVisualizer.style.display = "none"
}

const downloadButton = document.getElementById("downloadButton")
downloadButton.addEventListener("click", downloadImage)

function downloadImage() {
	const fullscreenImage = document.getElementById("fullscreenImage")
	const downloadButton = document.getElementById("downloadButton")
	downloadButton.href = fullscreenImage.src
}

if (window.innerWidth > 720) {
	images.forEach(image => {
		image.addEventListener("click", openFullscreenVisualizer)
	})

	const prevButtonVisualizer = document.getElementById("prevButtonVisualizer")
	const nextButtonVisualizer = document.getElementById("nextButtonVisualizer")
	prevButtonVisualizer.addEventListener("click", showPreviousImage)
	nextButtonVisualizer.addEventListener("click", showNextImage)

	function openFullscreenVisualizer(event) {
		const fullscreenVisualizer = document.querySelector(".visualizer__fullscreen")
		const fullscreenImage = document.getElementById("fullscreenImage")

		fullscreenImage.src = event.target.src
		fullscreenVisualizer.style.display = "flex"
		prevButtonVisualizer.style.display = "block"
		nextButtonVisualizer.style.display = "block"

		for (let i = 0; i < images.length; i++) {
			if (images[i] === event.target) {
				currentIndex = i
				break
			}
		}

		updateButtonsState()
	}

	function showPreviousImage() {
		currentIndex = (currentIndex - 1 + images.length) % images.length
		updateFullscreenImage()
	}

	function showNextImage() {
		currentIndex = (currentIndex + 1) % images.length
		updateFullscreenImage()
	}

	function updateFullscreenImage() {
		const fullscreenImage = document.getElementById("fullscreenImage")
		fullscreenImage.src = images[currentIndex].src
		updateButtonsState()
	}

	function updateButtonsState() {
		prevButtonVisualizer.disabled = currentIndex === 0
		nextButtonVisualizer.disabled = currentIndex === images.length - 1
	}
}

//
// Current year for copyright
const currentYearSpan = document.getElementById("currentYear")
const currentYear = new Date().getFullYear()
currentYearSpan.textContent = currentYear
