import Vue from "vue"
import Toasted from "vue-toasted"

Vue.use(Toasted, {
    iconPack: "fontawesome",
    duration: 5000
})
Vue.toasted.register(
    "change",
    "Alterações com sucesso",
    { type: "success", icon: "check" }
)

Vue.toasted.register(
    "delete",
    "Removido com sucesso",
    { type: "success", icon: "check" }
)

Vue.toasted.register(
    "novo",
    "Adicionado com sucesso",
    { type: "success", icon: "check" }
)

export var messages = {
    MensagemChanges(){
        return Vue.toasted.global.change()
    },
    MensagemDelete(){
        return Vue.toasted.global.delete()
    },
    MensagemNovo(){
        return Vue.toasted.global.novo()
    }
};