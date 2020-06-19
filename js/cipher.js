import JSEncrypt from 'jsencrypt'
import cookie from "./cookie"
import axios from "axios"

export default {
    encrypt: function (text, publickey){
        const encryptor = new JSEncrypt()
        var pk = decodeURIComponent(publickey)
        encryptor.setPublicKey(pk)
        return encryptor.encrypt(text)
    },

    getPublicKey: function (){
        if (cookie.getCookie("publickey") == null) {
            axios.get("http://localhost:8081/key").then(response => {
                if (response.data.code == 200) {
                    var publicKey = response.data.data
                    var pk = publicKey = decodeURIComponent(publicKey)
                    console.log(pk)
                    cookie.setCookie("publickey", pk, 14)
                } else {
                    console.log(response.data.msg)
                }
            })
        }
        return cookie.getCookie("publickey")
    }
}