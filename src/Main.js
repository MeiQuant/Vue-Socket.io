import Observer from './Observer'
import Emitter from './Emitter'

export default {

    install(Vue, connection){

        if(!connection) throw new Error("[Vue-Socket.io] cannot locate connection")

        let observer = new Observer(connection)

        Vue.prototype.$socket = observer.Socket;

        Vue.mixin({
            beforeCreate(){
                let _this = this;
                let sockets = this.$options['sockets']
                let uri = this.$options['uri']
                let nsp = this.$options['socketsNsp']
                let opts = this.$options['socketsOpts']

                if (uri || nsp) {
                  _this.$socket = new Observer(uri, nsp, opts)
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
