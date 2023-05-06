<!--
从米哈游账户中心获取authKey，还未完成
-->

<template>
    <el-button @click="getAccountInfo">getAccountInfo</el-button>
    <el-button @click="getToken">getToken</el-button>
    <el-button @click="getGameInfo">getGameInfo</el-button>
    <el-button @click="getAuthKey">getAuthKey</el-button>
    <el-button @click="getDs">getDs</el-button>
</template>

<script>
import axios from "axios";

export default {
    name: "Url",
    methods: {
        getAccountInfo() {
            let url = '/account/Api/login_by_cookie'
            let cookies = this.cookie.split(';')
            cookies.forEach(item => {
                document.cookie = item;
            })
            axios.get(url, {
                withCredentials: true,
            }).then((response) => {
                this.account_info = response.data.data.account_info
                console.log('获取账号信息成功：', this.account_info)
            })
        },
        getToken() {
            let url = '/proxy_api/auth/api/getMultiTokenByLoginTicket?' +
                'login_ticket=' + this.account_info.weblogin_token +
                '&token_types=3' +
                '&uid=' + this.account_info.account_id;
            axios.get(url, {
                withCredentials: true,
            }).then((response) => {
                this.token_list = response.data.data.list
                console.log('获取账号token成功：', this.token_list)
            })
        },
        getGameInfo() {
            let url = '/proxy_api/binding/api/getUserGameRolesByCookie?game_biz=hkrpg_cn'
            this.token_list.forEach(item => {
                document.cookie = item;
            })
            axios.get(url, {
                withCredentials: true,
            }).then((response) => {
                this.game_info = response.data.data.list[0]
                console.log('获取游戏角色信息成功：', this.game_info)
            })
        },
        getDs(){
            let _0xc07101 = Math['round'](new Date()['getTime']() / 1000);
            let _0xb9a7e6 = Math['floor'](Math['random']() * 0xdbba0 + 0x186a0);
            let _0x23295c = '';
            let _0xacc41f = "rKUl45uQ4v8Vx".split("").reverse().join("");
            let _0x14c147 = 'EYFZkJhB8cuOh9Asafs';
            _0x23295c = _0xacc41f + _0x14c147;
            let _0x2d2e0c = md5("=tlas".split("").reverse().join("") + _0x23295c + "=t&".split("").reverse().join("") + _0xc07101 + "=r&".split("").reverse()
                .join("") + _0xb9a7e6 + "=b&".split("").reverse().join("") + _0x315890 + '&q=' + _0x303d65);
            let ds = _0xc07101 + ',' + _0xb9a7e6 + "," + _0x2d2e0c;
            console.log(ds)
        },
        getAuthKey() {
            let url= "/proxy_api/binding/api/genAuthKey"
            let headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'Host': 'api-takumi.mihoyo.com',
                'Accept': 'application/json, text/plain, */*',
                'Referer': 'https://webstatic.mihoyo.com',
                'x-rpc-app_version': '2.28.1',
                'x-rpc-client_type': '5',
                'x-rpc-device_id': 'CBEC8312-AA77-489E-AE8A-8D498DE24E90',
                'x-requested-with': 'com.mihoyo.hyperion',
                'DS': "1683275601,zrolap,ca851ef61afd1e96902b4213d3c41391",
                'Cookie': "stuid=327605595; stoken=XuP1cANmIp6MEfCAEQFiKVd6Ayy9TOEE8QO5EbEX; ltoken=h8a3nfCFelF6at4GBDb1X4eu1e6b6SVybwBgdbmv; _MHYUUID=72d990a4-9ebc-400d-9cc7-8269a630c15f; mi18nLang=zh-cn; DEVICEFP_SEED_ID=7ab82241e1bbbaca; DEVICEFP_SEED_TIME=1682478228925; DEVICEFP=38d7ee218662f; cookie_token=hZy1oqoYC6z86cdaDkJwj3yDi6Ivz8XDbEovo4xV; account_id=327605595; ltoken=h8a3nfCFelF6at4GBDb1X4eu1e6b6SVybwBgdbmv; ltuid=327605595; _ga_9P3EH988KE=GS1.1.1682953483.5.1.1682953506.0.0.0; _ga_C3RWQNGX77=GS1.1.1682953483.5.1.1682953506.0.0.0; account_mid_v2=0ouv9en07f_mhy; account_id_v2=327605595; _ga=GA1.2.1324245902.1682768969; stoken=XuP1cANmIp6MEfCAEQFiKVd6Ayy9TOEE8QO5EbEX; stuid=327605595; login_uid=327605595; _MHYUUID=72d990a4-9ebc-400d-9cc7-8269a630c15f; login_ticket=DBwjPATQm45zRDSQdE18TfoytyG8aFKqnMDkl0Dj",
            }
            let data = {
                'auth_appid': 'webview_gacha',
                'game_biz': this.game_info.game_biz,
                'game_uid': this.game_info.game_uid,
                'region': this.game_info.region
            }
            axios.post(url, data, headers).then((res)=>{
                console.log()
                console.log(res)
            })

        },
        // getDs() {
        //     let n = 'ulInCDohgEs557j0VsPDYnQaaz6KJcv5'
        //     let i = str(int(time.time()))
        //     let r = random_text(6)
        //     let c = md5("salt=" + n + "&t=" + i + "&r=" + r)
        //     return f
        //     "{i},{r},{c}"
        // }
    },
    data() {
        return {
            cookie: "_MHYUUID=72d990a4-9ebc-400d-9cc7-8269a630c15f; mi18nLang=zh-cn; DEVICEFP_SEED_ID=7ab82241e1bbbaca; DEVICEFP_SEED_TIME=1682478228925; DEVICEFP=38d7ee218662f; cookie_token=hZy1oqoYC6z86cdaDkJwj3yDi6Ivz8XDbEovo4xV; account_id=327605595; ltoken=h8a3nfCFelF6at4GBDb1X4eu1e6b6SVybwBgdbmv; ltuid=327605595; _ga_9P3EH988KE=GS1.1.1682953483.5.1.1682953506.0.0.0; _ga_C3RWQNGX77=GS1.1.1682953483.5.1.1682953506.0.0.0; account_mid_v2=0ouv9en07f_mhy; account_id_v2=327605595; _ga=GA1.2.1324245902.1682768969; stoken=XuP1cANmIp6MEfCAEQFiKVd6Ayy9TOEE8QO5EbEX; stuid=327605595; login_uid=327605595; _MHYUUID=72d990a4-9ebc-400d-9cc7-8269a630c15f; login_ticket=n48VTkPxK1skEcLyl1JjlwPKra6Y1HOwTqqP6skl" ,
            Cookie:"",
            account_info: {},
            token_list: [],
            game_info: {}
        }
    },
}
</script>

<style scoped>

</style>