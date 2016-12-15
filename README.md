# Vue-Socket.io-MeiQuant
socket.io implemantation for Vuejs 2.0 based on Vue-Socoket.io

## Install

  add this line to your package.josn's dependencies
  ``` bash
  "vue-socket.io-meiquant": "github:MeiQuant/Vue-Socket.io"
  ```

  ``` bash
  npm install vue-socket.io-meiquant
  ```

## Usage

``` js
import Vue from 'vue';
import Socket from 'vue-socket.io-meiquant';

Vue.use(Socket); // Automaticly socket connect from url string


var vm = new Vue({
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    customEmit: function(val){
      console.log('this method fired by socket server. eg: io.emit("customEmit", data)')
    }
  },

  created () {

    this.socket = this.$socekt('http://example.com:5000/namespace')

  },

  methods: {
    clickButton: function(val){
        // $socket is socket.io-client instance
        this.socket.emit('emit_method', val);
    }
  }
})
```



## License
[WTFPL](http://www.wtfpl.net/)
