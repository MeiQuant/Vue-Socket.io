import Observer from './Observer'
import Emitter from './Emitter'

export default {

    install(Vue){

        Vue.prototype.$socket = function (uri, opts) {
            const observer = new Observer(uri, opts)
            return observer.Socket
        }

        Vue.prototype.$socketPool = new Map()


        Vue.mixin({
            beforeCreate(){
                let _this = this;
                let sockets = this.$options['sockets']
                let uri = this.$options['uri']
                let opts = this.$options['socketsOpts']
                let socket

                if (!this.$socketPool.has(uri)) {
                    socket = this.$socket(uri, opts)
                    this.$socketPool.set(uri, socket)
                } else {
                    socket = this.$socketPool.get(uri)
                }

                if(sockets){
                    Object.keys(sockets).forEach(function(key) {
                        Emitter.addListener(key, sockets[key], _this)
                    });
                }
            },
            beforeDestroy(){
                let _this = this;
                let sockets = this.$options['sockets']

                if(sockets){
                    Object.keys(sockets).forEach(function(key) {
                        Emitter.removeListener(key, sockets[key], _this)
                    });
                }
            }
        })

    }

}
