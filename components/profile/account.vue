<template>
    <div class="editProfileInfoWrap">
        <div class="w-100 flex-align-center tabsWrap">
            <div @click="addQuery(tab.id)" v-for="(tab) in tabs" :key="tab.id" :class="{'activeTab': activeTab === tab.id}" class="tabItem flex-align-center">
                <div>{{tab.text}}</div>
            </div>
        </div>

        <div class="editWrap">
            <ProfileEditPersonal  v-if="activeTab === '1'" />

            <ProfileEditCompany  v-if="activeTab === '2'" />

            <ProfileEditWork  v-if="activeTab === '3'" />

            <ProfileEditConfirm  v-if="activeTab === '4'" />
        </div>
    </div>

</template>
<script>

export default {
    components: {
    },
    data(){
        return{
            tabs: [{
                id: '1',
                text: 'Thông tin cá nhân'
            }, {
                id: '2',
                text: 'Hồ sơ làm việc'
            }, {
                id: '3',
                text: 'Dự án đã thực hiện'
            }, {
                id: '4',
                text: 'Xác thực tài khoản'
            }],
            activeTab: this.$nuxt.$route.query.tab,
        }
    },
    mounted(){
    },
    watch:{
        tabUrl(){
            this.activeTab = this.tabUrl
        }
    },
    computed:{
        tabUrl(){
            return this.$nuxt.$route.query.tab
        },

    },
    methods:{
         addQuery(tab){
           this.$router.push({path: this.$route.path, query: { tab: tab }})
        }
    }

}
</script>