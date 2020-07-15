// helper functions
function qs(selector){
    return document.querySelector(selector)
}

function ce(element){
    return document.createElement(element)
}

// variables
const header = qs("#dog-bar")
const dogInfo = qs("#dog-info")
const filterBtn = qs("#good-dog-filter")

// fetch Dogs
function fetchDogs(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(showDogs)
}

// iterate through dogs
function showDogs(dogs){
    dogs.forEach(dog => displayDog(dog))
}

// display single dog
function displayDog(dog){
    const span = ce("span")

    const name = ce("h2")
    name.innerText = dog.name

    span.addEventListener("click", () => {
        // clears the current info on the page before loading the new info
        dogInfo.innerHTML = ""

        const img = ce("img")
        const dogName = ce("h2")
        const label = ce("label")
        const btn = ce("button")

        img.src = dog.image
        dogName.innerText = `Name: ${dog.name}`
        label.innerText = "Is a good dog?"
        btn.innerText = dog.isGoodDog
        
        btn.addEventListener("click", () => {
            let updateDog = dog
            // make dog behavior opposite whatever it was
            updateDog.isGoodDog = !dog.isGoodDog
                
            // update behavior of current dog on server
            let configObj = {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: updateDog.isGoodDog
                })
            }
            
            fetch(`http://localhost:3000/pups/${dog.id}`, configObj)
            .then(res => res.json())
            .then(data => btn.innerText = data.isGoodDog)
        })

        dogInfo.append(img, dogName, label, btn)
    })

    span.appendChild(name)
    header.appendChild(span)
    
    // // bonus
    // filterBtn.addEventListener("click", () => {
    //     let switchBtn = filterBtn.innerText
    // })
}

fetchDogs()