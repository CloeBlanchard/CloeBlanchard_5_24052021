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
//Récuperation du btn envoyer formulaire
const submit_form = document.querySelector("#envoyer_formulaire");

//Ecoute de l'event click
submit_form.addEventListener("click", (event)=>{
    event.preventDefault;

    //Récupération des valeurs du formulaire
    const contact = {
        firstName : document.querySelector("#prenom_commande").value,
        lastName : document.querySelector("#nom_commande").value,
        email : document.querySelector("#mail_commande").value,
        address : document.querySelector("#adresse_commande").value,
        city : document.querySelector("#ville_commande").value,
        code_postale : document.querySelector("#codePost_commande").value,
    }
    
    //Objet des values du formulaire
    const value_first_name = contact.firstName;
    const value_last_name = contact.lastName;
    const value_mail = contact.email;
    const value_address = contact.address;
    const value_city = contact.city;
    const value_postal_code = contact.code_postale;
    
    //Variable de validation
    const check_value_firstName = false;
    const check_value_lastName = false;
    const check_value_address = false;
    const check_value_city = false;
    const check_value_mail = false;
    const check_value_postalCode = false;

    //Condition pour la validité du formulaire
    if (/^[A-Z || a-z]{2,100}$/.test(value_first_name)) {
        const check_value_firstName = true;
    } else {
        alert("Vérifiez le champ Prénom");
    };

    if (/^[A-Z || a-z]{2,100}$/.test(value_last_name)) {
        const check_value_lastName = true;
    } else {
        alert("Vérifiez le champ Nom");
    };

    if (/^[A-Z || a-z0-9]{2,100}$/.test(value_address)) {
        const check_value_address = true;
    } else {
        alert("Vérifiez le champ Adresse");
    };

    if (/^[A-Z || a-z]{2,100}$/.test( value_city)) {
        const check_value_city = true;
    } else {
        alert("Vérifiez le champ Ville");
    };

    if (/^[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,50}$/.test(value_mail)) {
        const check_value_mail = true;
    } else {
        alert("Vérifiez le champ E-mail");
    };

    if (/^[0-9]{5}$/.test(value_postal_code)) {
        const check_value_postalCode = true;
    } else {
        alert("Vérifiez le champ Code Postal");
    };

    //Condition pour autorisé le formulaire dans le localstorage
    if (value_first_name && value_last_name && value_address && value_city && value_mail && value_postal_code){
        //Mettre l'objet get_values_form dans localstorage
        localStorage.setItem("valuesForm", JSON.stringify(contact));
    } else {
        alert("Une erreur c'est produite");
    };


    //Mettre en objet les données du panier et du formulaire et l'envoyer dans le local storage
    const submit_command = {
        produit : products,
        contact : contact,
    };

    // Test 3 pour la requete post
    fetch("http://localhost:3000/api/teddies/order", {mode: 'cors'}, {
        method: "POST",
        body: JSON.stringify(submit_command),
        headers: {
            "Content-Type": "application/json",
        },
    }).then (response => {
        localStorage.setItem("Confirmation_Commande", JSON.stringify(submit_command));
        console.log("response");
        console.log(response);
    }).catch((erreur) => {
        console.log("erreur");
        console.log(erreur);
    })
    // Fin du test 3 pour la requete post
    // // Test 2 de le requete
    // const api_order = "http://localhost:3000/api/teddies/order";

    // let requete = new XMLHttpRequest();
    // requete.open("POST", api_order);
    // requete.setRequestHeader("Content-Type", "application/json");
    // requete.responseType = "json";
    // requete.send();
    // console.log(requete.open);

    // requete.onload = function() {
    //     if (requete.readyState === XMLHttpRequest.DONE){
    //         if (requete.status === 200) {
    //             let reponse = requete.reponse;
    //             console.log(reponse);
    //         } else {
    //             alert("Un problème est")
    //         }
    //     } else {}
    // }
// Fin du test 2 de la requete
    // const commande_total = localStorage.setItem("Envoie de la commande", JSON.stringify(submit_command));
// Test 1 de la requete
    // // Envoie de l'objet "submit_command" à l'api
    // fetch("http://localhost:3000/api/teddies/order", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type" : "application/json",
    //     },
    //     body: JSON.stringify(submit_command),
    // }).then (async (response) => {
    //     const value = await response.json();
    //     try {
    //         localStorage.setItem("Commande complète", JSON.stringify(value.submit_command));
    //         localStorage.setItem("Id de commande", JSON.stringify(value.order_id));
    //         console.log("c'est ok");

    //     } catch (e) {
    //         console.log("e");
    //         console.log(e);
    //     }
    // })
// Test 2 de la requete

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