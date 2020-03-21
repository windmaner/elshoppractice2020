<template>
  <div class="dachbroad">
      <Navbar></Navbar>
      <Alert></Alert>
      <Siderbar></Siderbar>

    <div class="container-fluid">
      <div class="row">
       
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>> 

<script>
import Siderbar from './siderbar'
import Navbar from './navbar'
import Alert from './AlertMessage'
import Pagination from './pagination'

export default {
    components:{
        Siderbar,
        Navbar,
        Alert,
        Pagination
    }
}
</script>

