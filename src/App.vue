<template>
    <div style="text-align: center">
        <h2>星铁抽卡分析</h2>
    </div>
    <el-row :gutter="20" style="padding: 0 15px 0 15px;">

        <el-col :span="24">
            <el-card>
                <el-text>
                    请输入抽卡链接：
                </el-text>
                <el-text>
                    获取方法
                </el-text>
                <el-input v-model="inputUrl" label="请输入抽卡链接" style="padding-top: 10px"></el-input>
                <el-button style="margin-top: 10px;margin-bottom:20px;float: right" @click="Init">查询</el-button>
            </el-card>
        </el-col>
        <el-col :span="24">
            <el-card body-style="padding:0">
                <el-tabs
                    v-model="activeName"
                    class="demo-tabs"
                    type="border-card"
                >
                    <div v-for="item in analysisList">
                        <el-tab-pane v-bind:label="item.label" v-bind:name="item.label">
                            <div class="statistic-card">
                                <el-text size="large" style="font-weight: bolder">
                                    {{ item.label }}
                                </el-text>
                                <el-row style="padding-top: 10px" :gutter="10">
                                    <el-col :span="4">
                                        <el-statistic :value="item.total" style="padding: 10px">
                                            <template #title>
                                                <div style="display: inline-flex; align-items: center">
                                                    抽卡总数
                                                </div>
                                            </template>
                                        </el-statistic>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-statistic :value="item.five" style="padding: 10px;"
                                                      value-style="color: #DC7B00">
                                            <template #title>
                                                <div class="five_star" style="display: inline-flex; align-items: center">
                                                    五星数
                                                </div>
                                            </template>
                                        </el-statistic>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-statistic :value="item.four" style="padding: 10px;"
                                                      value-style="color: #A256E0">
                                            <template #title>
                                                <div class="four_star" style="display: inline-flex; align-items: center">
                                                    四星数
                                                </div>
                                            </template>
                                        </el-statistic>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-statistic :value="item.pull"
                                                      style="padding: 10px">
                                            <template #title>
                                                <div style="display: inline-flex; align-items: center">
                                                    已垫抽数
                                                </div>
                                            </template>
                                        </el-statistic>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-statistic :value="(item.total-item.pull)/item.five >0 ? (item.total-item.pull)/item.five : '未知' "
                                                      style="padding: 10px">
                                            <template #title>
                                                <div style="display: inline-flex; align-items: center">
                                                    平均出金
                                                </div>
                                            </template>
                                        </el-statistic>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                    </div>
                </el-tabs>
            </el-card>
        </el-col>
        <el-col :span="24">
            <el-card body-style="padding:0;text-align: center">
                <el-table v-loading="loading"
                          :data="warpList"
                          :row-class-name="tableRowClassName"
                          height="100%"
                >
                    <el-table-column label="名称">
                        <template #default="scope">
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="星级" min-width="95px" prop="rank_type" sortable>
                        <template #default="scope">
                            <div v-if="scope.row.rank_type=='5'">
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                            </div>
                            <div v-if="scope.row.rank_type=='4'">
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                            </div>
                            <div v-if="scope.row.rank_type=='3'">
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                                <el-icon>
                                    <StarFilled/>
                                </el-icon>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型">
                        <template #default="scope">
                            <el-tag
                                    :type="scope.row.item_type === '角色' ? '' : 'success'"
                                    disable-transitions
                            >{{ scope.row.item_type }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <!--        <el-table-column label="id" prop="id"/>-->
                    <el-table-column label="卡池">
                        <template #default="scope">
                            <div v-if="scope.row.gacha_type=='1'" type="info">
                                <el-tag disable-transitions>常驻池</el-tag>
                            </div>
                            <div v-if="scope.row.gacha_type=='2'" type="info">
                                <el-tag disable-transitions>新手池</el-tag>
                            </div>
                            <div v-if="scope.row.gacha_type=='11'">
                                <el-tag disable-transition>up角色池</el-tag>
                            </div>
                            <div v-if="scope.row.gacha_type=='12'">
                                <el-tag disable-transitions type="success">up武器池</el-tag>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="时间" prop="time" sortable/>
                </el-table>
                <div style="padding: 10px">
                    <el-switch
                            v-model="isDark"
                            :active-icon="Moon"
                            :inactive-icon="iconSun"
                            inline-prompt
                            style="padding: 0;float: right;--el-switch-border-color:#dcdfe6;--el-switch-on-color:#1d1e1f;--el-switch-off-color:#f2f2f2"
                    />
                    <el-text size="small" type="info" v-text="'共'+warpList.length+'条数据'"/>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="dialogTableVisible" title="提示">
        <span v-text="dialogText"></span>
    </el-dialog>
</template>

<script lang="ts" setup>
import {Moon, StarFilled} from '@element-plus/icons-vue';
import {useDark, useToggle} from '@vueuse/core'
import iconSun from "./components/icon/IconSun.vue";

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<script lang="ts">
import axios from "axios";

export default {
    name: "App",
    mounted() {
        // this.Init();
        // this.gachaList = this.tableData;
    },
    methods: {
        analysisData(list) {
            let threeStar = 0, fourStar = 0, fiveStar = 0, total = 0,pull=0;

            list.reverse().forEach((item) => {
                total++;
                switch (item.rank_type) {
                    case "3":
                        pull++;
                        threeStar++;
                        break;
                    case "4":
                        pull++;
                        fourStar++;
                        break;
                    case "5":
                        console.log("五星：",item.name)
                        pull=0;
                        fiveStar++;
                        console.log(pull)
                        break;
                }
            })
            let gachaType;
            switch (list[0].gacha_type) {
                case "1":
                    gachaType = 0;
                    break;
                case "2":
                    gachaType = 1;
                    break;
                case "11":
                    gachaType = 2;
                    break;
                case "12":
                    gachaType = 3;
                    break;
            }
            this.analysisList[gachaType].five = fiveStar;
            this.analysisList[gachaType].four = fourStar;
            this.analysisList[gachaType].three = threeStar;
            this.analysisList[gachaType].total = total;
            this.analysisList[gachaType].pull = pull;
            console.log(this.analysisList)
        },
        async Init() {
            this.loading = true;
            await this.getAuthInfo(this.inputUrl)
            console.log(this.authInfo)
            try {
                this.dialogTableVisible = true;
                new Promise((resolve, reject) => {
                    this.gachaNum = 0;
                    this.dialogTextTemp = "正在读取常驻池，已读取：";
                    this.showData(1, 0, 1, resolve);
                }).then(res => {
                    new Promise((resolve, reject) => {
                        this.gachaNum = 0;
                        this.dialogTextTemp = "正在读取新手池，已读取：";
                        setTimeout(() => {
                            this.showData(1, 0, 2, resolve);
                        }, 300)
                    }).then(res => {
                        new Promise((resolve, reject) => {
                            this.gachaNum = 0;
                            this.dialogTextTemp = "正在读取UP角色池，已读取：";
                            setTimeout(() => {
                                this.showData(1, 0, 11, resolve);
                            }, 300)
                        }).then(res => {
                            new Promise((resolve, reject) => {
                                this.gachaNum = 0;
                                this.dialogTextTemp = "正在读取UP武器池，已读取：";
                                setTimeout(() => {
                                    this.showData(1, 0, 12, resolve);
                                }, 300)
                            }).then(res => {
                                this.gachaNum = 0;
                                this.dialogTextTemp = "";
                                this.dialogText = "读取完成！";
                                setTimeout(() => {
                                    this.loading = false;
                                    this.dialogTableVisible = false
                                    this.warpList = this.regularWarpList
                                    this.warpList = this.warpList.concat(this.characterWarpList)
                                    this.warpList = this.warpList.concat(this.weaponWarpList)
                                    this.warpList = this.warpList.concat(this.noviceWarpList)

                                    this.analysisData(this.regularWarpList)
                                    this.analysisData(this.characterWarpList)
                                    this.analysisData(this.weaponWarpList)
                                    this.analysisData(this.noviceWarpList)


                                    console.log("warpList:", this.warpList)
                                    console.log("regularWarpList:", this.regularWarpList)
                                }, 500);
                            })
                        })
                    })
                })
            } catch (e) {
                this.dialogTableVisible = false;
                console.log(e)
                throw e;
            }
        },
        getAuthInfo(str) {
            let params = {};
            let urlParts = str.split("?");
            if (urlParts.length > 1) {
                let queryString = urlParts[1];
                let paramPairs = queryString.split("&");

                for (let i = 0; i < paramPairs.length; i++) {
                    let paramPair = paramPairs[i].split("=");
                    let paramKey = decodeURIComponent(paramPair[0]);
                    let paramValue = decodeURIComponent(paramPair[1]);
                    paramValue = encodeURIComponent(paramValue)
                    params[paramKey] = paramValue;
                }
            }
            this.authInfo = params;
        },
        showData(page, end_id, gacha_type, resolve) {
            if (page == 1) {
                console.log("开始读取", gacha_type)
            }
            let url = "/proxy_api" +
                "/common/gacha_record/api/getGachaLog" +
                "?authkey_ver=1" + //使用的身份验证密钥版本
                // "&sign_type=2" +
                // "&auth_appid=webview_gacha" +
                // "&win_mode=fullscreen" +
                // "&gacha_id=dbebc8d9fbb0d4ffa067423482ce505bc5ea" +
                "&timestamp=" + this.authInfo.timestamp +
                // "&region=prod_gf_cn" +
                // "&default_gacha_type=11" +
                "&lang=zh-cn" +
                "&authkey=" + this.authInfo.authkey +
                "&game_biz=hkrpg_cn" +
                // "&os_system=Windows%2011%20%20%2810.0.22621%29%2064bit" +
                // "&device_model=82B6%20%28LENOVO%29" +
                // "&plat_type=pc" +
                "&page=" + page +
                "&size=20" +
                "&gacha_type=" + gacha_type +
                "&end_id=" + end_id +
                "";
            this.getData(url, data => {
                let list = data.data.list;
                this.gachaNum += list.length;
                this.dialogText = this.dialogTextTemp + this.gachaNum + "个";
                console.log("正在读取第", page, "页，length=", list.length);
                switch (list[0].gacha_type) {
                    case "1":
                        this.regularWarpList = this.regularWarpList.concat(list);
                        break;
                    case "2":
                        this.noviceWarpList = this.noviceWarpList.concat(list);
                        break;
                    case "11":
                        this.characterWarpList = this.characterWarpList.concat(list);
                        break;
                    case "12":
                        this.weaponWarpList = this.weaponWarpList.concat(list);
                        break;
                }
                end_id = list[list.length - 1].id;
                if (list.length != 20) {
                    resolve();
                    return
                }
                page += 1;
                setTimeout(() => {
                    this.showData(page, end_id, gacha_type, resolve);
                }, this.delay);
            })
        },
        getData(url, callback) {
            axios.get(url)
                .then((response) => {
                    if (response.data.data.list == null) {
                        setTimeout(() => {
                            this.getData(url, callback)
                        }, 500)
                    } else {
                        callback(response.data)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    throw err;
                })
        },
        tableRowClassName(row) {
            if (row.row.rank_type == "5") {
                return 'five_star'
            } else if (row.row.rank_type == "4") {
                return 'four_star'
            } else {
                return 'rubbish'
            }
        }
    },
    data() {
        return {
            activeName: "常驻池",
            authInfo: {},
            inputUrl: "",
            loading: false,
            delay: '300',
            warpNum: 0,
            dialogText: "开始读取抽卡数据...",
            dialogTextTemp: "",
            dialogTableVisible: false,
            warpList: [],

            noviceWarpList: [],
            regularWarpList: [],
            characterWarpList: [],
            weaponWarpList: [],

            analysisList: [
                {
                    label: "常驻池",
                    total: 0,
                    three: 0,
                    four: 0,
                    five: 0,
                    pull:0,
                },
                {
                    label: "新手池",
                    total: 0,
                    three: 0,
                    four: 0,
                    five: 0,
                    pull:0,
                },
                {
                    label: "UP角色池",
                    total: 0,
                    three: 0,
                    four: 0,
                    five: 0,
                    pull:0,
                },
                {
                    label: "UP武器池",
                    total: 0,
                    three: 0,
                    four: 0,
                    five: 0,
                    pull:0,
                }
            ],
            page: 0,
            tableData: [
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-05-03 17:58:12",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1683105000007687575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-05-03 04:28:37",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1683058200001188975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-05-01 21:41:00",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682946600009260375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "21011",
                    "count": "1",
                    "time": "2023-05-01 14:28:49",
                    "name": "与行星相会",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682921400008175675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "21003",
                    "count": "1",
                    "time": "2023-05-01 04:03:39",
                    "name": "唯有沉默",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682885400002207975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-05-01 04:03:36",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002179475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-05-01 04:03:33",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002153275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-05-01 04:03:30",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002125375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-05-01 04:03:27",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002098275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-05-01 01:54:31",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600009613675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-05-01 01:36:54",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600007104375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-05-01 00:53:41",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682871000014668975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-30 20:06:39",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600016675175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-30 20:06:18",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600015930675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "1008",
                    "count": "1",
                    "time": "2023-04-30 20:06:13",
                    "name": "阿兰",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682856600015722975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-30 18:58:53",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682849400010879075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-30 18:58:50",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682849400010866975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007083375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007083275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007083175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007083075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007082975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007082875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007082775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "21018",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "舞！舞！舞！",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682838600007082675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007082575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-30 15:32:06",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007082475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-30 15:31:34",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600006958675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-29 03:41:10",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000003212475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-29 03:41:07",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000003208975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-29 02:25:30",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400003546875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-29 02:25:27",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400003541475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-29 02:25:24",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400003531775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "1106",
                    "count": "1",
                    "time": "2023-04-29 02:25:21",
                    "name": "佩拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682705400003526375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-29 02:25:17",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400003520875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-29 02:25:14",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400003516775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-28 18:46:53",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682676600011563475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-28 17:42:17",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682673000009272275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-28 17:42:14",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682673000009262075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-28 17:42:10",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682673000009242575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-28 17:31:09",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682673000006766275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-28 05:37:23",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682629800001403475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "1002",
                    "count": "1",
                    "time": "2023-04-28 04:38:52",
                    "name": "丹恒",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682626200002228675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-27 22:38:36",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682604600014054875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-27 22:38:34",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682604600014041175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-27 22:38:31",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682604600014021375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "21012",
                    "count": "1",
                    "time": "2023-04-27 21:36:29",
                    "name": "秘密誓心",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682601000011642475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-27 21:36:26",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682601000011629875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-27 21:36:23",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682601000011609675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-27 21:36:21",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682601000011596675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-27 21:36:18",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682601000011588475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-27 21:36:15",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682601000011573375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "23003",
                    "count": "1",
                    "time": "2023-04-27 17:15:48",
                    "name": "但战斗还未结束",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "5",
                    "id": "1682586600003342375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-27 17:08:54",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001864175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "1206",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "素裳",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682586600001616875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-27 17:07:45",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600001616075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-27 15:12:44",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682579400002451375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "21016",
                    "count": "1",
                    "time": "2023-04-27 14:29:02",
                    "name": "宇宙市场趋势",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682575800006169075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-27 04:40:55",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800002602275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-27 04:40:51",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800002598475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-27 04:22:27",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800001612175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-27 04:18:09",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800001387475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-27 04:18:06",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800001385675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-27 04:18:03",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800001383975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-27 01:51:22",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014329175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014283375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014283275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "21017",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "点个关注吧！",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682529000014283175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014283075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014282975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014282875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014282775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "1103",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "希露瓦",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682529000014282675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014282575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-27 01:51:12",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014282475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013448175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013448075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013447975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013447875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013447775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013447675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "1103",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "希露瓦",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682496600013447575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013447475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013447375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-26 16:29:39",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013447275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "1001",
                    "gacha_type": "1",
                    "item_id": "1009",
                    "count": "1",
                    "time": "2023-04-26 10:53:11",
                    "name": "艾丝妲",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682475000043358675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "1107",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "克拉拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "5",
                    "id": "1682496600013292275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013292175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013292075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "21000",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "一场术后对话",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682496600013291975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "21007",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "同一种心情",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682496600013291875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013291775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013291675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013291575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013291475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-26 16:29:15",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013291375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030768175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030768075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030767975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "1108",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "桑博",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682485800030767875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030767775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030767675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030767575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030767475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030767375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-26 13:38:12",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030767275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045171175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045171075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045170975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "21002",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "余生的第一天",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682478600045170875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045170775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045170675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045170575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045170475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045170375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-26 11:58:22",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682478600045170275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "21009",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "朗道的选择",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682475000044856075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "1108",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "桑博",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682475000044855675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-26 10:54:56",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044855175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044749275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044749175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044749075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "21010",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "论剑",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682475000044748975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044748875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044748775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044748675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044748575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044748475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "4001",
                    "gacha_type": "2",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-26 10:54:49",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000044748375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1003",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "姬子",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "5",
                    "id": "1682874600006912875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006912775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21020",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "天才们的休憩",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682874600006912675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006912575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006912475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006912375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006912275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006912175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006912075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-05-01 01:35:45",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682874600006911975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-30 20:03:42",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600008510775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1106",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "佩拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682856600004786075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21002",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "余生的第一天",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682856600004785775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-30 20:02:24",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682856600004785175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-30 19:42:59",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682853000007811375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-30 18:59:04",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682849400010909775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1106",
                    "count": "1",
                    "time": "2023-04-30 18:58:41",
                    "name": "佩拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682849400010842675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-30 16:00:53",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682842200000208975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-30 15:32:33",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007185175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-30 15:32:30",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007175975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-30 15:32:26",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007161675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-30 15:32:23",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007143675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-30 15:32:20",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600007132775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-30 15:31:44",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600006997275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-30 15:31:41",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682838600006984775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1106",
                    "count": "1",
                    "time": "2023-04-30 04:03:05",
                    "name": "佩拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682799000000303575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-30 04:03:01",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682799000000299775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-30 02:56:12",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682791800005638175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-30 01:23:02",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682788200004003875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-30 00:52:31",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682784600011999775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-30 00:52:27",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682784600011990475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-29 21:47:51",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682773800012369775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-29 21:17:00",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682773800004260175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-29 20:03:56",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682770200000835375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-29 20:02:36",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682770200000526975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1105",
                    "count": "1",
                    "time": "2023-04-29 20:02:30",
                    "name": "娜塔莎",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682770200000507675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-29 19:26:43",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682766600005760375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-29 19:12:21",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682766600002711175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-29 19:12:18",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682766600002700975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-29 18:35:12",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682763000007684675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-29 18:35:08",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682763000007673075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-29 18:35:04",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682763000007663275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-29 04:57:42",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682712600003330075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-29 04:01:15",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682712600000168475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-29 04:00:51",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682712600000104675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21018",
                    "count": "1",
                    "time": "2023-04-29 04:00:43",
                    "name": "舞！舞！舞！",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682712600000083275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-29 03:41:01",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000003204875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-29 03:40:57",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000003199675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-29 03:29:39",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000002474175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-29 03:29:34",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000002468075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-29 03:22:32",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000001961075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-29 03:22:29",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682709000001954975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-29 02:59:05",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400006992075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-29 02:59:02",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400006988275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1106",
                    "count": "1",
                    "time": "2023-04-29 02:16:16",
                    "name": "佩拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682705400002336075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-29 02:01:27",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682705400000242575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-29 01:48:11",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682701800009706875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-29 01:48:08",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682701800009697875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-29 01:17:02",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682701800003906575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-29 00:54:21",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682698200015603475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-29 00:06:15",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682698200001982875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-28 17:51:53",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682673000011421975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-28 17:38:19",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682673000008388275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21019",
                    "count": "1",
                    "time": "2023-04-28 13:05:10",
                    "name": "在蓝天下",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682658600001341575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-28 05:37:33",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682629800001408475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-28 05:37:28",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682629800001405975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-28 05:02:35",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682629800000115275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-28 04:39:04",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682626200002237775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-28 04:33:39",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682626200002038375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-28 04:16:51",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682626200001265275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-28 04:03:54",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682626200000443475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-28 04:03:50",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682626200000439775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1105",
                    "count": "1",
                    "time": "2023-04-28 04:03:43",
                    "name": "娜塔莎",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682626200000431975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-28 00:22:02",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682611800006883575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1105",
                    "count": "1",
                    "time": "2023-04-27 22:39:04",
                    "name": "娜塔莎",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682604600014247475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1102",
                    "count": "1",
                    "time": "2023-04-27 22:14:20",
                    "name": "希儿",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "5",
                    "id": "1682604600005183875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-27 22:14:15",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682604600005155175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-27 21:34:39",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682601000011054775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-27 21:10:14",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682601000003275075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-27 20:50:29",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682597400014420175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-27 20:50:25",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682597400014406775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-27 19:23:41",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682593800005631575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-27 18:55:52",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682590200012840575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21019",
                    "count": "1",
                    "time": "2023-04-27 18:55:47",
                    "name": "在蓝天下",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682590200012818875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-27 18:55:43",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682590200012806275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-27 18:36:15",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682590200008184675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-27 18:35:32",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682590200008020475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-27 18:35:23",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682590200007979875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1105",
                    "count": "1",
                    "time": "2023-04-27 18:35:17",
                    "name": "娜塔莎",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682590200007957375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005748375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005748275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005748175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005748075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005747975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005747875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005747775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005747675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21007",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "同一种心情",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682586600005747575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-27 17:26:56",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682586600005747475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-27 15:41:52",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682579400008151675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-27 15:00:23",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682579400000074475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-27 14:29:12",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682575800006210075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-27 14:28:22",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682575800006046675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-04-27 14:13:35",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682575800003045575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-27 13:44:58",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682572200013221175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1109",
                    "count": "1",
                    "time": "2023-04-27 07:10:54",
                    "name": "虎克",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682550600000970775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-27 06:34:34",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682547000002140175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-27 06:34:30",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682547000002135575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-04-27 05:29:59",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400001318475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-27 05:18:16",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400000789875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-27 05:18:08",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400000787775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-27 05:18:04",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400000785675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-27 05:18:01",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400000784975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20017",
                    "count": "1",
                    "time": "2023-04-27 05:17:57",
                    "name": "开疆",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400000779975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21004",
                    "count": "1",
                    "time": "2023-04-27 05:17:53",
                    "name": "记忆中的模样",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682543400000775275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-27 05:03:37",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400000145175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-04-27 05:03:33",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682543400000144375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-27 04:17:56",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800001380675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20002",
                    "count": "1",
                    "time": "2023-04-27 04:03:53",
                    "name": "天倾",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800000404275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-27 04:03:49",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800000397975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-27 04:01:03",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682539800000106575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-27 03:09:54",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682536200000939975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20000",
                    "count": "1",
                    "time": "2023-04-27 02:37:54",
                    "name": "锋镝",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682532600005803675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1105",
                    "count": "1",
                    "time": "2023-04-27 02:16:55",
                    "name": "娜塔莎",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682532600002949575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1109",
                    "count": "1",
                    "time": "2023-04-27 02:11:07",
                    "name": "虎克",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682532600001990475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-04-27 02:11:03",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682532600001974375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-27 01:51:33",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014381875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-27 01:51:06",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000014249175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20013",
                    "count": "1",
                    "time": "2023-04-27 01:44:57",
                    "name": "灵钥",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682529000012863675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20016",
                    "count": "1",
                    "time": "2023-04-26 22:45:10",
                    "name": "俱殁",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682518200028685375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-26 22:21:26",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682518200013404775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-26 21:50:09",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682514600028876975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-04-26 21:50:03",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682514600028820375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-26 16:37:21",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600016824975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1105",
                    "count": "1",
                    "time": "2023-04-26 16:29:56",
                    "name": "娜塔莎",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682496600013549575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-26 16:29:50",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682496600013516575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-26 15:49:51",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682493000023359075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-26 15:47:11",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682493000022167375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-26 15:45:08",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682493000021200675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-04-26 15:31:00",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682493000014658775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-26 15:08:05",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682493000003993575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-26 15:08:00",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682493000003963575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-04-26 14:05:01",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682489400002836075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-26 14:04:55",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682489400002778275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21014",
                    "count": "1",
                    "time": "2023-04-26 13:56:56",
                    "name": "此时恰好",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682485800043154575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030948775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "1109",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "虎克",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682485800030948675"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20020",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "睿见",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030948575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "21013",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "别让世界静下来",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682485800030948475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030948375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030948275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030948175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030948075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20005",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "齐颂",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030947975"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-04-26 13:38:27",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800030947875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "2003",
                    "gacha_type": "11",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-04-26 10:58:49",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682475000048376775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20004",
                    "count": "1",
                    "time": "2023-05-04 05:31:21",
                    "name": "幽邃",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1683148200000469575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20014",
                    "count": "1",
                    "time": "2023-05-04 05:00:08",
                    "name": "相抗",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1683148200000004075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "21000",
                    "count": "1",
                    "time": "2023-05-04 03:00:54",
                    "name": "一场术后对话",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1683141000000023875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20019",
                    "count": "1",
                    "time": "2023-05-03 17:58:07",
                    "name": "调和",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1683105000007674275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-05-03 14:01:43",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1683094200000255075"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-05-03 04:06:11",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1683058200000361575"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "1106",
                    "count": "1",
                    "time": "2023-05-02 11:44:48",
                    "name": "佩拉",
                    "lang": "zh-cn",
                    "item_type": "角色",
                    "rank_type": "4",
                    "id": "1682997000009483875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-05-02 11:44:44",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682997000009470475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-05-02 11:44:42",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682997000009466175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20006",
                    "count": "1",
                    "time": "2023-05-02 11:44:39",
                    "name": "智库",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682997000009460875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-05-01 22:52:53",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682950200012979375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20009",
                    "count": "1",
                    "time": "2023-05-01 15:01:52",
                    "name": "乐圮",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682925000000521775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20001",
                    "count": "1",
                    "time": "2023-05-01 14:28:58",
                    "name": "物穰",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682921400008215775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20018",
                    "count": "1",
                    "time": "2023-05-01 14:28:45",
                    "name": "匿影",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682921400008161475"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20008",
                    "count": "1",
                    "time": "2023-05-01 04:04:20",
                    "name": "嘉果",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002520175"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "21000",
                    "count": "1",
                    "time": "2023-05-01 04:04:09",
                    "name": "一场术后对话",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "4",
                    "id": "1682885400002437875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-05-01 04:04:05",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002413775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20007",
                    "count": "1",
                    "time": "2023-05-01 04:04:03",
                    "name": "离弦",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002403375"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20010",
                    "count": "1",
                    "time": "2023-05-01 04:04:00",
                    "name": "戍御",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002374275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20015",
                    "count": "1",
                    "time": "2023-05-01 04:03:58",
                    "name": "蕃息",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002356775"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20012",
                    "count": "1",
                    "time": "2023-05-01 04:03:55",
                    "name": "轮契",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002338275"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20011",
                    "count": "1",
                    "time": "2023-05-01 04:03:52",
                    "name": "渊环",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682885400002310875"
                },
                {
                    "uid": "105319575",
                    "gacha_id": "3003",
                    "gacha_type": "12",
                    "item_id": "20003",
                    "count": "1",
                    "time": "2023-04-26 13:39:10",
                    "name": "琥珀",
                    "lang": "zh-cn",
                    "item_type": "光锥",
                    "rank_type": "3",
                    "id": "1682485800031465675"
                }
            ]
        }
    }
}
</script>

<style>
.el-col {
    padding-bottom: 20px;
}

.five_star {
    color: #DC7B00;
}

.four_star {
    color: #A256E0
}

.rubbish {
    color: #5AA897
}

:global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
}

.el-statistic {
    --el-statistic-content-font-size: 28px;
}

.statistic-card {
    height: 100%;
    padding: 20px 20px 0;
    border-radius: 4px;
}

.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
.statistic-card{
    padding:0
}
</style>