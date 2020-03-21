<template>
  <div class="pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{'disabled':!pages.has_pre}"
          @click="changePage(pages.current_page-1)"
        >
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pages.total_pages"
          :key="page"
          :class="{'active':pages.current_page == page}"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
        </li>
        <li
          class="page-item"
          :class="{'disabled':!pages.has_next}"
          @click="changePage(pages.current_page+1)"
        >
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name:"Pagination",   
  props: ["pages"],
  data() {
    return {

    };
  },
  methods: {
    changePage(page) {
      console.log(this.data)
      this.$emit("changePage", page);
    }
  }
};
</script>
