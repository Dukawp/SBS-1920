
<template>
  <div class="home">


     <b-row class="justify-content-center">
          <b-col>
          <b-form-input v-model="search" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button 
            size="sm" 
            class="mr-4 mt-4"
            variant="primary"
            @click="select_user_music(search)"
            type="submit">PlayList</b-button>
          <b-button 
            size="sm" 
            class="mr-4 mt-4"
            variant="primary"
            @click="select_user_similar(search)" 
            type="submit">Similar</b-button>
            <b-button 
              size="sm" 
              class="mr-4 mt-4"
              variant="primary"
              @click="select_user_friends(search)" 
              type="submit">Friends</b-button>
          
          </b-col>
          <b-col>
          </b-col>
          <b-col>
            <h3> Friends of {{search}}</h3>
              <select v-model="selected" >
                <option v-for="item in data.friends" :key="item" :value="item">{{item}}</option>
                </select>
          </b-col>
          <b-col>

            <b-button 
              size="sm" 
              class="mr-4 mt-4"
              variant="primary"
              @click="select_user_friendsMusic(selected)" 
              type="submit">Find</b-button>            
          </b-col>

          
          
     </b-row>
      
    
    <hr>
    <h2>PlayList of {{search}}</h2>
    
    
    <b-row class="lista row justify-content-center">
      <b-card
        v-for="(music, index) in data.listen"
        :key="index"
        :title="music.track"
        :img-src="music.url"
        img-alt="Card Image"
        img-top
        tag="article"
        style="width: 300px !important;"
        class="mr-4 mt-4"
      ></b-card>
    </b-row>

  <hr>
    <h2>Similar music of {{search}}</h2>
    
    
    <b-row class="lista row justify-content-center">
      <b-card
        v-for="(music, index) in data.similares"
        :key="index"
        :title="music.track"
        :img-src="music.url"
        img-alt="Card Image"
        img-top
        tag="article"
        style="width: 300px !important;"
        class="mr-4 mt-4"
      ></b-card>
    </b-row>

 



    

    <hr>
    <h2>Musics from {{selected}} ({{search}})</h2>
    <b-row class="lista row justify-content-center">
      <b-card
        v-for="(music, index) in data.musicf"
        :key="index"
        :title="music.track"
        :img-src="music.url"
        img-alt="Card Image"
        img-top
        tag="article"
        style="width: 300px !important;"
        class="mr-4 mt-4"
      ></b-card>
    </b-row>


  <hr>
    
    
    
    <h2>Top Music of {{selTrack}}</h2>
    <b-row class="lista row justify-content-center">
    <div v-if="data.tags">
    <b-row class="lista row justify-content-center">
         <h3> Top Tags </h3>
              <select v-model="selTrack" >
                <option v-for="item in data.tags" :key="item" :value="item">{{item}}</option>
                </select>
                <b-button 
              size="sm" 
              class="mr-4 mt-4"
              variant="primary"
              @click="select_user_getTrackByTag(selTrack)" 
              type="submit">Find</b-button>
    </b-row>
    </div>
    <div v-if="data.top">
    <b-row class="lista row justify-content-center">
      <b-card
          v-for="(music, index) in data.top"
          :key="index"
          :title="music.Track"
          :img-src="music.ImageURLTrack"
          img-alt="Card Image"
          img-top
          tag="article"
          style="width: 300px !important;"
          class="mr-4 mt-4"
        ></b-card>
      </b-row>
      </div>
    <div v-else>
              <b-button 
              size="sm" 
              class="mr-4 mt-4"
              variant="primary"
              @click="select_user_getTags()" 
              type="submit">See Tags</b-button>
    </div>
    </b-row>

  </div>
</template>

<script>
import axios from "axios";
import { ApiUrl } from "@/global";


export default {
  name: "home",
  data: function() {
    return {
      search: "",
      pics: [],
      data: [],
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb",
        class: "my-5"
      },
    };
  },
  methods: {
    select_user_music(user) {
      axios.get(`${ApiUrl}/music/${user}`).then( res => ( this.data = res.data ) );
    },
    select_user_similar(user) {
      axios.get(`${ApiUrl}/music/${user}/similar`).then( res => ( this.data = res.data ) );
    },
    select_user_friends(user) {
      axios.get(`${ApiUrl}/music/${user}/friends`).then( res => ( this.data = res.data ) );
    },
    select_user_friendsMusic(user) {
      axios.get(`${ApiUrl}/music/${user}/musicf`).then( res => ( this.data = res.data ) );
    },
    select_user_getTags() {
      axios.get(`${ApiUrl}/tags`).then( res => ( this.data = res.data ) );
    },
    select_user_getTrackByTag(genre) {
      axios.get(`${ApiUrl}/tags/${genre}`).then( res => ( this.data = res.data ) );
    }
  },
};
</script>

<style>
.images {
  padding: 2px;
  width: 150px !important;
  height: 150px !important;
}
.images:hover {
  cursor: hand;
  cursor: pointer;
  border: 2px solid black;
  border-color: green;
}
.imagem-grande {
  display: grid;
  align-content: center;
}
.p-4 {
  align-content: center;
}
.imagem-grande1 {
  height: 500px !important;
  width: 700px !important;
  display: flex;
}
.cont {
  height: 500px !important;
  width: 750px !important;
}
.but {
  align-content: center;
}
.imagem {
  height: 500px !important;
  width: 750px !important;
}
</style>
