<template>
    <div id="container">
        <!-- Implement logo, search bar and cart button -->
        <div class="header">
            <button id="logo_button" @click="goToHomePage">
                <img src="/img/logo.png" alt="Logo da Quitanda da Fia">
            </button>

        <div class="search_bar">
            <img id="magnifier" src="/img/magnifier.png" alt="Lupa do campo de pesquisa"/>
            <input @keyup.enter="performSearch" type="text" v-model="searchQuery" placeholder="Digite sua pesquisa"/>
            <button class="search_button" @click="performSearch">Buscar</button>
        </div>
        
        <button class="cart_button" @click="goToCart">
            <img id="cart_button_image" src="/img/cart_button.png" alt="Botão para direcionar ao carrinho"/>
        </button>
        </div>

        <!-- Implement available categories -->
        <div class="categories">
        <div class="category" v-for="(products, category) in productCategories" :key="category">
            <a :href="`/#${category.toLowerCase().replace(/ /g, '-')}`">{{ category }}</a>
        </div>
        </div>
    </div>  
</template>

<script>
import productData from '/db/db.json';

export default {
    name: "Header",
    data() {
        return {
            productCategories: [],
            searchQuery: '',
        }
    },
    created() {
        this.loadProducts();
    },
    methods: {
        loadProducts() {
            this.productCategories = productData;
        },
        goToCart() {
            this.$router.push({ path: '/carrinho' });
        },
        goToHomePage() {
            this.$router.push({ path: '/' });
        },
        performSearch() {
            // Redirect to the search results page with the search query
            if (this.searchQuery.trim() !== '') {
                const query = this.searchQuery;
                this.searchQuery = '';
                this.$router.push({ path: '/buscar', query: { q: query } });
            }
        }
    }
}
</script>


<style scoped>
/* Customize the main container */
#container {
    background-color: #264B37;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 8px 8px;
}

/* Customize logo_button and logo image size */
#logo_button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: #264B37;
    font-size: 1.1em;
    font-weight: bold;
}

#logo_button img {
    width: 16em;
}

#logo_button:hover {
  opacity: 0.8;
}

/* Customize the arrangement of header elements */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    gap: 9em;
    margin-bottom: -3.2em;
}

/* Customize search bar */
.search_bar {
    background-color: #ffffff;
    padding: 0.8em 2em 0.8em 2em;
    border-radius: 3em;
    display: flex;
    align-items: center;
    gap: 1.5em;
}

/* Customize magnifier image */
#magnifier {
    width: 1.5em;
}

/* Customize input text */
input {
    border: none;
    font-size: 1.1em;
    font-weight: 600;
    opacity: 0.7;
    outline: none;
}


/* Customize search button "Buscar" */
.search_button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: #264B37;
    font-size: 1.1em;
    font-weight: bold;
}

.search_button:hover {
    opacity: 0.8;
}

/* Customize button to be done within the image limits */
.cart_button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
}

.cart_button:hover {
  opacity: 0.8;
}

/* Customize cart_button_image width */
#cart_button_image {
    width: 13em;
}

/* Customize categories */
.categories {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    align-items: center;
}

.category {
    display: flex;
    padding: 1em 3em 1em 3em;
    font-size: 1.6em;
}

/* Customize link */
a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    font-size: 0.7em;
}

a:hover {
    opacity: 0.8;
}

</style>