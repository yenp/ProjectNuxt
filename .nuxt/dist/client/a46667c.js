(window.webpackJsonp=window.webpackJsonp||[]).push([[84,65],{412:function(t,e,n){t.exports=n.p+"img/credit.0b9227f.svg"},413:function(t,e,n){t.exports=n.p+"img/logout.60b7669.svg"},418:function(t,e,n){"use strict";n.r(e);var l={data:function(){return{menus:[{id:"1",text:"Tài khoản của tôi",url:"/member/chinh-sua-ho-so?tab=1"},{id:"2",text:"Quản lý dự án",url:"/member/quan-ly-du-an/khach-hang?tab=1"},{id:"3",text:"Quản lý tài chính",url:"/member/quan-ly-tai-chinh?tab=1"}]}},props:{activeMenu:{default:"1"}},methods:{logout:function(){this.$auth.logout()}}},r=n(41),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("div",{staticClass:"w-100 flex-align-center p-22px"},[l("div",{staticClass:"userAvatarMenu mr-13px"},[t.$auth.user.photo?l("img",{attrs:{width:"40px",src:t.$auth.user.photo}}):l("div",{staticClass:"not-avatar"},[t._v("\n                 "+t._s(t.$auth.user.name.slice(0,1).toUpperCase())+"\n            ")])]),t._v(" "),l("div",{staticClass:"d-flex flex-column f-13 f-bold"},[l("div",{staticClass:"mb-4px text-gray"},[t._v("\n                "+t._s(t.$auth.user.name)+" | "),l("span",{staticClass:"text-main"},[t._v(" "+t._s(t.$auth.user.coin||0))]),t._v(" Tokens\n            ")]),t._v(" "),l("div",{staticClass:"flex-align-center"},[l("div",{staticClass:"f-bold text-main"},[t._v("\n                    "+t._s(t.$auth.user.email)+"\n                ")])])])]),t._v(" "),l("div",{staticClass:"w-100 d-flex flex-column profileMenuList"},t._l(t.menus,(function(e){return l("b-link",{key:e.id,staticClass:"profileMenuItem ",class:e.id===t.activeMenu?"activeMenu":"text-gray",attrs:{to:e.url}},[l("span",{staticClass:"f-12"},[t._v(t._s(e.text))])])})),1),t._v(" "),l("div",{staticClass:"w-100 d-flex flex-column profileActions mt-15px"},[l("div",{staticClass:"btnWrap"},[l("button",{staticClass:"btn",attrs:{type:"button"},on:{click:function(e){return t.$router.push("/member/quan-ly-tai-chinh?tab=1")}}},[l("img",{staticClass:"btn-icon mr-5px",attrs:{src:n(412)}}),t._v("\n                Nạp thêm Token\n            ")])]),t._v(" "),l("div",{staticClass:"btnWrap"},[l("button",{staticClass:"btn logoutBtn",attrs:{type:"button"},on:{click:t.logout}},[l("img",{staticClass:"btn-icon mr-5px",attrs:{src:n(413)}}),t._v("\n                Đăng xuất\n            ")])])])])}),[],!1,null,null,null);e.default=component.exports},584:function(t,e,n){"use strict";n.r(e);var l={middleware:"auth",components:{},data:function(){return{}},mounted:function(){},methods:{}},r=n(41),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Header"),t._v(" "),n("section",{staticClass:"wrapSection pt-30px pb-80px",attrs:{id:"editProfileMember"}},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("div",{staticClass:"d-flex"},[n("div",{staticClass:"profileMenuInfoWrap mr-20px"},[n("ProfileMenu",{attrs:{activeMenu:"3"}})],1),t._v(" "),n("div",{staticClass:"flex-1 profileInfoWrap"},[n("ProfileFinanceManage")],1)])])])])]),t._v(" "),n("Footer")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Header:n(119).default,ProfileMenu:n(418).default,ProfileFinanceManage:n(568).default,Footer:n(97).default})}}]);