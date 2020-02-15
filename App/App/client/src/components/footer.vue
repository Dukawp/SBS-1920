<template>
  <footer class="footer">
    <span class="texto">The Best Aplication for Musics</span>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}
.texto {
  align-content: center;
  color: black;
  font-size: 14px;
}
</style>
