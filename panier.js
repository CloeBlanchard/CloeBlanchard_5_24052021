// Vérification qu'il n'y ai pas des clés mise dans le localstorage
let products = JSON.parse(localStorage.getItem("product"));

//Affichage du panier dans la page panier
const page_basket = document.querySelector("#page_panier");

// If panier vide alors afficher rien
if(products === null || products == 0){
    const empty_basket = `<p>Vous n'avez pas d'article dans le panier</p>`;
    page_basket.innerHTML = empty_basket;
}
// If panier avec produit alors afficher les produit du localstorage
else{
    let full_basket = [];
    
    for(basket = 0; basket < products.length; basket++){
        full_basket = full_basket + `<div class="recapitulatif_commande">
                                    <p>Nom produit : ${products[basket].name}</p>
                                    <p>Couleur du produit : ${products[basket].choix_product}</p>
                                    <p>Montant du produit : ${products[basket].prix} €</p>
                                    <button class="btn_suppr" type="button" data-id="${products[basket].id_product}" data-color="${products[basket].choix_product}" >Supprimer le produit</button>
                                    </div>`;

    }
    if(basket === products.length){
        page_basket.innerHTML = full_basket;
        
    };
    
};


//Gestion supprimer produit
//Récupération de la class "btn_suppr"
const btn_suppr = document.querySelectorAll(".btn_suppr");

// supprimer un article du panier
for (let item = 0; item < btn_suppr.length; item++) {

    btn_suppr[item].addEventListener("click", (event) => {
        event.preventDefault();

        //Séléction de l'id produit qui sera supprimer
        const id_select_suppresion = products[item].id_product;

        //Méthode filter qui supprime l'élément cliquer
        products = products.filter(
            (el) => el.id_product !== id_select_suppresion
        );

        //Renvoie du produit supprimer dans le local storage et transformation en JSON
        localStorage.setItem("product", JSON.stringify(products));
        alert("Produit supprimer du panier");
        window.location.reload();
    });

}

// Formulaire de commande
//Récupération de l'id du positionnement
const get_id_form = document.querySelector("#formulaire_commande");
const display_form = `<h2>Remplissez les champs ci-dessous et valider la commande</h2>
                        <form>
                            <label for="prenom">Prénom : </label>
                            <input type="text" name="prenom" id="prenom_commande" class="formulaire_input" required>

                            <label for="nom">Nom : </label>
                            <input type="text" name="nom" id="nom_commande" class="formulaire_input" required>

                            <label for="mail">Mail : </label>
                            <input type="text" name="mail" id="mail_commande" class="formulaire_input" required>

                            <label for="adresse">Adresse de livraison : </label>
                            <input type="text" name="adresse" id="adresse_commande" class="formulaire_input" required></input>

                            <label for="ville">Ville : </label>
                            <input type="text" name="ville" id="ville_commande" class="formulaire_input" required>

                            <label for="codePost">Code postal : </label>
                            <input type="text" name="codePost" id="codePost_commande" class="formulaire_input" required>

                            <button id="envoyer_formulaire" type="submit" name="envoyer_formulaire">Envoyer la commande</button>
                        </form>`;
get_id_form.insertAdjacentHTML("afterend", display_form);

//Récuperation du btn envoyer formulaire
const submit_form = document.querySelector("#envoyer_formulaire");

//Ecoute de l'event click
submit_form.addEventListener("click", (event)=>{
    event.preventDefault;

    //Récupération des valeurs du formulaire
    const Contacts = {
        firstName : document.querySelector("#prenom_commande").value,
        lastName : document.querySelector("#nom_commande").value,
        email : document.querySelector("#mail_commande").value,
        address : document.querySelector("#adresse_commande").value,
        city : document.querySelector("#ville_commande").value,
        code_postale : document.querySelector("#codePost_commande").value,
    }
    
    //Objet des values du formulaire
    const value_first_name = Contacts.firstName;
    const value_last_name = Contacts.lastName;
    const value_mail = Contacts.email;
    const value_address = Contacts.address;
    const value_city = Contacts.city;
    const value_postal_code = Contacts.code_postale;
    
    //Condition pour la validité du formulaire du prenom, nom, mail, adresse et ville
    if(/^[A-Z || a-z]{2,100}$/.test(value_first_name && value_last_name && value_address && value_city)){

        //Condition pour la validité du formulaire de l'e-mail
        if(/^[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,50}$/.test(value_mail)){

            //Condition pour la validité du formulaire du code postale
            if(/^[0-9]{5}$/.test(value_postal_code)){

            } else {
                alert("Vérifier le champ du Code postal saisie");
            };

        } else {
            alert("Vérifier le champ de l'E-mail saisie");
        };

    } else {
        alert("Vérifier les champs ,du Prénom, du Nom, de l'Adresse et la Ville, saisies");
    };


    //Condition pour autorisé le formulaire dans le localstorage
    if (value_first_name && value_last_name && value_address && value_city && value_mail && value_postal_code){

        //Mettre l'objet get_values_form dans localstorage
        localStorage.setItem("valuesForm", JSON.stringify(Contacts));

    } else {
    };

// TEST DE LA REQUETES POST
    //Mettre en objet les données du panier et du formulaire
    const submit_command = {
        products,
        Contacts,
    };
    console.log(submit_command);
    // const commande_total = localStorage.setItem("Envoie de la commande", JSON.stringify(submit_command));

    // Envoie de l'objet "submit_command" à l'api
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(submit_command),
    }).then (async (response) => {
        const value = await response.json();
        try {
            localStorage.setItem("Commande complète", JSON.stringify(value.submit_command));
            localStorage.setItem("Id de commande", JSON.stringify(value.order_id));
            console.log("c'est ok");
            
        } catch (e) {
            console.log("e");
            console.log(e);
        }
    })
    // FIN DE TEST DE LA REQUETE POST

    // localStorage.setItem("Envoie de la commande", JSON.stringify(submit_command));

    // //Méthode POST pour envoyer la requête
    // const post_url_api = "http://localhost:3000/api/teddies/order";
    // fetch(post_url_api, {mode: 'cors'}, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(submit_command)
    // }).then (response => {
    //         localStorage.setItem("Envoie de la commande", JSON.stringify(response.submit_command));
    //         console.log("response.submit_command");
    //         console.log(response.submit_command);
            
            // Suppression du panier une fois la commande envoyé
            // localStorage.removeItem("product");
    //         // window.location.href("./confirmation.html");
    // });
    // console.log("post_url_api");
    // console.log(post_url_api);
//     const post_url_api = "http://localhost:3000/api/teddies/order";
//     fetch(post_url_api, {
//         method: "POST",
//         body: JSON.stringify(submit_command),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
//     console.log("post_url_api");
//     console.log(post_url_api);

    

//     // fetch(post_url_api
//         .then(async (response) => {
//             try {

//                 const value_command = await response.json();
//                 console.log("value_command");
//                 console.log(value_command);
//             } catch (error) {
//                 console.log("error");
//                 console.log(error);
//             }
//         });
})