const searchbtn = document.querySelector('#searchbtn');
const resetbtn = document.getElementById('resetbtn');

//Retrieves the value the user typed in with first letter uppercase to match json file
let city = document.getElementById('srch').value.toLowerCase(); console.log(city);
city = 'temples';

// Writing a function to prevent the default behavior of the submit event
function prevent_default(event) {
    event.preventDefault();
}

//avoid the actual submission
searchbtn.addEventListener('submit', prevent_default);


//function to treat the user input before displaying the results
function string_processor(ville) {
    if (ville.startsWith('cou')) {
        ville = 'countries'; 
        return true
    }
    else if(ville.startsWith('tem')) {
        ville = 'temples';
        return true
    }
    else if(ville.startsWith('bea')) {
        ville = 'beaches'; 
        return true
    }
    else {
        return false
    }
}

//fetching results from parsed json
fetch('travel_recommandation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(typeof(data));
        //name of the categories of searches in json file
        const list_villes = Object.keys(data);
        console.log(list_villes);
        data_list = Object.entries(data); console.log('the list: ');console.log(data_list); console.log(typeof(data_list[1]));
        let found = string_processor(city); console.log(found);
        let html;
        
        //Check if the city value is in the data promise and build the html else return a default string
        if (found) {    
            let i = 0;
            for (let i; i < 3; i++) {
                let obj = data[city];
                console.log('log of obj:'); console.log(typeof(obj)); 
                if (city == list_villes[i] && i < 3) {
                    html = `<h2>Country Name: ${obj.name}</h2>`
                    for (i = 0; i < obj.cities.lenght; i++) {
                        html += `<h3>City Name: ${obj.cities.name}<h3/>
                        <img src=${obj.cities.imageUrl}>
                        <p>Recommandation: ${obj.cities.description}`; console.log('var html')
                    }
                    results_div.innerHTML = html
                    break;
                }
                else {
                    i += 1
                }
            }
            if (!found){
                html = `Sorry, not available yet, try to contact us`;
                results_div.innerHTML = html;
            }
            
            
        }
    })
