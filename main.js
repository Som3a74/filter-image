const saturate = document.getElementById('saturate')
const contrast = document.getElementById('contrast')
const brightness = document.getElementById('brightness')
const sepia = document.getElementById('sepia')
const grayscale = document.getElementById('grayscale')
const blur = document.getElementById('blur')
const hue_rotate = document.getElementById('hue_rotate')

const download = document.getElementById('download')
const upload = document.getElementById('upload')
const img = document.getElementById('img')

const Resrt = document.getElementById('Resrt')
const img_box = document.querySelector('.img_box')

let allFilters = document.querySelectorAll('.filter ul li input')

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext("2d");

// display some button until upload imge
window.onload = () => {
    Resrt.style.display = 'none'
    download.style.display = 'none'
    img_box.style.display = 'none'
}

// reset values input
function resetValues() {
    img.style.filter = 'none'
    saturate.value = '100'
    contrast.value = '100'
    brightness.value = '100'
    sepia.value = '0'
    grayscale.value = '0'
    blur.value = '0'
    hue_rotate.value = '0'
}

// upload img
upload.onchange = function () {
    resetValues();
    Resrt.style.display = 'block'
    download.style.display = 'block'
    img_box.style.display = 'block'

    // constractor to read file upload
    let file = new FileReader()
    // input type file save img in array 
    file.readAsDataURL(upload.files[0])
    //wait to img upload
    file.onload = function () {
        img.src = file.result
    }
    img.onload = function () {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        img.style.display = 'none'
    }
}

allFilters.forEach((filter) => {
    filter.addEventListener('input', () => {
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value}%)
            blur(${blur.value}px)
            hue-rotate(${hue_rotate.value}deg)
        `
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    })
})

Resrt.onclick = function () {
    resetValues()
}

download.onclick = function () {
    download.href = canvas.toDataURL('image/jpg')
}