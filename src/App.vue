<script>

import {SpotifyController} from "./components/intercraSystemCode/controllers/SpotifyController";

export default {
  name: "App",

  created() {
    console.log(document.documentURI)
    if(!document.documentURI.includes("expires_in=3600")){
      if(document.documentURI.includes("access_token=")){
        let parser = document.documentURI.replace("&token_type=", ";;;").replace("access_token=", ";;;");
        let token = parser.split(";;;")[1];
        console.log("yt token: " + token)
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

        window.open("https://intercra.com", '_self');
      }else{
        //window.open("https://intercra.com", "_self");
      }
    }else{
      if(document.documentURI.includes("access_token=")){
        this.$notify("successfully logged into spotify");
        let parser = document.documentURI.replace("&token_type=", ";;;").replace("access_token=", ";;;");
        let token = parser.split(";;;")[1];
        console.log("token: " + token)
        this.$cookies.set("token", token);
        let route = this.$router.resolve({path: '/'});
        window.open("https://intercra.com", '_self');
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
