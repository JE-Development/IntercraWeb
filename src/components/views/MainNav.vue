<template>
<div class="nav">
  <SocialMediaPopup :show="smShow" @close="closeSmPopup"/>
  <LoginPopup :show="loginShow" @close="closeLoginPopup" @login="useLogin"/>
  <CreateUsername :show="usernameShow" @close="closeUsernamePopup" @created="createdUsername"/>
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
            <h3 class="nav-module center-horizontal complementary-color" @click="suggestions">Suggestions/Reports</h3>
            <div style="width: 40px"></div>
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
import CreateUsername from "../views/CreateUsernamePopup.vue";

export default {
  name: "MainNav",
  components: {CreateUsername, SocialMediaPopup, LoginPopup},

  data(){
    return{
      smShow: false,
      loginShow: false,
      usernameShow: false,
      isLogin: false,
      email: "",
    }
  },

  created() {


    if(this.getCookies("google_email") === null){
      this.isLogin = false
    }else{
      this.isLogin = true
      this.checkBlocked()
    }
  },

  mounted() {
    /*if(this.getCookies("google_email") === null) {
      console.log("in google one tap")
      googleOneTap({autoLogin: true})
          .then((response) => {
            this.handleResponse(response)
          })
          .catch((error) => {
            console.log("Handle the error", error)
          })
    }*/
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
      this.$cookies.remove("google_username")
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
      const userData = decodeCredential(response.credential)
      this.email = userData.email
      let fc = new FirebaseController()
      fc.getUsers().then((data) =>{
        if(data === null){
          this.usernameShow = true
        }else{
          if(this.formatEmail(this.email) in data){
            this.getUsername()
            this.saveLogin()
          }else{
            this.usernameShow = true
          }
        }
      })
    },
    closeUsernamePopup(){
      this.usernameShow = false
    },
    createdUsername(username){
      //console.log("callback: ", userData)
      this.saveLogin()

      this.usernameShow = false
      let fc = new FirebaseController()

      fc.createUser(this.formatEmail(this.email), username, "false")

    },
    formatEmail(email){
      email = email.replace(/\./g, "(dot)");
      email = email.replace("@", "(at)");
      return email
    },
    formatBackEmail(email){
      email = email.replace(/\(dot\)/g, ".").replace(/\(at\)/g, "@");
      return email
    },

    saveLogin(){
      this.setCookies("google_email", this.email)
      this.isLogin = true
      this.checkBlocked()
    },
    checkBlocked(){
      this.email = this.getCookies("google_email")
      this.email = this.formatEmail(this.email)
      let fc = new FirebaseController()
      fc.getUser(this.email).then((data) => {
        if(data.blocked === undefined){
          this.$notify("This account is blocked")
          this.click5()
        }
      })
    },
    getUsername(){
      let fc = new FirebaseController()
      fc.getUser(this.formatEmail(this.email)).then((data) => {
        this.setCookies("google_username", data.username)
      })
    }
  }

}
</script>