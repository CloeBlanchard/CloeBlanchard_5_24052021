// Recupération de l'id dans l'url
const get_url_id = window.location.search;

// Récupération de l'id seul
const get_url_params = new URLSearchParams(get_url_id);
const get_id = get_url_params.get("id");

// Selection de l'objet dans l'api
let get_object = fetch(`http://localhost:3000/api/teddies/${get_id}`);

// Fonction qui va récupéré les infos de l'api et les afficher
get_object
    .then(async (responseData) => {
        const product = await responseData.json();
        try {
            const page_product = document.querySelector("#page_produit");

            // variable boule for pour les couleurs
            const colors = product.colors
            let choice_colors = ''
            for (let color = 0; color < colors.length; color++) {
                choice_colors += `<option value="${colors[color]}">${colors[color]}</option>`
            }

            // Affichage du produit sur le site
            page_product.innerHTML =`<h2 class="nom_produit">${product.name}</h2>
                                    <div class="presentation_teddies">
                                        <img class="img_produit" src="${product.imageUrl}" alt="ourson en peluche">
                                        <ul>
                                            <li><p class="description_produit">Description : ${product.description}</p></li>
                                            <li><p class="prix_produit">${product.price / 100}€</p></li>
                                        </ul>
                                    
                                        <div class="formulaire_contact">
                                            <form>
                                                <label id="choix_produit" for="choix_utilisateur">Choisissez la couleur :</label>
                                                <select name="choix_utilisateur" id="choix_utilisateur">
                                                    ${choice_colors}
                                                </select>
                                                <p><button id="btn_envoie" type="submit" name="btn_envoie">Ajouter au Panier</button></p>
                                            </form>
                                        </div>
                                    </div>`;

                //Gestion du panier
                // Récupération de l'id du panier
                    const get_id_select = document.querySelector("#choix_utilisateur");

                // Bouton envoie au panier
                    const submit_basket = document.querySelector("#btn_envoie");
            
                // Ecouter le bouton et envoyer le panier
                    submit_basket.addEventListener("click", (event)=>{
                        event.preventDefault();
                        
                        //Choix user dans variable
                        alert("Produit ajouté au panier");
                        const user_choice = get_id_select.value;
                    
                        //Récupération des valeurs du form
                        let choice_product = {
                            name: product.name,
                            id_product: product._id,
                            choix_product: user_choice,
                            prix: product.price / 100,
                            image: product.imageUrl,
                        }

                            // Gestion localstorage
                            // Récupération des valeurs du form dans le localstorage
                            // Vérification qu'il n'y ai pas de clé déjà mise dans le localstorage
                                let products = JSON.parse(localStorage.getItem("product"));

                            //Produit déjà enregistré dans localstorage
                                if(products) {
                                    products.push(choice_product);
                                    localStorage.setItem("product", JSON.stringify(products));
                                }
                            //enregistrer produit dans localstorage
                                else{
                                    products = [];
                                    products.push(choice_product);
                                    localStorage.setItem("product", JSON.stringify(products));
                                }
                    })
        }
        catch (err) {
        }
    })
    .catch((err) => {
});