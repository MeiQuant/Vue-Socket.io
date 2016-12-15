import Observer from './Observer'
import Emitter from './Emitter'

export default {

    install(Vue){

        let _pool = new Map()

        Vue.prototype.$socket = function (uri, opts) {

            let socket

            if (!_pool.has(uri)) {
                socket = (new Observer(uri, opts)).Socket
                _pool.set(uri, socket)
            } else {
                socket = _pool.get(uri)
            }

            return socket
        }


        Vue.mixin({
            beforeCreate () {
                let _this = this;
                let sockets = this.$options['sockets']

                if(sockets){
                    Object.keys(sockets).forEach(function(key) {
                        Emitter.addListener(key, sockets[key], _this)
                    });
                }
            },
            beforeDestroy () {
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
