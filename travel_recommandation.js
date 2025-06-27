const searchbtn = document.querySelector('#searchbtn');
const resetbtn = document.getElementById('resetbtn');
const result_divs = document.getElementById('showResults');

// Function to determine category from user input
function string_processor(ville) {
    ville = ville.toLowerCase();
    if (ville.startsWith('cou')) return 'countries';
    if (ville.startsWith('tem')) return 'temples';
    if (ville.startsWith('bea')) return 'beaches';
    return null;
}


function clearInputs() {
    result_divs.innerHTML = '';
}

document.getElementById('search_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let inputVal = document.getElementById('srch').value.trim();
    let cityCategory = string_processor(inputVal);
    console.log(cityCategory);

    if (!cityCategory) {
        result_divs.innerHTML = `<p>No results found for your input.</p>`;
        return;
    }

    fetch('travel_recommandation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const obj = data[cityCategory];
            
            if (!obj || obj.length === 0) {
                result_divs.innerHTML = `<p>No results found in the category "${cityCategory}".</p>`;
                return;
            }
            
            let html = `<h2>Category: ${cityCategory}</h2>`;

            if (cityCategory === 'temples' || cityCategory === 'beaches') {
                obj.forEach(item => {
                    html += `
                        <div style="margin-bottom: 20px;">
                            <p><strong>City Name:</strong> ${item.name}</p>
                            <p><strong>Description:</strong> ${item.description}</p>
                            <p><strong>Overview:</strong></p>
                            <img src="${item.imageUrl}" width="85%" /> <hr/>
                        </div>`;
                });
            } else if (cityCategory === 'countries') {
                obj.forEach(country => {
                    country.cities.forEach(city => {
                        html += `
                            <div style="height: 500px; width: 90%; margin: 6%;">
                                <p><strong>City Name:</strong> ${city.name}</p>
                                <p><strong>Description:</strong> ${city.description}</p>
                                <p><strong>Overview:</strong></p>
                                <img src="${city.imageUrl}" width="40%" />
                            </div>`;
                    });
                });
            }

            result_divs.innerHTML = html;
        })
        .catch(err => {
            result_divs.innerHTML = `<p>Error fetching data.</p>`;
            console.error(err);
        });
});

resetbtn.addEventListener('click', () => {
    document.getElementById('srch').value = '';
    clearInputs();
});
