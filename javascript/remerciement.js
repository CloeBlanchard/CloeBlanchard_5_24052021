// Récupération de orderId du localStorage
const get_orderId = localStorage.getItem("orderId");


// Calcule du prix total de la commande
let products = JSON.parse(localStorage.getItem("product"));
let price_calculate = [];

for (let item = 0; item < products.length; item++) {
    let price_total_basket = products[item].prix
    
    price_calculate.push(price_total_basket);
}

// Addition de tous les produit avec reduce (accumulateur)
const reducer = (accumulator, current_value) => accumulator + current_value;
const price_total = price_calculate.reduce(reducer, 0);

// Affichage du prix total
const page_thanks = document.querySelector("#page_remerciement");
if (price_total === null || price_total === 0) {
    const empty_thanks = `<p>Remplissez d'abord votre panier :)</p>`
    page_thanks.innerHTML = empty_thanks;
} else {
    const full_thanks = `<h2 class="recap_commande">Récapitulatif de votre commande</h2>
    <div class="confirmation_commande">
        <p>Nous vous remercions pour l'achat de nos produit</p>
        <p class="prix_totale_commande">Le montant de votre commande est de <span class="prix_commande">${price_total}€</span></p>
        <p>Votre commande à bien été prise en compte.</p>
        <p>Elle portera le N°</p>
        <p class="numero_commande">${get_orderId}</p>
        <p>Au plaisir de vous revoir et nous esperons que votre achat vous conviendra.</p>
    </div>`;
    page_thanks.innerHTML = full_thanks;
};


// Supprimer localStorage sauf formulaire
// function suppression_key_localStorage(key) {
//     localStorage.removeItem(key);
// };
// suppression_key_localStorage("orderId");
// suppression_key_localStorage("product");
// suppression_key_localStorage("valuesForm");
// suppression_key_localStorage("Confirmation_Commande");