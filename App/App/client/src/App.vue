<template>
  <div id="app">
    <Header title="Music.O"/>
    <Content/>
    <Footer/>
  </div>
</template>

<script>
import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";


export default {
  name: "app",
  components: { Header, Content, Footer}
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}
body {
  margin: 0;
}

#app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>