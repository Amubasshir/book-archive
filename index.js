const searchResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error');
const totalResult = document.querySelector('#total-result');
const loadingSpinner = document.getElementById('loadingSpinner');
const searchField = document.getElementById('search-field');
const buttonSearch = document.getElementById('buttonSearch');
const searchError = document.getElementById('searchError');
const emptyError = document.getElementById('emptyError');

// loading spinner
const toggleSpinner = (show) => {
    const spinner = loadingSpinner;
    // console.log(spinner);
    show ? spinner.classList.remove('d-none') : spinner.classList.add('d-none');
};

// get data and search book
const searchBook = async () => {
    const searchText = searchField.value;
  

    //clear data
    searchField.value = '';
    searchResult.textContent = '';
    totalResult.textContent = '';
    emptyError.innerHTML = '';
    searchError.textContent = '';
    if (searchText === '') {
        toggleSpinner(false);
        emptyErrorHandle();
    } else {
        toggleSpinner(true);
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => displaySearchResult(data))
            .catch((error) => console.log(error));
    }
};

//search result
const displaySearchResult = (bookData) => {
    toggleSpinner(false);
    searchError.textContent = '';
   
    const total = bookData.numFound;
    if (total === 0) {
        notFoundHandler();
    }

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `
            <h5 class="text-success bg-light fw-bold p-2 ">Total books found : ${total}</h5> 
        `;

    totalResult.appendChild(totalDiv);

    const books = bookData.docs.slice(7, 20);

    books?.forEach((doc) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="book card h-100">
                <img src="https://covers.openlibrary.org/b/id/${doc?.cover_i}-M.jpg" 
                    class="card-img-top " alt="Not found" />
                <div class="card-body">
                    <h3 class="card-title">${doc.title.slice(0, 8)}</h3>
                    <h6 class="card-title text-danger">Author: ${doc.author_name?.[0]}</h6>
                    <h6 class="card-title">Publisher: ${doc.publisher?.[0]}</h6>
                    <h6 class="card-title">First Publish: ${doc.publish_year?.[0]}</h6>
                    
                    
                            
                </div>
        </div>
        `;

        searchResult.appendChild(div);
    });
};

//  Empty search error handle
const emptyErrorHandle = () => {
    emptyError.innerHTML = `
    <p class="text-danger text-center fw-bold ">Type something.....</p>`;
};

// 404 NOT found error
const notFoundHandler = () => {
    searchError.innerHTML = `
	<p class="text-danger text-center fw-bold "> No result found<p>`;
};