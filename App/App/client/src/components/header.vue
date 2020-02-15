<template>
  <header class="header">
    <h1 class="title">{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: #0080ff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  columns: #fff;
  text-decoration: none;
}
.header {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #4da6ff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  background-color: #4da6ff;
}
</style>