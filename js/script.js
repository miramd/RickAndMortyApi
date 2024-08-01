
// async function get(){
//     const response = await fetch("https://rickandmortyapi.com/api/character");
//     const data = await response.json();
//     console.log(data);

//     document.querySelector("#content h1").innerHTML= "<h1>"+ data.results[0].name +"<h1>";
//     document.querySelector("#content img").src= data.results[0].image
//     document.querySelector("#content h5").innerHTML=data.results[0].gender;

//     data.results.map(function(actor){
//         console.log(actor.name);
//     })
//     document.querySelector("#actor").innerHTML =
//    `<select>
//     ${
//         data.results.map(actor => `<option>${actor.name}</option>`)
//     }
//     <\select>`



    // `<select name="" id="">
    //     <option>${data.results[0].name}</option>
    //     <option>${data.results[1].name}</option>
    //     <option>${data.results[2].name}</option>
    //     <option>${data.results[3].name}</option>
    //     <option>${data.results[4].name}</option>
       
    //    </select>  
// }

// get();


const api = "https://rickandmortyapi.com/api/character";
let allCharacters = []; 

async function getData() {
    try {
        const response = await fetch(api);
        const data = await response.json();
        //console.log(data);
        allCharacters = data.results; 
        //data.results :array
        printData(data);
    } catch (e) {
        console.log("Error:", e.message); //eza api didn't work display why 
    }
}

getData();

function printData(data) {
    const header = document.querySelector("#header");
    const content = document.querySelector("#content");
    
    //make search
    //make dropdown
    //fill the list from apii
    header.innerHTML = `
    <input type="text" id="search-input" class="form-control" placeholder="Search characters...">
    <select class="form-control mt-3" id="character-select">
        <option>Please Select</option>
        ${data.results.map(actor => `<option>${actor.name}</option>`).join('')}
    </select>`;
    
    document.getElementById('search-input').addEventListener('input', filterCharacters);
    document.getElementById('character-select').addEventListener('change', (e) => getCh(e.target.value));

    updateContent(data.results);
}

function updateContent(characters) {
    const content = document.querySelector("#content");
    content.innerHTML = ''; // Clear 
    
    characters.forEach(actor => {
        content.innerHTML += `
        <div class="flex">
            <h2>${actor.name}</h2>
            <img src="${actor.image}" class="rounded-circle" onclick="showMoreInfo('${actor.name}', '${actor.gender}', '${actor.species}', '${actor.status}', '${actor.image}')">
        </div>`;
    });
}

function filterCharacters() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredCharacters = allCharacters.filter(actor =>
        actor.name.toLowerCase().includes(searchInput)
    );
    
    const select = document.querySelector("#character-select");
    select.innerHTML = `
        <option>Please Select</option>
        ${filteredCharacters.map(actor => `<option>${actor.name}</option>`).join('')}
    `;
    
    updateContent(filteredCharacters);
}

async function getCh(name) {
    const content = document.querySelector("#content");
    if (name != "Please Select") {
      
            const response = await fetch(`${api}?name=${name}`);
            const data = await response.json();
            if (data.results.length > 0) {
                const character = data.results[0];
                content.innerHTML = `
                <div><h2>${character.name}</h2>
                <img src="${character.image}" class="rounded-circle" onclick="showMoreInfo('${character.name}', '${character.gender}', '${character.species}', '${character.status}', '${character.image}')"></div>`;
        }
    } else {
        updateContent(allCharacters); //no select > show all
    }
}

function showMoreInfo(name, gender, species, status, image) {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    const modalBodyText = document.getElementById("modal-body-text");
    modalBodyText.innerHTML = `
    <h2>${name}</h2>
    <h4>Gender: ${gender}</h4><h4>Species: ${species}</h4>
    <h4>Status: ${status}</h4>
    <img src="${image}" class="rounded-circle">`;

    modal.show();
}

