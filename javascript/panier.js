//Affichage du panier dans la page panier
const page_basket = document.querySelector("#page_panier");

let products = JSON.parse(localStorage.getItem("product"));

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
                                    <p>Nom produit : <span class="info-produit">${products[basket].name}</span></p>
                                    <p>Couleur du produit : <span class="info-produit">${products[basket].choix_product}</span></p>
                                    <p>Montant du produit : <span class="info-produit">${products[basket].prix}€</span></p>
                                    <button class="btn_suppr" type="button" data-id="${products[basket].id_product}" data-color="${products[basket].choix_product}" >Supprimer le produit</button>
                                    </div>`;

    }
    if(basket === products.length){
        page_basket.innerHTML += full_basket; 
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
//Récuperation du btn envoyer formulaire
const submit_form = document.querySelector("#envoyer_formulaire");

//Ecoute de l'event click
submit_form.addEventListener("click", (event)=>{
    event.preventDefault();

    //Récupération des valeurs du formulaire
    const contact = {
        firstName : document.querySelector("#prenom_commande").value,
        lastName : document.querySelector("#nom_commande").value,
        email : document.querySelector("#mail_commande").value,
        address : document.querySelector("#adresse_commande").value,
        city : document.querySelector("#ville_commande").value,
        code_post : document.querySelector("#codePost_commande").value,
    }
    
    //Objet des values du formulaire
    const value_first_name = contact.firstName;
    const value_last_name = contact.lastName;
    const value_mail = contact.email;
    const value_address = contact.address;
    const value_city = contact.city;
    const value_postal_code = contact.code_post;
    
    //Variable de validation
    let check_value_firstName = false;
    let check_value_lastName = false;
    let check_value_address = false;
    let check_value_city = false;
    let check_value_mail = false;
    let check_value_postalCode = false;

    //Condition pour la validité du formulaire
    if (/^[A-Z || a-z]{2,100}$/.test(value_first_name)) {
        check_value_firstName = true;
    } else {
        alert("Vérifiez le champ Prénom");
    };

    if (/^[A-Z || a-z]{2,100}$/.test(value_last_name)) {
        check_value_lastName = true;
    } else {
        alert("Vérifiez le champ Nom");
    };

    if (/^[A-Z || a-z0-9]{2,100}$/.test(value_address)) {
        check_value_address = true;
    } else {
        alert("Vérifiez le champ Adresse");
    };

    if (/^[A-Z || a-z]{2,100}$/.test( value_city)) {
        check_value_city = true;
    } else {
        alert("Vérifiez le champ Ville");
    };

    if (/^[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,50}$/.test(value_mail)) {
        check_value_mail = true;
    } else {
        alert("Vérifiez le champ E-mail");
    };

    if (/^[0-9]{5}$/.test(value_postal_code)) {
        check_value_postalCode = true;
    } else {
        
        alert("Vérifiez le champ Code Postal");
    };

    //Condition pour autorisé le formulaire dans le localstorage
    if (check_value_firstName && check_value_lastName && check_value_address && check_value_city && check_value_mail && check_value_postalCode){
        
        //Mettre l'objet get_values_form dans localstorage
        localStorage.setItem("valuesForm", JSON.stringify(contact));
        
        //Mettre en objet les données du panier et du formulaire et l'envoyer dans le local storage
        //Faire un boucle for
        let products = [];
        let product = JSON.parse(localStorage.getItem("product"));
        product.forEach( element => {
            products.push(element.id_product);
        });

        const submit_command = {
            contact,
            products,
        };

        fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify(submit_command),
        headers: {
            "Content-Type": "application/json",
        },
        }).then (async(response) => {
            try {
                localStorage.setItem("Confirmation_Commande", JSON.stringify(submit_command));

                const value_response = await response.json();

                    // Récupération de orderId de la requète post
                if(response.ok){

                    // Mettre orderId dans localStorage
                    localStorage.setItem("orderId", value_response.orderId)

                    // Redirection page de confirmation de la commande
                    window.location = "remerciement.html";

                }

            } catch(e){
            };
            
            // Récupération de l'id de la réponse de la requete
        }).catch((erreur) => {
        })

        

    } else {
        alert("Une erreur c'est produite");
    };
});