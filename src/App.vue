<template>
  <header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-white fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">{{ Title }}</router-link>
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
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/QuestionSetting"
                >QuestionSetting</router-link
              >
            </li>
          </ul>
        </div>
      </div>
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
      Title: "Watsdinner",
    };
  },
};
</script>
<style>

</style>