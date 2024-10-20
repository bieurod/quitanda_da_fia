<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button @click="closeModal" class="close-button">X</button>
        <div class="modal-product-card">

          <!-- Adjust image size and style -->
          <div id="container">
            <div id="left">
              <img v-if="product && product.photo" :src="product.photo" :alt="product.name" class="modal-image"/>
            </div>

            <div id="right">
              <div id="product_name_id">
                <p class="product-name">{{ product.name }}</p>
                <p class="product-id">COD: {{ product.id }}</p>
              </div>
              
              <div id="product_price_unit">
                <p class="product-price">R${{ product.price }}</p>
                <p class="product-unit">{{ product.unit }}</p>
              </div>

              <div id="button_add_to_cart">
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
      </div>
    </div>
</template>
  
<script>
  export default {
    name: "ProductModalVue",
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      addToCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => item.id === this.product.id);
  
        if (existingProductIndex > -1) {
          // Product exists, increase quantity
          cart[existingProductIndex].quantity += 1;
        } else {
          // Product doesn't exist, add new
          this.product.quantity = 1; // Set initial quantity
          cart.push(this.product);
        }
  
        localStorage.setItem('cart', JSON.stringify(cart));
        this.$emit('close'); // Optionally close the modal after adding to cart
        this.$router.push({ path: '/carrinho' }).then(() => {
          window.scrollTo(0, 0);
        }); // Redirect to cart page
      }
    }
  }
</script>
  
<style scoped>

#container {
  display: flex;
  gap: 1em;
}

#left {
  background-color: #264B37;
  border-radius: 8px;
  justify-content: center;
  align-content: center;
  padding: 2.5em;
}

#product_name_id {
  text-align: left;
}

.product-id {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 0.8em;
}

.product-unit {
  margin-top: -2em;
  margin-bottom: 2;
  font-size: 0.8em;
  text-align: right;
  padding-right: 1.7em;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure this is higher than other elements */
}

.modal-content {
  background: #ffffff;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  position: relative;
  padding: 1em;
  z-index: 1001; /* Ensure this is higher than other elements */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.modal-product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px #333;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  padding: 1em;
}

#right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-image {
  width: 8em;
  height: 8em;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1em;
}

.product-name {
  color: #264B37;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 0;
}

.product-price {
  color: #264B37;
  font-size: 1.2em;
  font-weight: bold;
}

.add-to-cart-button {
  background-color: #81bc4e;
  color: #ffffff;
  border: none;
  padding: 0.5em 2em;
  font-size: 1.2em;
  font-weight: bolder;
  cursor: pointer;
  border-radius: 0.5em;
  margin-top: 1em;
}

.add-to-cart-button:hover {
  opacity: 0.9;
}

#add_to_cart {
  background-color: #81bc4e;
   border: 1px solid #81bc4e;
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
    width: 1.8em;
    height: 1.8em;
    border-radius: 0;
    margin-right: 1em
}

#cart_component p {
    color: #ffffff;
    font-size: 1.4em;
    font-weight: bold;
    margin: 0;
}

</style>
  