
function fetchAPI(url, keyword) {
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            const container = document.getElementById('resultContainer');
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3');
            card.innerHTML = `
                    <div class="card-body text-center">
                        <h2 class="card-title fw-bold text-uppercase">${keyword}</h2>
                    </div>
                `;
            container.appendChild(card);
            console.log(data[keyword]);
            data[keyword].forEach(element => {
                if (Array.isArray(element.cities)) {
                    element.cities.forEach(item => {
                        const card = document.createElement('div');
                        card.classList.add('card', 'mb-3');
                        card.innerHTML = `
                            <div class="card-body">
                                <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text">${item.description}</p>
                            </div>
                        `;
                        container.appendChild(card);
                    });
                }
                else {
                    const card = document.createElement('div');
                    card.classList.add('card', 'mb-3');
                    card.innerHTML = `
                        <div class="card-body">
                            <img src="${element.imageUrl}" class="card-img-top" alt="${element.name}">
                            <h5 class="card-title">${element.name}</h5>
                            <p class="card-text">${element.description}</p>
                        </div>
                    `;
                    container.appendChild(card);
                }
            });
        });
}
function searchDestination() {
    clearResult();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    console.log(searchInput);
    let keywords = ['beach', 'beaches', 'temple', 'temples', 'country', 'countries'];
    if (keywords.includes(searchInput)) {
        window.location.href = '#home';
        let result;
        switch (searchInput) {
            case 'beach':
                result = 'beaches';
                break;
            case 'temple':
                result = 'temples';
                break;
            case 'country':
                result = 'countries';
                break;
            default:
                result = searchInput;
                break;
        }
        fetchAPI('travel_recommendation_api.json', result);

    }
    else {
        alert('No result found');
    }
    document.getElementById('searchInput').value = '';
}
function clearResult() {
    document.getElementById('resultContainer').innerHTML = '';
}
document.getElementById('btnSearch').addEventListener('click', searchDestination);
document.getElementById('searchInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchDestination();
    }
});
document.getElementById('btnClear').addEventListener('click', clearResult);