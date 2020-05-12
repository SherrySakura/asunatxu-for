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
    <!-- <div class="layout">
        <Layout> -->
            <!-- <Header>
                <Menu mode="horizontal" theme="dark">
                    <router-link to="/">
                        <img class="layout-logo" src="../assets/logo-txu.png" >
                    </router-link>
                    <div class="layout-nav">
                        <MenuItem name="1" active-name="1">
                        <Icon type="md-log-in"></Icon>
                        登录
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon type="md-link"></Icon>
                        注册
                        </MenuItem>
                        <MenuItem name="3">
                        <Icon type="ios-leaf"></Icon>
                        关于AsunaTxu
                        </MenuItem>
                        <MenuItem name="4">
                        <Icon type="ios-paper"></Icon>
                        改进建议
                        </MenuItem>
                    </div>
                </Menu>
            </Header> -->
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
                            <label >账号</label>
                        </i-col>
                        <i-col span="10">
                            <i-input v-model="account" autofocus></i-input>
                        </i-col>
                    </Row>
                    <br>
                    <Row :gutter="16">
                        <i-col span="8" class="right-label">
                            <label >密码</label>
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
            <!-- <Footer class="layout-footer-center">© 2019-2021 <a href="www.asunapro.com">asunapro.com</a> 版权所有 ICP证 <a
                    href="http://www.miitbeian.gov.cn">赣ICP备19002019号</a></Footer> -->
        <!-- </Layout>
    </div> -->
</template>
<script>
import axios from "axios";
export default {
    data: function() {
        return {
            account: "",
            password: "",
            remenberMe: false
        }
    },
    methods: {
        doLogin() {
            var param = "name=" + this.account + "&password=" + this.password + "&remember=" + this.remenberMe
            axios.post("http://localhost:8081/login", param).then( response => {
                console.log(response.data)
            })
        }
    }
}
</script>