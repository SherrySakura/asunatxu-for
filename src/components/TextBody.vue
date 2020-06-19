<style lang="less" scoped>
    @import "../../css/base.less";
</style>
<template>
    <Content :style="{padding: '10px 50px'}">

        <Row :gutter="16">
            <i-col span="12">
                <Card style="min-height: 520px">
                    <Row>
                        <i-col class="normal-label" span="12">待处理的文本</i-col>
                        <i-col span="8">
                            <Select class="normal-select" v-model="type" prefix="ios-construct" placeholder="请选择处理类型">
                                <Option value="dropblank">删除多余的换行</Option>
                                <Option value="chartransC2E">中文标点转换英文标点</Option>
                                <Option value="chartransE2C">英文标点转换中文标点</Option>
                                <Option value="transE2C">英文---->中文翻译</Option>
                                <Option value="transC2E">中文---->英文翻译</Option>
                            </Select>
                        </i-col>
                        <i-col span="4">
                            <Button type="primary" @click="submit">执行处理</Button>
                        </i-col>
                    </Row>
                    <br>
                    <Row>
                        <i-col span="24">
                            <i-input v-model="ori" placeholder="请输入要处理的文本" type="textarea"
                                :autosize="{minRows: 20, maxRows: 20}" maxlength="2000" show-word-limit>

                            </i-input>


                        </i-col>
                    </Row>
                </Card>
            </i-col>
            <i-col span="12">
                <Card style="min-height: 520px">
                    <Row>
                        <i-col class="normal-label" span="16">处理结果----<span style="color: #ff9900">{{ len }}</span>字符
                        </i-col>
                        <i-col span="4">
                            <Button type="primary" id="copyed" @click="copyAll" :data-clipboard-text="res">复制结果</Button>
                        </i-col>
                        <i-col span="4">
                            <Button type="warning" @click="clearAll">清除</Button>
                        </i-col>
                    </Row>
                    <br>
                    <Row>
                        <i-col span="24">
                            <label>{{ res }}</label>


                        </i-col>
                    </Row>
                </Card>
            </i-col>
        </Row>


    </Content>
</template>
<script>
    import axios from "axios"
    import cookie from '../../js/cookie'
    import Clipboard from 'clipboard'
    import message from "../../js/message"
    export default {
        data: function () {
            return {
                type: "",
                res: "",
                ori: "",
                len: 0
            }
        },
        methods: {
            submit() {
                var _this = this
                if (this.type === "dropblank") {
                    var param = "message=" + this.ori
                    if (cookie.getCookie("id") != null) {
                        param = param + "&uuid=" + cookie.getCookie("id")
                    }
                    //var data = this.httpUtil.post("/balank", params)  
                    //console.log(data)
                    axios.post("http://www.asunapro.com:8081/api/blank", param).then(function (response) {
                        if (response.data.code != 200) {
                            console.log("失败了")
                        }
                        console.log(response.data.data.len)
                        console.log(response.data.data.result)
                        _this.len = response.data.data.len
                        _this.res = response.data.data.result
                    })
                }
                if (this.type === "transE2C" || this.type === "transC2E") {
                    if (cookie.getCookie("id") == null) {
                        this.$Message["error"]({
                            background: true,
                            content: '要使用翻译功能，请先登录'
                        })
                        this.$router.push({
                            path: "/login"
                        })
                    } else {
                        var uuid = cookie.getCookie("id")
                        var from = ""
                        var to = ""
                        switch (this.type) {
                            case "transE2C":
                                from = "EN"
                                to = "zh-CHS"
                                break
                            case "transC2E":
                                from = "zh-CHS"
                                to = "EN"
                                break
                        }
                        param = "message=" + this.ori + "&uuid=" + uuid + "&from=" + from + "&to=" + to
                        axios.post("http://www.asunapro.com:8081/api/trans", param).then(function (response) {
                            if (response.data.code != 200) {
                                console.log("失败了")
                            }
                            _this.len = _this.ori.length
                            _this.res = response.data.data.translate
                        })
                    }
                }
            },
            copyAll() {
                var clipboard = new Clipboard('#copyed') // 这里可以理解为选择器，选择上面的复制按钮
                clipboard.on('success', () => {
                    message.toast(this, "success", "复制成功")
                    clipboard.destroy()
                })
                clipboard.on('error', () => {
                    message.toast(this, "error", "本浏览器不支持复制")
                    clipboard.destroy()
                })
            },
            clearAll() {
                this.len = 0
                this.ori = ""
                this.res = ""
            },
        }
    }
</script>