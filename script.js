const access_key = "SPS-2-38EsSAufAeTctr4VCUuDLdtD70h9mG7ueH2AM"

const error = document.querySelector("#error")
const form = document.querySelector("form");
const to_search = document.querySelector(".input-text");
const search_btn = document.querySelector(".search-btn");
const container = document.querySelector(".container")
const showmore = document.querySelector(".show-more-btn")

let input_data = ""
let page = 1

async function search_images(){
    input_data = to_search.value;
    // console.log(input_data)
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=
    ${input_data}&client_id=${access_key}`

    const response = await fetch(url)
    // if(response === error){
    //     to_search.focus("incorrect search")
    //     return
    // }
    const data = await response.json()

    // console.log(data)
    const result = data.results
    // console.log(result)
    // console.log(result[0].links.download)
    if(result.length ===0){
        to_search.value=""
        to_search.focus();
        console.log("hii")
        console.log(error)
        error.style.display = "block";
        return
    }

    error.style.display = "none";
    if(page === 1){
        container.innerHTML = ""
    }

    result.map((ele)=>{
        const image_store = document.createElement("div")
        image_store.classList.add("search-results")
        const image = document.createElement("img")
        image.src = ele.urls.small
        image.alt = ele.alt_description
        const imagelink = document.createElement("a")
        imagelink.href = ele.links.html
        imagelink.target = "_blank"
        imagelink.textContent = ele.alt_description

        image_store.appendChild(image)
        image_store.appendChild(imagelink)
        container.appendChild(image_store)
    })

    page = page+1

    if(page > 1){
        showmore.style.display = "block"
    }
}

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1
    search_images()

})

showmore.addEventListener("click",()=>{
    search_images()
})

// search_images("cat")