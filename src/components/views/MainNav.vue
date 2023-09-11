<template>
<div class="nav">
  <SocialMediaPopup :show="smShow" @close="closeSmPopup"/>
  <LoginPopup :show="loginShow" @close="closeLoginPopup" @login="useLogin"/>
  <div class="nav-div center-horizontal">
    <h3 class="nav-module center-horizontal white" @click="click1">Intercra</h3>
      <div class="nav-space"></div>
    <h3 class="nav-module center-horizontal white" @click="click2">Privacy Policy / ToU</h3>
      <div class="nav-space"></div>
    <h3 class="nav-module center-horizontal white" @click="click3">Social Media</h3>
    <div class="nav-space"></div>
    <h3 class="nav-module center-horizontal white" v-if="!isLogin" @click="click4">Login</h3>
    <h3 class="nav-module center-horizontal white" v-else @click="click5">Logout</h3>
  </div>
</div>
    <div class="fullwidth center-horizontal">
        <div class="center-horizontal nav nav-sub">
            <h3 class="nav-module center-horizontal complementary-color" @click="suggestions">Suggestions</h3>
            <div style="width: 60px"></div>
            <h3 class="nav-module center-horizontal complementary-color" @click="ai">AI Images</h3>
        </div>
    </div>
</template>

<script>
import EventBus from "../intercraSystemCode/classes/EventBusEvent";
import SocialMediaPopup from "../views/SocialMediaPopup.vue";
import LoginPopup from "../views/LoginPopup.vue";
import router from "../../router";
import {decodeCredential, googleAuthCodeLogin, googleLogout, googleOneTap, googleTokenLogin} from "vue3-google-login";
import {FirebaseController} from "../intercraSystemCode/controllers/FirebaseController";

export default {
  name: "MainNav",
  components: {SocialMediaPopup, LoginPopup},

  data(){
    return{
      smShow: false,
      loginShow: false,
      isLogin: false,
    }
  },

  created() {
    EventBus.addEventListener('firebase-users', (event) => {
      console.log(event.data)
    })


    if(this.getCookies("google_email") === null){
      this.isLogin = false
    }else{
      this.isLogin = true
    }
  },

  mounted() {
    if(this.getCookies("google_email") === null) {
      console.log("in google one tap")
      googleOneTap({autoLogin: true})
          .then((response) => {
            this.handleResponse(response)
          })
          .catch((error) => {
            console.log("Handle the error", error)
          })
    }
  },



  methods: {
    getCookies(key){
      return this.$cookies.get(key);
    },
    setCookies(key, value){
      if(true){
        return this.$cookies.set(key, value, 2147483647);
      }
    },
    click1(){
      let route = this.$router.resolve({path: '/'});
      window.open(route.href, '_self')
    },
    click2(){
      window.location.href = "https://intercra.com/#/impressum";
    },
    click3(){
      //EventBus.emit("show-social-media")
      this.smShow = true;
    },
    click4(){
      //EventBus.emit("show-social-media")
      this.loginShow = true;
    },
    click5(){
      googleLogout()
      this.$cookies.remove("google_email")
      this.isLogin = false
    },
      suggestions(){
        router.push('/feedback');
      },
    ai(){
      router.push('/ai');
      },

    closeSmPopup(){
      this.smShow = false
    },
    closeLoginPopup(){
      this.loginShow = false
    },
    useLogin(response){
      this.closeLoginPopup()
      this.handleResponse(response)
    },
    handleResponse(response){
      /*
      email: userData.email
      name: userData.name
      profile picture: userData.picture
       */
      const userData = decodeCredential(response.credential)
      //console.log("callback: ", userData)
      this.setCookies("google_email", userData.email)
      this.isLogin = true
      let fc = new FirebaseController()
      fc.getUser("some")
    }
  }

}
</script>