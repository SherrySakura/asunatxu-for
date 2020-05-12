import axios from "axios"

var request = {
    data: {},
    baseUrl: "http://localhost:8081",
    get: function(url, param) {
        axios.get(this.baseUrl + url + "?" + param).then(function(response){
            if (response.code != 200){
                this.data = {}
            }
            this.data = response.data
        })
        return this.data
    },

    post: function(url, param){
        axios.post(this.baseUrl + url, param).then(function(response){
            if (response.code != 200){
                this.data = {}
            }
            this.data = response.data
        })
        return this.data
    }
}

export default {
    request
}