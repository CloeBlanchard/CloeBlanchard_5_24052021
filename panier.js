// Vérification qu'il n'y ai pas des clés mise dans le localstorage
let product_register = JSON.parse(localStorage.getItem("product"));
// console.log(product_register);

//Affichage du panier dans la page panier
const page_basket = document.querySelector("#page_panier");
// console.log(page_basket);

// If panier vide alors afficher rien
if(product_register === null || product_register == 0){
    const empty_basket = `<p>Vous n'avez pas d'article dans le panier</p>`;
    page_basket.innerHTML = empty_basket;
}
// If panier avec produit alors afficher les produit du localstorage
else{
    let full_basket = [];
    
    for(basket = 0; basket < product_register.length; basket++){
        full_basket = full_basket + `<div class="recapitulatif_commande">
                                    <p>Nom produit : ${product_register[basket].name}</p>
                                    <p>Couleur du produit : ${product_register[basket].choix_product}</p>
                                    <p>Montant du produit : ${product_register[basket].prix} €</p>
                                    <button class="btn_suppr" type="button" data-id="${product_register[basket].id_product}" data-color="${product_register[basket].choix_product}" >Supprimer le produit</button>
                                    </div>`;

    }
    if(basket === product_register.length){
        page_basket.innerHTML = full_basket;
        
    };
    
};


//Gestion supprimer produit
//Récupération de la class "btn_suppr"
const btn_suppr = document.querySelectorAll(".btn_suppr");
console.log("btn_suppr");
console.log(btn_suppr);

// supprimer un article du panier
for (let item = 0; item < btn_suppr.length; item++) {
    console.log("item");
    console.log(item);

    btn_suppr[item].addEventListener("click", (event) => {
        event.preventDefault();
        console.log("event");
        console.log(event);

        //Séléction de l'id produit qui sera supprimer
        const id_select_suppresion = product_register[item].id_product;
        console.log("id_select_suppresion");
        console.log(id_select_suppresion);

        //Méthode filter qui supprime l'élément cliquer
        product_register = product_register.filter(
            (el) => el.id_product !== id_select_suppresion
        );

        //Renvoie du produit supprimer dans le local storage et transformation en JSON
        localStorage.setItem("product", JSON.stringify(product_register));
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
    const get_values_form = {
        prenom : document.querySelector("#prenom_commande").value,
        nom : document.querySelector("#nom_commande").value,
        mail : document.querySelector("#mail_commande").value,
        adresse : document.querySelector("#adresse_commande").value,
        ville : document.querySelector("#ville_commande").value,
        code_postale : document.querySelector("#codePost_commande").value,
    }
    
    //Objet des values du formulaire
    const value_first_name = get_values_form.prenom;
    const value_last_name = get_values_form.nom;
    const value_mail = get_values_form.mail;
    const value_address = get_values_form.adresse;
    const value_city = get_values_form.ville;
    const value_postal_code = get_values_form.code_postale;
    
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
        localStorage.setItem("valuesForm", JSON.stringify(get_values_form));

    } else {
    };

    //Mettre en objet les données du panier et du formulaire
    const submit_command = {
        product_register,
        get_values_form,
    };

    localStorage.setItem("Envoie de la commande", JSON.stringify(submit_command));

    //Méthode POST pour envoyer la requête
    const post_url_api = "http://localhost:3000/api/teddies/order";
    fetch(post_url_api, {mode: 'cors'}, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submit_command)
    }).then (response => {
        localStorage.setItem("Envoie de la commande", JSON.stringify(response.submit_command));
            console.log("submit_command");
            console.log(submit_command);
            
            // Suppression du panier une fois la commande envoyé
            // localStorage.removeItem("product");
            // window.location.href("./confirmation.html");
    });
    console.log("post_url_api");
    console.log(post_url_api);
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