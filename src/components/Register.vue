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

    .just-right {
        text-align: right;
        padding-top: 2px;
    }

    @import "../../css/base.less";
</style>
<template>
    <Content :style="{padding: '10px 50px'}">
        <Card class="body">
            <Row>
                <i-col span="24" class="center-label">
                    <label class="normal-label">欢迎加入AsunaTxu</label>
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
                <i-col span="8" class="right-label">
                    <label>重复密码</label>
                </i-col>
                <i-col span="10">
                    <i-input v-model="password2" type="password" password></i-input>
                </i-col>
            </Row>
            <br>
            <Row :gutter="16">
                <i-col span="8" class="right-label">
                    <label>邮箱</label>
                </i-col>
                <i-col span="10">
                    <i-input v-model="mail"></i-input>
                </i-col>
            </Row>
            <br>
            <Row :gutter="16">
                <i-col span="8" class="just-right">
                    <label>选择性别</label>
                </i-col>
                <i-col span="10">
                    <RadioGroup v-model="genderText">
                        <Radio label="man">
                            <Icon type="ios-man"></Icon>
                            <span>绅士</span>
                        </Radio>
                        <Radio label="woman">
                            <Icon type="ios-woman"></Icon>
                            <span>女士</span>
                        </Radio>
                    </RadioGroup>
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
                    <Button type="primary" @click="doRegiste" style="width: 200px">注册</Button>
                </i-col>
            </Row>
        </Card>
    </Content>

</template>
<script>
    import axios from "axios";
    //import cipher from "../../js/cipher"
    import validate from "../../js/validate"
    import message from "../../js/message"
import cookie from '../../js/cookie';
    export default {
        data: function () {
            return {
                account: "",
                password: "",
                remenberMe: false,
                password2: "",
                genderText: "",
                mail: "",
                gender: true
            }
        },
        methods: {
            doRegiste() {
                //const pk = cipher.getPublicKey()
                if (this.genderText === "man"){
                    this.gender = true
                }else{
                    this.gender = false
                }
                if (!validate.passwordValidate(this.password, this.password2)){
                    message.toast(this, "error", "前后两次密码不一致")
                    return
                }
                if (!validate.mailvalidate(this.mail)){
                    message.toast(this, "error", "请输入正确的邮箱")
                    return
                }
                //var passwordEncryted = cipher.encrypt(this.password, pk)
                //passwordEncryted = decodeURIComponent(passwordEncryted)
                const param = "account=" + this.account + "&password=" + this.password + "&gender=" + this.gender + "&mail=" + this.mail
                axios.post("http://www.asunapro.com:8081/api/register", param).then(response => {
                    message.toast(this, "success", "注册成功，正在跳转")
                    if (cookie.getCookie("account") != null){
                        cookie.deleteCookie("account")
                        cookie.deleteCookie("id")
                    }
                    if (this.remenberMe == true){
                        cookie.setCookie("account", response.data.data.account, 1)
                        cookie.setCookie("id", response.data.data.id, 1)
                    }else{
                        cookie.setCookie("account", response.data.data.account, 1, "hour")
                        cookie.setCookie("id", response.data.data.id, 1, "hour")
                    }
                    localStorage.setItem("account", JSON.stringify(response.data.data))
                    this.$router.push({path: "/"})
                })
            }
        }
    }
</script>