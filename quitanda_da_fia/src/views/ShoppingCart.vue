<template>
    <div id="container">
        <!-- Left side: responsible for showing the user the selected products -->
        <div id="ordered_products">
            <div v-if="cartItems.length === 0" id="no_product_added">
                <h2>Nenhum produto adicionado no seu carrinho!</h2>
                <div>
                    <button class="home_page" @click="goToHomePage">
                        <img src="/img/return.png" alt="Seta para voltar à tela inicial">
                        <p>Comece a escolher</p>
                    </button>
                </div>
            </div>

            <div v-for="(item, index) in cartItems" :key="index" class="product_added">
                <img id="product_image" :src="item.photo" :alt="'Imagem do produto ' + item.name">
                <div id="product_information">
                    <p class="text_green">{{ item.name }}</p>
                    <p class="text_gray">{{ item.quantity }} {{ item.unit }}</p>
                    <p class="text_green">R${{ item.price }}</p>
                </div>

                <div id="amount">
                    <button @click="updateQuantity(item, -1)">
                        <img src="/img/subtraction.png" alt="Reduzir quantidade">
                    </button>
                    <p>{{ item.quantity }}</p>
                    <button @click="updateQuantity(item, 1)">
                        <img src="/img/sum.png" alt="Aumentar quantidade">
                    </button>
                </div>
            </div>
        </div>

        <!-- Right side: responsible for showing the form and confirming the order -->
        <div id="order_information">
            <form action="">
                <label class="main_label" for="name">Nome</label>
                <input type="text" id="name" placeholder="Digite seu nome" v-model="name" required>

                <label class="main_label" for="tel_number">Telefone de contato</label>
                <input type="tel" id="tel_number" placeholder="(99)99999-9999" v-model="tel_number" required>

                <h3>Tipo de pagamento</h3>
                <div id="payment">
                    <div class="payment_info">
                    <input type="radio" name="payment" id="payment_card" value="card" v-model="payment">
                    <label for="payment_card">Pagamento com cartão</label>
                    </div>

                    <div class="payment_info">
                    <input type="radio" name="payment" id="payment_cash" value="cash" v-model="payment">
                    <label for="payment_cash">Pagamento com dinheiro</label>
                    </div>
                </div>

                <div id="delivery">
                    <h3>Informações de entrega</h3>
                    <div class="delivery_choice">
                        <input type="radio" name="delivery" id="pickup" value="pickup" v-model="delivery">
                        <label for="pickup">Retirada na loja</label>
                    </div>
        
                    <div class="delivery_choice">
                        <input type="radio" name="delivery" id="delivery" value="delivery" v-model="delivery">
                        <label for="delivery">Entrega</label>
                    </div>

                    <div v-if="delivery === 'delivery'">
                        <label for="address">Endereço da entrega</label>
                        <input type="text" name="address" id="address" v-model="address" placeholder="Digite o endereço da entrega">
                    </div>
                </div>
            </form>

            <h2>Resumo da compra</h2>
            <div class="elements_side_by_side">
                <p>Subtotal</p>
                <p>R${{ calculateTotal() }}</p>
            </div>

            <div class="elements_side_by_side">
                <p>Entrega</p>
                <p>Gratuita</p>
            </div>

            <div class="elements_side_by_side">
                <h3>Total</h3>
                <h3>R${{ calculateTotal() }}</h3>
            </div>

            <div class="elements_side_by_side">
                <button class="home_page" @click="goToHomePage">
                        Continue comprando
                </button>

                <button id="finalize_order" @click="finalizeOrder">
                    Finalizar pedido
                </button>
            </div>
        </div>
        <OrderModal v-if="showOrderModal" @close="showOrderModal = false" @submit="submitOrder"/>
    </div>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue';
export default {
    name: "ShoppingCart",
    components: {
        OrderModal
    },
    data() {
        return {
            cartItems: [],
            showOrderModal: false,
            name: '',
            tel_number: '',
            payment: '',
            address: '',
            delivery: ''
        }
    },
    created() {
        this.loadCart();
    },
    methods: {
        goToHomePage() {
            this.$router.push({ path: '/' });
        },
        loadCart() {
            this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        },
        updateQuantity(item, change) {
            // Find the index of the item in the cart
            const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
            if (index !== -1) {
                // Update the quantity
                this.cartItems[index].quantity += change;
                
                // Remove item if quantity becomes zero or less
                if (this.cartItems[index].quantity <= 0) {
                    this.cartItems.splice(index, 1);
                }
                
                // Save the updated cart to localStorage
                localStorage.setItem('cart', JSON.stringify(this.cartItems));
            }
        },
        calculateTotal() {
            return this.cartItems.reduce((total, item) => {
                return total + (parseFloat(item.price) * item.quantity);
            }, 0).toFixed(2);
        },
        finalizeOrder() {
            if (this.cartItems.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }
            if (this.name === '') {
                alert("Por favor, insira o nome.");
                return;
            }
            if (this.tel_number === '') {
                alert("Por favor, insira o número de telefone para contato.");
                return;
            }
            if (this.payment === '') {
                alert("Por favor, insira escolha a forma de pagamento.");
                return;
            }
            if (this.delivery === '') {
                alert("Por favor, insira escolha a informações de entrega.");
                return;
            }
            if (this.delivery === 'delivery' && this.address === '') {
                alert("Por favor, insira o endereço de entrega.");
                return;
            }
            this.showOrderModal = true;
        },
        submitOrder() {
            const orderDetails = this.generateOrderDetails();
            this.sendToWhatsApp(orderDetails);
        },
        generateOrderDetails() {
            const paymentText = this.payment === 'card' ? 'cartão' : 'dinheiro';
            const deliveryText = this.delivery === 'delivery' ? 'entrega' : 'retirada na loja';
            const phoneText = `${this.tel_number}`;
            const nameText = `${this.name}`;
            const addressText = this.delivery != 'delivery' ? 'https://maps.app.goo.gl/VHF5NrVGuwFd1yfL7' : `${this.address}`;;

            let cartDetails = this.cartItems.map(item => {
                return `${item.quantity}x ${item.name} (${item.unit}) - R$${item.price * item.quantity}`;
            }).join('\n');

            return `
Venho de https://main--quitandadafia.netlify.app/

📦 *Tipo de serviço:* ${deliveryText}
📍 *Endereco:* ${addressText}

✨ *Nome:* ${nameText}
📱 *Telefone:* ${phoneText}

📋 *Pedido:*
${cartDetails}

🧾 *Custos*
🛍️ *Total dos produtos:* R$${this.calculateTotal()}
🚚 *Valor da entrega:* GRÁTIS
💸 *Total a pagar:* R$${this.calculateTotal()}
💰 *Tipo de pagamento:* ${paymentText}

🕒 Após enviar o pedido, aguarde que já iremos lhe atender.
            `;
        },
        sendToWhatsApp(orderDetails) {
            const encodedMessage = encodeURIComponent(orderDetails);
            const phoneNumber = "+5561999038103"; // Change numbeer to Quitanda da Fia
            const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
            window.location.href = whatsappUrl;
        },
    },
}
</script>

<style scoped>
#container {
    background-color: #264B37;
    border-radius: 8px;
    margin: 1em 0 1em 0;
    display: flex;
    justify-content: space-between;

}

#ordered_products {
    padding: 1em;
    border-radius: 8px;
    width: 100%;
}

#no_product_added {
    background-color: #ffffff;
    flex-direction: column;
    display: flex;
    align-items: center;
    gap: 2em;
    padding: 1em 1em 2.3em 1em;
    border-radius: 8px;
}

.home_page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2em;
    height: 4em;
}

.home_page img {
    width: 2em;
}

.product_added {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 8px;
    margin-bottom: 1em;
    padding: 1em;
}

#product_information p {
    margin: 0.2em 0;
    font-size: 1em;
    line-height: 1.2; 
    text-align: left;
    padding-left: 1em;
}

#product_information {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.text_gray {
    color: rgba(0, 0, 0, 0.50);
    font-weight: 600;
}

.text_green {
    font-weight: bold;
    color: #264B37;
}

#amount img {
    width: 2em;
    height: 2em;
}

#amount {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
}

#amount button {
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.15);
}

#product_information {
    flex-direction: column;
    display: flex;
    align-content: left;
}

#product_image {
    width: 6em;
    height: 6em;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
    text-align: center;
}

#order_information {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 2em;
    margin: 1em;
    width: 35%;
}

form {
    display: flex;
    flex-direction: column;
    font-size: 1.3em;
    font-weight: bold;
    text-align: left;
}

label {
    font-size: 1em;
    color: rgba(0, 0, 0, 0.50);
    font-weight: 400;
}

.payment_info, .delivery_choice {
    display: flex;
    margin: 0.3em 0 0.3em 0;
}

input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    width: 1.3em;
    height: 1.3em;
    border: 2px solid #e08516;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    background-color: transparent;
    margin-right: 0.4em;
}

/* Style for when button is selected */
input[type="radio"]:checked {
    border: 2px solid #e08516;
}

/* Adds orange inner circle when selected */
input[type="radio"]:checked::before {
    content: "";
    position: absolute;
    top: 15%;
    left: 15%;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    background-color: #e08516;
}

/* Change the color of labels when selected */
input[type="radio"]:checked + label {
    color: #264B37; 
    font-weight: bold; 
}

input[type="text"], input[type="tel"]{
    margin: 1em 0 1em 0;
}

#address {
    width: 100%;
    height: 5em;
    text-align: left; 
    padding-left: 0.3em;
    padding-top: 0.3em;
    font-size: 0.8em;
    margin: 0.6em 0 0.6em 0;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.30);
}

#address::placeholder {
    font-size: 1em; 
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(0.3em, 0.3em);
    padding: 0.3em 0 0 0.3em;
}

#tel_number, #name {
    width: 100%;
    height: 2em;
    font-size: 0.8em;
    padding-left: 0.3em;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.30);
}

#tel_number::placeholder{
    padding: 0.3em 0 0 0.3em;
}

.elements_side_by_side {
    display: flex;
    justify-content: space-between;
    gap: 1em;
}

h2, h3, .main_label {
    text-align: left;
    color: #264B37;
}

.main_label {
    font-size: 1.5rem;
    font-weight: bold;
}

p {
    font-size: 1.1em;
}

#keep_shopping, #finalize_order, .home_page {
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    padding: 1em;
    border-radius: 8px;
    font-size: 1em;
}

#keep_shopping, .home_page {
    background-color: #2A6A48;
    border: 1px solid #2A6A48;
}

#finalize_order {
    background-color: #264B37;
    border: 1px solid #264B37;
}

#keep_shopping:hover, .home_page:hover, #finalize_order:hover {
  opacity: 0.8;
}
</style>
