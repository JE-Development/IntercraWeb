<script>

import {SpotifyController} from "./components/intercraSystemCode/controllers/SpotifyController";
import {GoogleController} from "./components/intercraSystemCode/controllers/GoogleController";

export default {
  name: "App",

  methods:{
    getCookie(name){
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");

      if (parts.length == 2) {
        return String(String(parts.pop()).split(";").shift());
      }
      return "null";
    }
  },

  created() {
    console.log(document.documentURI)
    if(!document.documentURI.includes("expires_in=3600")){
      if(document.documentURI.includes("access_token=")){
        let parser = document.documentURI.replace("&token_type=", ";;;").replace("access_token=", ";;;");
        let token = parser.split(";;;")[1];
        this.$cookies.set("token-youtube", token);
        let route = this.$router.resolve({path: '/'});

        let sc = new SpotifyController();

        let sl = false;

        console.log("here")

        if(this.$cookies.get("spotify_tracks") === "true") {

          sc.httpLibraryRequest(this.$cookies.get("token"), "test", "track", 10, 0, true).then(r =>
              sl = true
          );

        }
        this.$notify("successfully logged into youtube");
        window.open("https://intercra.com", '_self');
      }else{
        //window.open("https://intercra.com", "_self");
      }
    }else{
      if(document.documentURI.includes("access_token=")){
        let parser = document.documentURI.replace("&token_type=", ";;;").replace("access_token=", ";;;");
        let token = parser.split(";;;")[1];
        this.$cookies.set("token", token);
        this.$cookies.set("spotifyLogin", "true");
        let route = this.$router.resolve({path: '/'});

        if(this.getCookie("youtube_video") === "true" && this.getCookie("token-youtube") === "null"){
          let gc = new GoogleController();
          gc.login();
        }else{
          this.$notify("successfully logged into spotify");
          window.open("https://intercra.com", '_self');
        }

      }else{
        //window.open(document.baseURI, "_self");
      }
    }
  }
}
</script>

<template>

<MainPage/>
  <main>
    <div class="container my-3">
      <router-view />
      <notifications/>
    </div>
  </main>
</template>
