<template>
    <div id="manage-project">
        <div class="wrap">
            <h1 class="title">Dự án đang  chào giá</h1>
             <div class="group-function d-flex">
                <input v-model="searchText" @change="handleSearchText()" class="input-search form-control" placeholder="Tìm kiếm dự án" />
                <treeselect
                        class="option-search"
                        :options="optionSearch"
                        :value="objSearch.type"
                        v-model="objSearch.type"
                        placeholder="Tra theo năm"
                        :clearable=false
                />
                <div class="btn-search" @click="handleSearch">
                    Tìm kiếm
                </div>
            </div>
        </div>

        <table class="table table-custom" v-if="listShow">
            <thead>
                <tr>
                    <th scope="col">Tên dự án</th>
                    <th scope="col">Khách hàng</th>
                    <th scope="col">Giá của bạn</th>
                    <th scope="col">Trạng thái</th>
                </tr>
            </thead>
            <tbody  v-if="listShow" >
                <tr v-for="(item,idx) in listShow" :key="idx">
                    <td class="name cursor-pointer"
                        :class="item.project ? getClassCategory(mapImgFromCategory(item.project.category)) : '' "
                        @click="$router.push(`/du-an/${item.project.slug}`)"
                    >
                        {{item.project ? item.project.name : ''}}
                    </td>
                    <td class="customer  f-12">
                        <span class="text-main font-weight-bold">{{item.projectOwner.name}}</span>
                    </td>
                    <td class="price ">{{formatVnd(item.price)}} VND</td>
                    <td class="status ">
                        <template >
                                <b-dropdown id="dropdown-duedate" variant="link" toggle-class="text-decoration-none" class="custom-infor pb-5px" no-caret>
                                    <template #button-content>
                                        <div class="d-flex">
                                            <div class="cover-infor">
                                                <p class="f-12">
                                                <span class="f-12 text-main">Đã gửi chào giá</span>
                                                <i class="fas fa-caret-down ml-5px f-16 text-main"></i>
                                                </p>
                                            </div>
                                        </div>
                                    </template>
                                    <b-dropdown-item class="f-12" @click="destroySurvey(item)">
                                    Huỷ chào giá
                                    </b-dropdown-item>
                            </b-dropdown>
                        </template>
                        <!-- Not due date -->
                        <!-- <template v-else>
                            <span class="f-12">Đang nhận hồ sơ</span>
                        </template> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            listProject:null,
            listShow:null,
            optionSearch:[
                { id: 1, label: 'Tất cả dự án' },
                { id: 2, label: 'Đang nhận hồ sơ' },
                { id: 3, label: 'Đã hết hạn' },
            ],
            optionOverDue:[
                {id:1,label:'Đăng lại dự án'}
            ],
            objSearch:{
                type:1,
            },
            searchText:''
        }
    },
    watch:{
        objSearch:{
            deep:true,
            handler(){
               this.filterList(JSON.parse(JSON.stringify(this.listProject)))
            }
        },
    },
    mounted(){
        this.getListQuote()
    },
    methods:{
        getListQuote(){
            this.loader()
            this.$get('/member/my-auction/')
                .then(res => {
                    this.listProject = res.data
                    this.listShow = res.data.filter(item =>item.survey.length == 0)
                    this.loader(0)
                })
                .catch(err => {
                    this.loader(0)
                })
        },
        destroySurvey(survey){
            console.log('survey',survey)
            this.loader()
            this.$post('member/auction/delete', {project:survey.project._id})
                .then(res => {
                    this.getListQuote()
                    this.loader(0)
                })
                .catch(err => {
                    this.loader(0)
                })
        },
        filterList(list){
            if(this.objSearch.type == 1){
                this.listShow = list
            }
            else if(this.objSearch.type == 2){
                this.listShow = list.filter(item => !this.checkStatusDueDate(item.dueDate))
            }
            else{
                this.listShow = list.filter(item => this.checkStatusDueDate(item.dueDate))
            }
        },
        handleSearchText(){
            var arrTemp = JSON.parse(JSON.stringify(this.listProject))
            if(this.searchText){
                this.listShow = arrTemp.filter(item => {
                    return this.searchText.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                })
            }
            else{
                this.listShow = arrTemp
            }
        },
        handleSearch(){
            var arrTemp = JSON.parse(JSON.stringify(this.listProject))
            if(this.searchText){
                var arrSearchTextTmp = arrTemp.filter(item => {
                    return this.searchText.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
                })
                this.filterList(arrSearchTextTmp)
            }
            else{
                this.filterList(this.listProject)
            }
        }
    }
}
</script>