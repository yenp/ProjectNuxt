<template>
    <Modal ref="modalPhoneForm" id="modal-change-phone-form-submit">
      <template v-slot:content>
        <div class="modal-contact formCore">
          <div class="content">
            <p class="title f-20 mb-10px">Vui lòng nhập số điện thoại của bạn</p>
            <form @submit.prevent="showStepTwo ? verifyWithOTP() : saveConfirm()" class="group-content mt-28px">
              <div v-if="showStepTwo" class="form-group row">
                  <label class="f-13 col-md-3 col-sm-12 mt-8px">
                    Mã code
                    <span style="color:red">*</span>
                </label>
                 <div class="form-group col-md-9 col-sm-12">
                  <input v-on:keyup="nextCode($event)" @keypress="isNumber($event)" v-model="codeObj.code1" type="text" class="form-control verifyOTP" required maxlength="1">
                  <input v-on:keyup="nextCode($event)" @keypress="isNumber($event)" v-model="codeObj.code2" type="text" class="form-control verifyOTP" required maxlength="1">
                  <input v-on:keyup="nextCode($event)" @keypress="isNumber($event)" v-model="codeObj.code3" type="text" class="form-control verifyOTP" required maxlength="1">
                  <input v-model="codeObj.code4" @keypress="isNumber($event)" type="text" class="form-control verifyOTP" required maxlength="1">
                </div>


              </div>
              <div v-else class="form-group row">
                    <label class="f-13 col-md-3 col-sm-12 mt-8px">
                      Số điện thoại
                      <span style="color:red">*</span>
                  </label>
                  <input required v-model="activePhone" class="form-control col-md-9 col-sm-12" placeholder="Nhập số điện thoại cần xác thực">

              </div>
                <div class="form-group mb-40px group-checkbox d-flex">
                    <b-form-checkbox
                        v-model="agree"
                        name="checkbox-agree"
                        required
                        >
                    </b-form-checkbox>
                     <span class="f-12 main-black mt-2px ml-5px">Tôi đồng ý với <span class="main-color">điều khoản</span> của Econs <span style="color:red">*</span></span>
                </div>
                <div class="group-btn row">

                    <div class="col-md-12">
                        <button  type="submit" class="btn-now">
                          {{showStepTwo ? 'Xác nhận' : 'GỬI MÃ OTP XÁC THỰC'}}
                        </button>
                        <small class="text-danger" v-if="msg">{{msg}}</small>
                    </div>


                </div>
            </form>
          </div>
        </div>
      </template>
    </Modal>
</template>

<script>
export default {
  props:['phone'],
  data(){
    return{
        agree:false,
        options: this.getCategory(),
        date: new Date(),
        activePhone:this.phone,
        showStepTwo:false,
        msg:'',
        codeObj:{}
    }
    },
    mounted(){

    },
    methods:{
        saveConfirm(){
          this.msg = '';
          let obj = {phone: this.activePhone}
          // call api here
          this.$post('user/verify/phone',obj)
              .then(res => {
                if(res.data.status == true){
                  this.showStepTwo = true
                  this.agree = false
                }else{
                  this.msg = res.data.msg
                }
              })
              .catch(err => {
                  this.msg = 'Có lỗi xảy ra'
                  console.log(err)
              })
        },
        verifyWithOTP(){
           this.msg = '';
          let obj = {
                      phone:this.activePhone,
                      verifiedCode:this.getCodeObj()
                    }
          this.$post('user/verify/phone/code',obj)
              .then(res => {
                if(res.data.status){
                   this.$emit('doneConfirmPhone');
                } else{
                  this.msg = res.data.msg
                }
              })
              .catch(err =>{
                this.msg = 'Có lỗi xảy ra'
              })
        },
         getCodeObj(){
          var code = '';
          var object = this.codeObj;
            for (const key in object) {
              if (Object.hasOwnProperty.call(object, key)) {
                code = code + object[key]+'';
              }
            }
            return code;
        },
        nextCode(evt){
          const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
          const keyPressed = evt.key;
          if (!keysAllowed.includes(keyPressed)){
            return
          }
          evt.target.nextElementSibling.focus()
        },
        show() {
            this.$refs.modalPhoneForm.showModal();
        },
        hide(){
            this.$refs.modalPhoneForm.hideModal()
        },
    }
}
</script>