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
                            <Button type="primary" @click="copyAll">复制结果</Button>
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
                    console.log(param)
                    //var data = this.httpUtil.post("/balank", params)  
                    //console.log(data)
                    axios.post("http://localhost:8081/blank", param).then(function (response) {
                        if (response.data.code != 200) {
                            console.log("失败了")
                        }
                        console.log(response.data.data.len)
                        console.log(response.data.data.result)
                        _this.len = response.data.data.len
                        _this.res = response.data.data.result
                    })
                }
            },
            copyAll() {

            },
            clearAll() {
                this.len = 0
                this.ori = ""
                this.res = ""
            }
        }
    }
</script>