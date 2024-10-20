<template>
  <div>
    <div v-if="searchResults.length === 0" id="no_product_found">
        <h2>Nenhum produto encontrado para a pesquisa "{{ searchTerm ? searchTerm : "" }}"</h2>
        <div>
            <button class="home_page" @click="goToHomePage">
                <img src="/img/return.png" alt="Seta para voltar à tela inicial">
                <p>Volte para página inicial</p>
            </button>
        </div>
    </div>

    <div id="product_found" v-else>
      <h2>Resultados da Pesquisa:</h2>
      <div id="order_products">
        <div id="product_card" v-for="(product, index) in searchResults" :key="index" class="product">
          <img :src="product.photo" :alt="product.name" @click="openModal(product)" />  <!-- Adicionado o @click -->

          <div id="product_information">
              <p id="produc">{{ product.name }} - {{ product.unit }}</p>
              <p>R${{ product.price }}</p>
          </div>

          <button id="add_to_cart" @click="addToCart(product)">
              <div id="cart_component">
                  <img src="/img/cart.png" alt="Imagem carrinho de compras"/>
                  <p>Adicionar</p>
              </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import productData from '/db/db.json';

  export default {
    name: "SearchResult",
    data() {
      return {
        searchTerm: '',
        searchResults: [],
      };
    },
    created() {
      this.searchTerm = this.$route.query.q || '';
      this.performSearch();
    },
    methods: {
      addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        this.$router.push({ name: 'carrinho' });
      },
      goToHomePage() {
        this.$router.push({ path: '/' });
      },
      performSearch() {
        this.searchResults = [];
        if (this.searchTerm.trim() !== '') {
          for (const category in productData) {
            if (Object.prototype.hasOwnProperty.call(productData, category)) {
              this.searchResults.push(...productData[category].filter(product =>
                product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
              ));
            }
          }
        }
      },
    },
    watch: {
      '$route.query.q'(newQuery) {
        this.searchTerm = newQuery || '';
        this.performSearch();
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (to.query.q !== from.query.q) {
        this.searchTerm = to.query.q || '';
        this.performSearch();
      }
      next();
    }
  };
</script>

<style scoped>
#no_product_found {
  background-color: #264B37;
  border-radius: 8px;
  margin: 2em 0 2em 0;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
}

#product_found h2{
  text-align: left;
  color: #264B37;
}

#product_found h2::after {
  content: "";
  display: block;
  width: 3em; 
  height: 0.3em;
  background-color: #264B37; 
  margin-top: 0.3em;
}

.home_page {
  background-color: #81bc4e;
  border: 1px solid #81bc4e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
  height: 4em;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  padding: 1em;
  border-radius: 8px;
  font-size: 1em;
}

.home_page img {
  width: 2em;
}

#product_card {
  display: flex;
  flex-direction: column;    
  align-items: center;
  justify-content: center;
  border: 1px #333;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin: 5px;
  padding: 1em;
  width: 20%;
  height: 22em;
}

#product_card img {
  width: 10em;
  height: 10em;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1em;
  display: block;
  margin: 0 auto;
  text-align: center;
}

#product_information p{
  color: #264B37;
  font-size: 1.2em;
  font-weight: bold;
  text-align: left;
}
#add_to_cart {
  background-color: #264B37;
  border: 1px solid #264B37;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8em;
  cursor: pointer;
  padding: 0.3em 1em 0.3em 1em;
}

#add_to_cart:hover {
  opacity: 0.9;
}

#cart_component {
  display: flex;
  align-items: center;
}

#cart_component img {
  width: 2em;
  height: 2em;
  border-radius: 0;
  padding: 0.2em 1.2em 0.2em 1.2em;
}

#cart_component p {
  color: #ffffff;
  font-size: 1.4em;
  font-weight: bold;
  margin: 0 1em 0 0;
}

#order_products {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-bottom: 1.5em;
}
</style>