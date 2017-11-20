<template>
  <div id="app">
  <div id='container'>
  <section class='header'>
        <section>
            <h1 id='logo'><a href=''>KNOTRA</a></h1>
        </section>
        <section id='login' v-if="checkLogin">
        <section id="searchform">
                <form>
                    <label for="search">Search</label>
                    <input type="text" class="search-control" id="search" required name="search" tabindex="1" placeholder="search">
                </form>
            </section>
            <section id='logout'>
                <form id="logoutform">
                    <button tabindex="1" id="logout-submit" type="submit" class="btn btn-success">Logout</button>
                </form>
            </section>
        </section>
        <section id='login' v-else>
        
        </section>
        </section>
        <router-view/>
        <div id='menu-outer'>
  <div class='table'>
    <ul id='horizontal-list'>
        <li> <a href='#'>Home</a></li>
        <li> <a href='#/about'>About</a></li>
        <li> <a href='#/contact'>Contact</a></li>
    </ul>
  </div>
  <div id='copyright'><small>&copy; Copyright 2017, KNOTRA</small></div>
</div>
  </div>
    <!-- <img src="./assets/logo.png">
    <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data: {
    isLoggedIn: false
  },
  /* data () {
    return {
      isLoggedIn: false
    }
  }, */
  methods: {
    checkLogin: function () {
      this.isLoggedIn = true
      return this.isLoggedIn
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#container {
    display: block;
    width: 100%;
    /* max-width: 1345px; */
    margin: 0 0;
    padding: 0 0;
    background: #ffffff;
  }
  
  @media only screen and (max-width:1345px) {
    #container {
        width: 1345px;
        /* margin: 0 3%; */
    }
  }

  #logoutform #searchform {
    margin: 0px 0 5px 10px;
    text-align: right;
}

#search {
    line-height: 16px;
    font-weight: 400;
    color: rgba(0,0,0,0.85);
    font-size: 13px;
    display: inline-block;
    width: 216px;
    height: 32px;
    margin: 10px 8px 10px 0;
    padding: 0 10px;
    /* background: #f3f6f8; */
    background: #d6d9dd;
    /* border: 1px solid #b3b6b9; */
    /* border: 1px solid #d6d9dd; */
    /* border-radius: 2px; */
}

#logout-submit {
    line-height: 24px;
    /* color: #fff; */
    color: #d6d9dd;
    font-size: 17px;
    font-weight: 400;
    display: inline-block;
    width: auto;
    height: 32px;
    margin: 10px 0 0;
    padding: 0 20px;
    background-color: transparent;
    /* border: 1px solid #fff; */
    /* border: 1px solid d6d9dd ; */
    /* border-radius: 2px; */
}

.header {
    display: inline-block;
    width: 100%;
    font-size: 0;
    line-height: 0;
    margin: 0 auto;
    padding: 0;
    background: #2f94a1;
    color: #ffffff;
}

.header #login #searchform {
    width: 30%;
    float: left;
}

.header #login #logout {
    width: 70%;
    float: right;
}

.header #login {
    width: 90%;
    float: right;
}

#logout-submit {
    width: 10%;
    float: right;
    /*margin: 0 10px 0 0;*/
}

/* .header #login #searchform {
    width: 50%;
    float: right;
}

.header #login #logout {
    width: 50%;
    float: right;
} */

  #logo {
    font-family: 'AR CENA', sans-serif;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;
    /*color: #010000;*/
    margin: 10px 0 5px 10px;
    padding: 0;
    display: block;
    width: 90px;
    /* color: white; */
    color: #d6d9dd;
    float: left;
  }

  #logo a {
    text-decoration: none;
    /* color: white; */
    color: #d6d9dd;
  }

    #menu-outer {
    /*height: 84px;*/
    /*background: url(images/bar-bg.jpg) repeat-x;*/
    width: 100%;
    font-size: 0;
    /*line-height: 50px;*/
    padding: 0;
    background: #2f94a1;
    color: #ffffff;
  }
  
  #menu-outer .table ul#horizontal-list {
    /* min-width: 696px; */
    /* width: 100%; */
    list-style: none;
    padding: 20px 0 20px 0;
    text-align: center;
  }

  #menu-outer .table ul#horizontal-list li {
    display: inline-flex;
    /* margin: 0 auto 0 auto; */
    
    /* margin: 0 0 0 50px; */
    padding: 0 0 0 5%;
    text-align: center;
  }

  #menu-outer .table ul#horizontal-list li a {
    text-decoration: none;
    color: white;
    font-size: 15px;
    
  }

  #menu-outer #copyright small {
    color: black;
    float: right;
    font-size: 12px;
    margin: 0 10px;
  }

</style>
