<template>
    <div id="banner">
        <div id="text_content">
            <h3>Quitanda da Fia</h3>
            <p>A Quitanda da Fia, nossa unidade no bairro no Guará, 
                em Brasília, está em pleno funcionamento para receber a todos. 
                Além da qualidade e frescor que você já conhece, temos uma ampla variedade de frutas, 
                verduras e legumes frescos. Venha nos visitar e aproveite a experiência de uma quitanda completa 
                e cheia de qualidade!
            </p>
        </div>
        
        <div>
            <img src="/img/logo.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "Banner",
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#banner {
    background-color: #264B37;
    border-radius: 8px;
    height: 300px;
    display: flex;
    padding: 1em 3em 1em 3em;
    margin-top: 1em;
    justify-content: space-between;
    align-content: center;
    gap: 10em;
}

p, h3 {
    color: #ffffff;
    padding-bottom: 2em;
}

img {
    padding: 2em;
}

</style>
