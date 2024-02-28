const phoneLode = async (inputValue = "13" , isShowAll) =>{
    const datas = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`);
    const res = await datas.json();
    // console.log(res.data)
    displayPhone(res.data , isShowAll)
}

const displayPhone = (phones , isShowAll) => {
    const phoneContainer = document.getElementById('phones-container');
    phoneContainer.innerText = "";
    // console.log(phones.length)
    const showBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
        showBtn.classList.remove('hidden');
    }else{
        showBtn.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)


    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    // console.log(phones)
    phones.forEach(phone => {
        // console.log(phone);

        
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = `"card p-8 bg-gray-100 shadow-xl`;
        phoneDiv.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick ="handleShowDetails('${phone.slug}');
            show_modal_details.showModal()
            " class="btn btn-primary">SHOW DETAILS</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
    toggleLoadingSpinner(false);
}

const handleShowDetails = async(id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;


    showPhoneDetailes(phone)
}

const showPhoneDetailes = (phone) => {
    console.log(phone);
    const showPhoneName = document.getElementById('show-phone-name-details');
    showPhoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span class = "text-xl mt-4">Storage : </span>${phone?.mainFeatures?.storage}</p>
    <p><span class = "text-xl mt-4">Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class = "text-xl mt-4">chip Set : </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class = "text-xl mt-4">Memory : </span>${phone?.mainFeatures?.memory}</p>
    <p><span class = "text-xl mt-4">Slug : </span>${phone?.slug}</p>
    <p><span class = "text-xl mt-4">Release Date : </span>${phone?.releaseDate || '28 february 2024'}</p>
    <p><span class = "text-xl mt-4">Brand : </span>${phone?.brand}</p>
    <p><span class = "text-xl mt-4">GPS : </span>${phone?.others?.GPS || 'No GPS avilable in the Phone'}</p>
    
    `

    show_modal_details.showModal()
}

const inputSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('input-field');
    const inputValue = searchField.value;
    console.log(inputValue);
    phoneLode(inputValue , isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loaddingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loaddingSpinner.classList.remove('hidden');
    }
    else{
        loaddingSpinner.classList.add('hidden');
    }
}

const handleshowAll = async () => {
    inputSearch(true);
}


phoneLode()