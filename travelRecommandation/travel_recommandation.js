results_div = document.querySelector('#showResults')
searchbtn = document.querySelector('#searchbtn')
resetbtn = document.getElementById('resetbtn')

fetch('travel_recommandation_api.json')
    .then(response => response.json())
    .then(
        searchbtn.addEventListener(onclick, search())
    )