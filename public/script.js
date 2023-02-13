const history = []
console.log(history)
function onSubmit(e) {
    e.preventDefault()
    const prompt = document.querySelector('#prompt').value
    const size = document.querySelector('#size').value
    if (prompt === '') return alert('Please add some text')

    generateImageRequest(prompt, size)
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner()
        const response = await fetch('/api/openai/generate', {
            method: 'POST',
            headers: {
                'Content-Type':  'application/json'
            },
            body: JSON.stringify({
                text: prompt,
                size
            })
        })
        if (!response.ok) {
            removeSpinner()
            throw new Error('That could not be generated')
        }
        const {data} = await response.json()

        displayImage(data)
        removeSpinner()
    } catch (error) {
        console.log(error)
        document.querySelector('.msg').textContent = error
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}
function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

function displayImage(images) {
    history.push({images})
    const imageDiv = document.querySelector('#imageDiv')
    imageDiv.innerHTML = ''
    images.forEach(image => {
        imageDiv.innerHTML += `<img src=${image.url} class='image'/>`
    });
}
document.querySelector('#image-form').addEventListener('submit', onSubmit)