<style lang="less" scoped>
    .body {
        min-height: 520px;
        max-width: 800px;
        margin: auto;
        width: 50%;
    }

    .center-label {
        text-align: center;
    }

    .right-label {
        text-align: right;
        padding-top: 5px;
    }

    @import "../../css/base.less";
</style>
<template>
    <Content :style="{padding: '10px 50px'}">
        <Card class="body">
            <Row>
                <i-col span="24" class="center-label">
                    <label class="normal-label">欢迎使用AsunaTxu</label>
                </i-col>
            </Row>
            <br>
            <Row :gutter="16">
                <i-col span="8" class="right-label">
                    <label>账号</label>
                </i-col>
                <i-col span="10">
                    <i-input v-model="account" autofocus></i-input>
                </i-col>
            </Row>
            <br>
            <Row :gutter="16">
                <i-col span="8" class="right-label">
                    <label>密码</label>
                </i-col>
                <i-col span="10">
                    <i-input v-model="password" type="password" password></i-input>
                </i-col>
            </Row>
            <br>
            <Row :gutter="16">
                <i-col span="12" class="right-label">
                    <Checkbox v-model="remenberMe">
                        保持登录
                    </Checkbox>
                </i-col>
            </Row>
            <br>
            <Row :gutter="16">
                <i-col span="16" class="right-label">
                    <Button type="primary" @click="doLogin" style="width: 200px">登录</Button>
                </i-col>
            </Row>
        </Card>
    </Content>
</template>
<script>
    import axios from "axios";
    import cookie from "../../js/cookie"
    //import cipher from "../../js/cipher"
    export default {
        data: function () {
            return {
                account: "",
                password: "",
                remenberMe: false,
                publicKey: "",
            }
        },
        methods: {
            doLogin() {
                //const pk = cipher.getPublicKey()
                //var passwordEncrypted = decodeURIComponent(cipher.encrypt(this.password, pk))
                //console.log(passwordEncrypted)
                const param = "name=" + this.account + "&password=" + this.password + "&remember=" + this.remenberMe
                axios.post("http://www.asunapro.com:8081/api/login", param).then(response => {
                    console.log(response)
                    if (this.remenberMe == true) {
                        cookie.setCookie("account", response.data.data.account, 1)
                        cookie.setCookie("id", response.data.data.id, 1)
                    }else {
                        cookie.setCookie("account", response.data.data.account, 1, "hour")
                        cookie.setCookie("id", response.data.data.id, 1, "hour")
                    }
                    this.$router.push({
                        path: "/"
                    })
                })
            },


        },
    }
</script>