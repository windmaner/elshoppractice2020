<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-secondary m-4" @click="openModel(true)">建立新的產品</button>
    </div>
    <table class="table table-secondary">
      <thead>
        <th>分類</th>
        <th>產品名稱</th>
        <th>原價</th>
        <th>售價</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td width="60">{{item.category}}</td>
          <td width="160">{{item.title}}</td>
          <td class="text-right" width="60">{{item.origin_price}}</td>
          <td class="text-right" width="60">{{item.price}}</td>
          <td width="60">
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td width="60">
            <button class="btn btn-outline-info btn-sm" @click="openModel(false,item)">編輯</button>
            <button class="btn btn-outline-info btn-sm" @click="removeModel(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @changePage='getProducts'></pagination>
    <!-- Modal -->
    <div
      class="modal fade"
      id="productsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="temProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.uploadingImage"></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    :src="temProduct.imageUrl"
                    @change="updateFile"
                  />
                </div>
                <img :src="temProduct.imageUrl" class="img-fluid" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="temProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="temProduct.category"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="temProduct.unit"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="temProduct.origin_price"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="temProduct.price"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="temProduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="temProduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="temProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateProducts">確認</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import $ from "jquery";
import pagination from "./pagination"

export default {
  components:{
    pagination,
  },
  data() {
    return {
      products: [],
      pagination:{},
      temProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        uploadingImage: false
      }
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.API}/admin/products?page=${page}`
      vm.isLoading = true;
      this.$http
        .get(api)
        .then(response => {
          vm.isLoading = false;
          // console.log(response.data);
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
            console.log('開啟');
        });
    },
    openModel(isNew, item) {
      if (isNew) {
        this.temProduct = {};
        this.isNew = true;
      } else {
        this.temProduct = Object.assign({}, item);
        console.log(this.temProduct, item);
        this.isNew = false;
      }
      $("#productsModal").modal("show");
    },
    updateProducts() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.API}/admin/product`;
      let httpMethod = "post";
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.API}/admin/product/${vm.temProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.temProduct }).then(response => {
        vm.isLoading = true;
        // console.log(response.data);
        if (response.data.success) {
          $("#productsModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productsModal").modal("hide");
          console.log("上傳產品資料失敗");
          vm.getProducts();
        }
      });
    },
    removeModel(item) {
      console.log(item);
      const vm = this;
      let api = `${process.env.APIPATH}/api/${proescs.env.API}/admin/product/${item.id}`;
      vm.temProduct = Object.assign({}, item);
      this.$http.delete(api).then(response => {
        // console.log(response.data);
        if (response.data.success) {
          vm.getProducts();
        } else {
          console.log("刪除產品資料失敗");
          vm.getProducts();
        }
      });
    },
    updateFile() {
      // console.log(this)
      const vm = this;
      const file = this.$refs.files.files[0];
      // console.log(file)
      const formData = new FormData();
      formData.append("up-load-file", file);
      const url = `${process.env.APIPATH}/api/${process.env.API}/admin/upload`;
      vm.status.uploadingImage = true;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          // console.log(response.data)
          vm.status.uploadingImage = false;

          if (response.data.success) {
            console.log(vm.$bus);
            console.log("成功");
            vm.$set(vm.temProduct, "imageUrl", response.data.imageUrl);
          } else {
            console.log("失敗");
            vm.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>