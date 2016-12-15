import Observer from './Observer'
import Emitter from './Emitter'

export default {

    install(Vue){

        Vue.prototype.$socket = function (uri, opts) {
            const observer = new Observer(uri, opts)
            return observer.Socket
        }

        Vue.mixin({
            beforeCreate(){
                let _this = this;
                let sockets = this.$options['sockets']
                let uri = this.$options['uri']
                let opts = this.$options['socketsOpts']
                let socket

                if (!this.$socket.Pool.has(uri)) {
                    socket = this.$socket.Socket(uri, opts)
                    this.$socket.Pool.set(uri, socket)
                } else {
                    socket = this.$socket.Pool.get(uri)
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
