<style scoped>
    html div {
        margin: 0;
        padding: 0;

    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 120px;
        height: 40px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 10px;
        left: 20px;
    }

    .layout-nav {
        width: 500px;
        margin: 0 auto;
        margin-right: 5px;
    }

    .layout-nav-login {
        width: 680px;
        margin: 0 auto;
        margin-right: 5px;
    }

    .layout-footer-center {
        text-align: center;
    }

    .normal-select {
        width: 200px;
    }

    .nomal-label {
        color: #2b85e4;
        font-size: 20px;
    }
</style>

<template>
    <Header>
        <Menu mode="horizontal" theme="dark">
            <MenuItem name="0" to="/">
            <img class="layout-logo" src="../assets/logo-txu.png">
            </MenuItem>

            <div v-if="unlogined" class="layout-nav">
                <MenuItem name="1" to="/login">
                <Icon type="md-log-in"></Icon>
                登录
                </MenuItem>
                <MenuItem name="2" to="/register">
                <Icon type="md-link"></Icon>
                注册
                </MenuItem>
                <MenuItem name="3" @click.native="undo">
                <Icon type="ios-leaf"></Icon>
                关于AsunaTxu
                </MenuItem>
                <MenuItem name="4" @click.native="undo">
                <Icon type="ios-paper"></Icon>
                改进建议
                </MenuItem>
            </div>
            <div v-else class="layout-nav-login">
                <MenuItem name="1" @click.native="undo">
                <Icon type="ios-contact"></Icon>
                我的账号
                </MenuItem>
                <MenuItem name="2" @click.native="undo">
                <Icon type="ios-text"></Icon>
                未读消息
                </MenuItem>
                <MenuItem name="3" @click.native="undo">
                <Icon type="ios-leaf"></Icon>
                关于AsunaTxu
                </MenuItem>
                <MenuItem name="4" @click.native="undo">
                <Icon type="ios-paper"></Icon>
                改进建议
                </MenuItem>
                <MenuItem name="5" @click.native="logout1">
                <Icon type="md-power"></Icon>
                退出登录
                </MenuItem>
            </div>
        </Menu>
    </Header>
</template>

<script>
    import cookie from "../../js/cookie"
import message from '../../js/message'
    export default {
        data: function () {
            return {
                unlogined: true
            }
        },

        methods: {
            logout1() {
                cookie.deleteCookie("account")
                cookie.deleteCookie("id")
                cookie.deleteCookie("publickey")

                localStorage.removeItem("account")
                this.unlogined = true
            },
            undo() {
                message.notice(this, "info", "", true, "该模块尚在开发，请谅解")
            }
        },

        watch: {
            $route() {
                if (cookie.isLogin() == false) {
                    this.unlogined = true
                } else {
                    this.unlogined = false
                }
            }
        },

        created() {
            if (cookie.isLogin() == false) {
                this.unlogined = true
            } else {
                this.unlogined = false
            }
        }
    }
</script>