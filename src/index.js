document.addEventListener("DOMContentLoaded", function() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        data.message.forEach(function(imageUrl) {
            let imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            document.getElementById("dog-image-container").appendChild(imgElement);
        });
    })
    .catch(function(error) {
        console.log(error);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        let breedList = data.message;
        let ulElement = document.getElementById("dog-breeds");

        for (let breed in breedList) {
            let liElement = document.createElement("li");
            liElement.textContent = breed;
            ulElement.appendChild(liElement);

            liElement.addEventListener("click", function() {
                liElement.style.color = "blue";
            });
        }
        })
    .catch(function(error) {
        console.log(error);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        let breedList = data.message;
        let ulElement = document.getElementById("dog-breeds");
        let dropdown = document.getElementById("breed-dropdown");

        let allBreedsOption = document.createElement("option");
        allBreedsOption.value = "";
        allBreedsOption.textContent = "All Breeds";
        dropdown.appendChild(allBreedsOption);
        
        let letters = ["a", "b", "c", "d"];
        for (let letter of letters) {
            let option = document.createElement("option");
            option.value = letter;
            option.textContent = letter;
            dropdown.appendChild(option);
        }
        
        dropdown.removeChild(allBreedsOption);
        
        let firstOption = dropdown.firstChild;
        dropdown.insertBefore(allBreedsOption, firstOption);

        function filterBreeds(selectedLetter){
            ulElement.innerHTML = "";
            
            if (selectedLetter === "") {
                for (let breed in breedList){
                    let liElement = document.createElement("li");
                    liElement.textContent = breed;
                    ulElement.appendChild(liElement);
                }
            } else {
                for (let breed in breedList) {
                    if (breed.startsWith(selectedLetter)) {
                        let liElement = document.createElement("li");
                        liElement.textContent = breed;
                        ulElement.appendChild(liElement);
                    }
                }
            }
         }
        
        dropdown.addEventListener("change", function(event) {
            let selectedLetter = event.target.value;
            filterBreeds(selectedLetter);
        });

        filterBreeds("");
    })
    .catch(function(error){
        console.log(error);
    });
});
