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
                    <RadioGroup v-model="gender">
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
                    <Button type="primary" @click="doLogin" style="width: 200px">注册</Button>
                </i-col>
            </Row>
        </Card>
    </Content>

</template>
<script>
    import axios from "axios";
    export default {
        data: function () {
            return {
                account: "",
                password: "",
                remenberMe: false,
                password2: ""
            }
        },
        methods: {
            doLogin() {
                var param = "name=" + this.account + "&password=" + this.password + "&remember=" + this.remenberMe
                axios.post("http://localhost:8081/login", param).then(response => {
                    console.log(response.data)
                })
            }
        }
    }
</script>