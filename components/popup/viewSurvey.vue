<template>
    <div>
        <Modal ref="popupSurvey" id="modal-survey">
            <template v-slot:content>
                <div class="modal-contact formCore" v-if="objInfor">
                    <div class="content">
                        <p class="title f-16 isCancel pr-60px" >
                            Khách hàng <span class="text-main">{{objInfor.name}}</span> đã chọn bạn khảo sát hiện trạng và gửi báo giá cuối cùng. Bạn sẽ tốn <span class="text-main">12 Tokens</span> khi xác nhận tham gia khảo sát và báo giá
                        </p>
                        <form @submit.prevent="sendMessage()" class="group-content mt-20px">
                            <div class="form-group row">
                                <label class="f-13 col-md-3 col-sm-12 ">
                                    Tên dự án
                                </label>
                                <span class="col-md-9 col-sm-12 pl-0 name-project"
                                    :class="getClassCategory(mapImgFromCategory(rawCategory))"
                                >
                                    {{detailProject.name}}
                                </span>
                            </div>
                            <div class="form-group row">
                                    <label class="f-13 col-md-3 col-sm-12 ">
                                    Soạn tin nhắn
                                    <span style="color:red">*</span>
                                    </label>
                                    <textarea required id="customPlaceholder" class="form-control col-md-9 col-sm-12" rows="5"
                                        :placeholder="placeholder"
                                        v-model="objResearch.message"
                                        :readonly="true"
                                    >
                                    </textarea>
                            </div>
                            <div class="form-group row">
                                    <label class="f-13 col-md-3 col-sm-12 ">
                                        Địa điểm khảo sát
                                        <span style="color:red">*</span>
                                    </label>
                                    <input type="text"
                                        class="form-control col-md-9 col-sm-12"
                                        v-model="objResearch.address"
                                        placeholder="Nhập địa chỉ công trình"
                                        required
                                        :readonly="true"
                                    >
                            </div>
                            <div class="form-group row">
                                    <label class="f-13 col-md-3 col-sm-12 ">
                                        Thời gian khảo sát
                                        <span style="color:red">*</span>
                                    </label>
                                    <div class="d-flex">
                                        <template>
                                            <div class="input-group custom-input-calendar" style="min-width:170px">
                                                <input type="text"
                                                        class="form-control"
                                                        :value="$moment(objResearch.date).format('DD/MM/YYYY')"
                                                        readonly
                                                        required>
                                                <div class="input-group-append">
                                                    <span class="input-group-text custom-time disabled"><i class="fas fa-calendar-day"></i></span>
                                                </div>
                                            </div>
                                        </template>
                                        <input type="time" v-model="objResearch.time" :readonly="true" class="ml-20px form-control">
                                    </div>
                            </div>
                            <div class="form-group row">
                                <label class="f-13  col-md-3 col-sm-12 mt-1">
                                    Tài liệu đính kèm
                                </label>
                                <div class="col-md-9 col-sm-12 pl-0">
                                        <!-- new file file -->
                                        <div class="col-md-3" v-if="arrFile.length"></div>
                                        <div class="col-md-9 pl-0" v-if="arrFile.length">
                                            <template v-for="(item,idx) in arrFile">
                                                <p :key="idx" class="f-11 text-main ">
                                                    <span v-html="returnTypeFile(item.name)" class="mr-5px"></span>
                                                    {{item.name}}
                                                </p>
                                            </template>
                                        </div>
                                        <!-- old file -->
                                        <div class="col-md-3" v-if="objProject.survey[0] && objProject.survey[0].attachments"></div>
                                        <div class="col-md-9 pl-0" v-if="objProject.survey[0] && objProject.survey[0].attachments">
                                            <template v-for="(item,idx) in objProject.survey[0].attachments">
                                                <p :key="idx" class="f-11 text-main ">
                                                    <span v-html="returnTypeFile(item)" class="mr-5px"></span>
                                                    {{spliceURLFile(item,'--')}}
                                                </p>
                                            </template>
                                        </div>
                                </div>
                            </div>
                            <div class="form-group  group-checkbox d-flex">
                                <b-form-checkbox
                                    v-model="objResearch.agree"
                                    name="checkbox-agree-survey"
                                    required
                                    >
                                </b-form-checkbox>
                                 <span class="f-12 main-black mt-2px ml-5px">Tôi đồng ý với <span class="main-color">điều khoản</span> của Econs <span style="color:red">*</span></span>
                            </div>
                            <div class="form-group  group-checkbox d-flex">
                                <b-form-checkbox
                                    v-model="objResearch.agreeSurvey"
                                    name="checkbox-agree"
                                    required
                                    >
                                </b-form-checkbox>
                                <span class="f-12 main-black mt-2px ml-5px">Tôi đồng ý khảo sát hiện trạng và sẽ  <span class="text-red"> cập nhật báo giá trong vòng 24 giờ </span> sau khi khảo sát <span style="color:red">*</span></span>
                            </div>
                            <div class="group-btn row">
                                <div v-if="!$auth.loggedIn"  class="col-md-12">
                                    <button @click="hide()" type="button" class="btn-now">
                                        VUI LÒNG ĐĂNG NHẬP
                                    </button>
                                </div>
                                <div v-else class="col-md-12 d-flex">
                                    <button type="submit" class="d-none" ref="btnClick"></button>
                                    <button type="button" @click="sendSurvey('CONFIRM')" class="btn-now mr-15px" >
                                    XÁC NHẬN KHẢO SÁT
                                    </button>
                                    <button type="button" @click="sendSurvey('CANCEL')" class="btn-now delete"  >
                                        TỪ CHỐI YÊU CẦU KHẢO SÁT
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </template>
        </Modal>
        <PopupSurveyContact   ref="surveyContact" :objConfirm="objConfirm"    />
    </div>
</template>

<script>
export default {
    props:['detailProject','rawCategory','objProject'],
    data(){
        return{
            objResearch:{
                agree:false,
                agreeSurvey:false,
                date:new Date().getTime(),
            },
            objInfor:null,
            arrFile:[],
            accepFile:["png", "jpg", "jpeg" , "tiff", "pdf", "xls", "doc", "ppt", "zip", "rar"],
            options: this.getCategory(),
            date: new Date(),
            statusConfirm:'',
            objConfirm:null,
            placeholder:'1. Mô tả chi tiết về dự án xây dựng hoặc yêu cầu thiết kế của bạn\n2. Vui lòng đính kèm sổ đỏ, bản vẽ, thiết kế hoặc hình ảnh minh hoạ để nhận được tư vấn/dự toán tốt nhất.\n3. Yêu cầu năng lực của đơn vị báo giá hoặc những yêu cầu khác',
        }
    },
    mounted(){
        if(this.objProject){
            this.objResearch = this.objProject.survey[0]
        }
    },
    methods:{
        async sendMessage(){
            try{
                this.loader()
                var arrFile = this.arrFile.length ? await this.uploadFile(this.arrFile) : []
                var obj = {
                            ...this.objResearch,
                            attachments:arrFile,
                            project: this.detailProject._id,
                            auction: this.objProject._id
                        }
                if(this.statusConfirm == 'CONFIRM'){
                    let res = await this.$post('member/survey/confirmed',obj)
                    this.$emit('getListParent')
                    this.objConfirm = res.data.auction.projectOwner
                    this.showSurveyContact()
                }
                else{
                    let res = await this.$post('member/survey/destroy',obj)
                    this.$emit('getListParent')
                }
                this.loader(0)
                this.hide()
                window.location.reload()
            }
            catch(err){
                console.log(err)
                this.loader(0)
            }

        },
        sendSurvey(status){
            this.statusConfirm = status
            this.$refs.btnClick.click()
        },
        getInforPerchant(infor){
            this.objInfor = infor
        },
        show() {
            this.$refs.popupSurvey.showModal();
            console.log('this.company',this.company)
        },
        hide(){
            this.$refs.popupSurvey.hideModal()
        },
        showSurveyContact(){
            this.$refs.surveyContact.show()
        },
        hideSurveyContact(){
            this.$refs.surveyContact.hide()
        }

    }
}
</script>