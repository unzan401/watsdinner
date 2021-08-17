<template>
  <header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-white fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/" style="font-family: 'Noto Serif TC', serif;"><img src="/favicon.ico" alt="吃什麼logo" style="height:30px;width:30px;vertical-align: bottom;">{{ Title }}</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
          <router-link class="nav-link text-light" to="/QuestionSetting" style="margin-right:50px
          " >login</router-link>

    </nav>
  </header>

  <!-- Begin page content -->
  <div class="container" style="padding-top: 60px">
    <router-view />
  </div>

</template>
<script>
export default {
  data: () => {
    return {
      Title: "吃什麼？",
    };
  },
};
</script>
<style>

</style>