const accessKey = 'GC9mTHZF1vVEG10-pTythcsimSFDQcbY8LXpUr39CVg';
const searchForm = document.querySelector('#SearchForm');
const searchTerm = document.querySelector('#SearchTerm');
const searchResult = document.querySelector('.SearchResult');

let keyword = "";

async function searchImages(page) {
    keyword = searchTerm.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const imageUrl = data.results[0].urls.small;

        const image = document.createElement('img');
        image.src = imageUrl;

        const ImageLink = document.createElement('a');
        ImageLink.href = data.results[0].links.html;
        ImageLink.target = "_blank";

        ImageLink.appendChild(image);
        searchResult.appendChild(ImageLink);
       
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let page = 1;

    for (let i = 0; i < 12; i++) {
        await searchImages(page);
        page = page + 1;
    }
});
