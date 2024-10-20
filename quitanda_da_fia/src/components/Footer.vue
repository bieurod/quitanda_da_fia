<template>
    <footer>
        <div id="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15354.67248789388!2d-47.97755!3d-15.8214441!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a31fbaf04a2cb%3A0x90a20c40236d5cf4!2sQuitanda%20da%20Fia!5e0!3m2!1spt-BR!2sbr!4v1723405031912!5m2!1spt-BR!2sbr"></iframe>
        </div>

        <div id="container_footer">
            <div class="content_footer">
                <h2>Atendimento</h2>
                <div class="contact">
                    <a href="tel:+556135327582" target="_blank">
                        <img class="contact_icons" src="/img/telephone.png" alt="Ligue para nós: (61) 3532-7582">
                        <p>(61) 3532-7582</p>
                    </a>
                </div>
                
                <p>Guará I QI 9 - Guará, Brasília - DF</p>
                <p>CEP: 70297-400</p>
            </div>

            <div class="content_footer">
                <button id="logo_button" @click="goToHomePage">
                    <img src="/img/logo.png" alt="Logo da Quitanda da Fia">
                </button>
                <p>Quitanda Da Fia &copy; - 2024</p>
                <p>Todos os direitos reservados</p>
            </div>

            <div class="content_footer">
                <h2>Redes Sociais</h2>
                <div class="contact">
                    <a href="https://www.instagram.com/quitanda_dafia/" target="_blank">
                        <img class="contact_icons" src="/img/instagram.png" alt="Acesse nosso Instagram">
                        <p>@quitanda_dafia</p>
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            
        }
    },
    methods: {
        goToHomePage() {
            this.$router.push({ path: '/' }).then(() => {
                window.scrollTo(0, 0);
            });
        }
    }
}
</script>

<style scoped>
/* Customize the map */
iframe {
    width: 100%;
}

/* Customize the container_footer */
#container_footer {
    background-color: #264B37;
    border-radius: 8px 8px 0 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1em 4em 1em 4em;
    align-items: flex-start;
}

/* Customize the beginning of the content */
.content_footer {
    flex: 1;
}

/* Customize the text color of h2 and p */
h2 {
    color: #ffffff;
}

p {
    color: #ffffff;
}

/* Customize when there is icon and text together */
.contact {
    display: flex;
    align-items: center;
    justify-content: center; 
    gap: 1em;
}

/* Customize icon sizes */
.contact_icons {
    width: 2em;
}

/* Customize logo button to home page */
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

/* Customize logo size */
#logo_button img {
    width: 13em;
}

a:hover, #logo_button:hover {
  opacity: 0.5;
}

a {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1em;
}

</style>
