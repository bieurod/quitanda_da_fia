<template>
    <div id="modal-container" @click.self="closeModal">
        <div id="modal">
            <button @click="closeModal" id="close_button">X</button>
            <div id="modal-content">
                <h1>Obrigada pela compra!</h1>
                <p id="text">
                    Para concluir seu pedido, por favor, 
                    clique no botão abaixo para ser direcionado ao nosso WhatsApp. 
                    Nossa equipe estará pronta para finalizar a compra e tirar 
                    qualquer dúvida que você possa ter.
                </p>
                <button @click="confirmOrder">
                    <img src="/img/whatsapp_white.png" alt="Botão para enviar para WhatsApp">
                    <p>Enviar para WhatsApp</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderModal",
    methods: {
        closeModal() {
            this.$emit('close');
        },
        confirmOrder() {
            this.$emit('submit');
        }
    }
}
</script>

<style scoped>
#modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

#modal {
    position: relative; /* Permite que o botão de fechar seja posicionado absolutamente dentro deste contêiner */
    width: 80%;
    max-width: 500px;
}

#close_button {
    position: absolute;
    top: 0px;
    right: 0px;
    background: none;
    border: none;
    color: #264B37;
    font-size: 1.5em;
    width: 30px;
    height: 30px; 
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center; 
    z-index: 10;
}

#close_button:hover {
    opacity: 0.8;
}

#modal-content {
    background: #ffffff;
    padding: 2em;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#modal-content h1 {
    color: #264B37;
}

#modal-content p {
    font-size: 1.2rem;
    font-weight: 700;
}

#modal-content button {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    background-color: #264B37;
    border: 1px solid #264B37;
    border-radius: 8px;
    cursor: pointer;
    align-items: center;
    gap: 1em;
    color: #ffffff;
    width: 100%;
}

#modal-content:hover button {
    opacity: 0.9;
}

#modal-content img {
    width: 2rem;
}

#text {
    color: #333;
}
</style>
