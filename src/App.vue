<template>
  <header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-light bg-white fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ Title }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/watsdinner">Watsdinner</router-link>
            </li>
                        <li class="nav-item">
              <router-link class="nav-link" to="/QuestionSetting">QuestionSetting</router-link>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </header>

  <!-- Begin page content -->
  <div class="container" style="padding-top:60px">
    <router-view/>
  </div>
</template>
<script>
export default {
  data:()=>{
    return {
      "Title":"Watsdinner"
    }
  }
}
</script>
    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>