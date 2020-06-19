export default {
    passwordValidate: function (ol, ne){
        if (ol === ne){
            return true;
        }else{
            return false
        }
    },

    mailvalidate: function (mail){
        var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/
        if (filter.test(mail)) {
            return true; 
        } else {
            return false;
        }
    }
}