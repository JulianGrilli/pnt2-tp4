Vue.component('encabezado', {
    data() {
        return {}
    },
    props: ['colorPrincial', 'isPrincipalBackground'],
    methods: {},
    computed:{
        getBackGroundFromPrincipal(){
            let value = this.isPrincipalBackground.isPresent ? this.colorPrincial.rgb : 'steelblue';
            return value;
        }
    },
    template: `
            <div id="header"  :style="{'background-color': getBackGroundFromPrincipal}">
                <h1> 
                    The Great 
                    <br>
                    <span>Color {{colorPrincial.rgb}}</span>
                    <br>
                    Guessing Game
                </h1>
            </div>
       `
})


Vue.component('nav-botonera', {
    data() {
        return {
            isHard: true,
            cantidadDeColores: 6
        }
    },
    props: ['colorPrincial', 'colors', 'mensaje', 'isPrincipalBackground'],
    created(){
        this.restart()
    },
    methods: {
        clickEasyButton() {
            if (this.isHard) {
                this.isHard = false;
                this.hardButton = false;
                this.cantidadDeColores = 3;
                this.restart();
            }
        },
        clickHardButton() {
            if (!this.isHard) {
                this.isHard = true;
                this.cantidadDeColores = 6;
                this.restart();
            }
        },
        clickResetButton() {
            this.restart();
        },
        createNewColors(numbers){
            var arr = [];
            for (var i = 0; i < numbers; i++) {
                arr.push(this.createRandomStringColor());
            }
            return arr;
        },
        
        createRandomStringColor(){
            var newColor = "rgb(" + this.randomInt() + ", " + this.randomInt() + ", " + this.randomInt() + ")" ;
            return { 
                    rgb: newColor,
                    display: 'block' 
                   };
        },
        randomInt(){
            return Math.floor(Math.random() * 256);
        },
        restart() {
            this.colors.splice(0, this.colors.length, ...this.createNewColors(this.cantidadDeColores));
            let randomPickedColor = this.colors[this.pickColor()]
            this.colorPrincial.rgb = randomPickedColor.rgb;
            this.isPrincipalBackground.isPresent = false;
            this.mensaje.val='Juego de colores'
            
        },
        pickColor(){
            var quantity;
            if (this.isHard) {
                quantity = 6;
            } else {
                quantity = 3;
            }
            return Math.floor(Math.random() * quantity );
        },
    },
    template: ` 
            <div id="navigator">
                <button id="reset" @click="clickResetButton"> New colors</button>
                <span id="message"> {{mensaje.val}} </span>

                <button id="easy" :class="{ selected: !isHard }" @click="clickEasyButton">easy</button>
                <button id="hard" :class="{ selected: isHard }" @click="clickHardButton">hard</button>
            </div>
            `
})


Vue.component('square-box', {
    data() {
		return{};
    },
    props: ['color', 'index', 'colors', 'esColorEncabezado'],
    methods: {
        seleccionarColor(){
            this.esColorEncabezado(this.color, this.index);
        },
    },
    computed: {
        getRGBColorToBeDisplayed(){
            return this.color.rgb;
        },
        getDisplayType(){
            return this.color.display;
        }
    },
    template: ` <div class="square" :style="{'background-color': getRGBColorToBeDisplayed, 'display': getDisplayType}" @click="seleccionarColor"></div>   `
})


var app = new Vue({
    el: '#app',
    data: {
        mensaje: {val: 'Juego de Colores'},
        colorPrincial: {rgb: ''},
        isPrincipalBackground: {isPresent: false},
        isHard : true,
        colors : []
    },
    methods: {
        esColorEncabezado(color, index){
            if(this.colorPrincial.rgb === color.rgb){
                this.mensaje.val = 'Ganaste'
                this.isPrincipalBackground.isPresent = true;
                this.colors.map( color => {
                    color.rgb = this.colorPrincial.rgb;
                    color.display = 'block'
                    return color;
                })
            }else{
                this.mensaje.val = 'Vuelve a intentar !'
                this.colors[index].display = 'none';
            }
        },
    },
    computed: {}
})