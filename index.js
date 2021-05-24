// variable qui contient l'url de l'api
const get_api = fetch("http://localhost:3000/api/teddies");

// fonction qui va récupéré les infos de l'api et les afficher
get_api
    .then(async (responseData) => {

        const value = await responseData.json();

        try {
        // boucle qui va récupéré les infos de l'api
            for (let i = 0; i < value.length; i++) {
                const teddies_name = value[i].name
                const teddies_img = value[i].imageUrl
                const teddies_id = value[i]._id
                const teddies_description = value[i].description
                
        // affichage des infos dans le html
                const display_teddies = document.querySelector("#page_acceuil");
                display_teddies.innerHTML += ` <a href="./produit.html?id=${teddies_id}">
                                                <p>${teddies_name}</p>
                                                <img class="img_teddy" src="${teddies_img}" alt="ourson en peluche">
                                                <p>${teddies_description}</p>
                                                <p>Voir plus d'informations</p>
                                            </a>`;
            }
        }
        catch (err) {
            console.log(err);
        }
    })
    .catch((err) => {
        console.log(err);
});