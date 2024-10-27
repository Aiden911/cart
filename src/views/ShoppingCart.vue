<template>
  <div class="shopping">
    <!-- 導航欄 -->
    <nav class="nav">
      <div class="container">
        <div class="nav-content">
          <button class="cart-btn" @click="showCart = true">
            <img src="@/assets/image/car.png" alt="cart" class="cart-icon" />
            購物車
            <span class="cart-count" v-if="cartItems.length">{{
              cartItems.length
            }}</span>
          </button>
        </div>
      </div>

      <!-- 購物車彈窗 -->
      <div class="cart-modal" v-if="showCart" @click.self="showCart = false">
        <div class="cart-content">
          <div class="cart-header">
            <h3>購物車</h3>
            <button class="close-btn" @click="showCart = false">&times;</button>
          </div>

          <div class="cart-items" v-if="cartItems.length">
            <div
              class="cart-item"
              v-for="(item, index) in cartItems"
              :key="item.id"
            >
              <div class="item-image">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="item-info">
                <h4>{{ item.name }}</h4>
                <p>NT${{ item.price }}</p>
              </div>
              <div class="item-quantity">
                <button @click="updateQuantity(index, -1)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(index, 1)">+</button>
              </div>
              <button class="remove-btn" @click="removeFromCart(index)">
                ×
              </button>
            </div>
          </div>

          <div class="cart-empty" v-else>
            <p>購物車是空的</p>
          </div>

          <div class="cart-footer" v-if="cartItems.length">
            <div class="cart-total">
              <span>總計：</span>
              <span>NT${{ cartTotal }}</span>
            </div>
            <button class="checkout-btn" @click="checkout">訂單結帳</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="pin">
      <!-- 主要內容 -->
      <main class="main-content">
        <!-- Banner -->
        <div class="banner">
          <BnnerComponents />
        </div>

        <!-- 搜尋欄 -->
        <div class="search-wrapper">
          <div class="search-input-wrapper">
            <img
              src="@/assets/image/magnifier.png"
              alt="search"
              class="search-icon"
            />
            <input
              type="text"
              v-model="searchQuery"
              placeholder="搜尋商品"
              class="search-input"
            />
          </div>
        </div>

        <!-- 商品列表 -->
        <div class="product-wrapper">
          <div class="product-grid">
            <div
              class="product-item"
              v-for="product in filteredProducts"
              :key="product.id"
            >
              <div class="product-img">
                <img :src="product.image" :alt="product.name" />
                <span class="status-tag">{{ product.status }}</span>
                <div class="product-overlay">
                  <div class="overlay-content">
                    <h3>{{ product.name }}</h3>
                    <p class="product-description">{{ product.description }}</p>
                  </div>
                  <button class="add-to-cart" @click.stop="addToCart(product)">
                    <img
                      src="@/assets/image/car.png"
                      alt="cart"
                      class="cart-icon"
                    />
                    加入購物車
                  </button>
                </div>
              </div>
              <div class="product-content">
                <h3 class="product-title">{{ product.name }}</h3>
                <p class="product-price">NT${{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterComponents />
    </div>

    <CheckoutModal
      v-if="showCheckoutModal"
      :cart-items="cartItems"
      :total="cartTotal"
      @close="handleCloseCheckoutModal"
      @submit="handleOrderSubmit"
      @remove-item="handleRemoveItem"
    />

    <CustomAlert
      :show="showAlert"
      :title="alertTitle"
      :message="alertMessage"
      :confirm-text="alertConfirmText"
      :type="alertType"
      @close="handleAlertClose"
    />
  </div>
</template>

<script>
import FooterComponents from "@/components/FooterComponents.vue";
import BnnerComponents from "@/components/BnnerComponents.vue";
import CheckoutModal from "@/components/CheckoutModal.vue";
import CustomAlert from "@/components/CustomAlert.vue";

export default {
  name: "ShoppingCart",
  components: {
    FooterComponents,
    BnnerComponents,
    CheckoutModal,
    CustomAlert,
  },
  data() {
    return {
      showCart: false,
      showCheckoutModal: false,
      searchQuery: "",
      cartItems: [],
      showAlert: false,
      alertTitle: "",
      alertMessage: "",
      alertConfirmText: "確定",
      alertType: "",
      products: [
        {
          id: 1,
          name: "經典咖啡杯",
          price: 150,
          description:
            "經典設計的陶瓷咖啡杯，容量300ml，適合日常使用，享受美好咖啡時光。",
          status: "現貨",
          image: require("@/assets/image/coffercup.png"),
        },
        {
          id: 2,
          name: "無線滑鼠",
          price: 500,
          description:
            "符合人體工學設計的無線滑鼠，擁有穩定的光學感應和10米的無線範圍，長時間使用舒適。",
          status: "現貨",
          image: require("@/assets/image/mouse.png"),
        },
        {
          id: 3,
          name: "藍牙耳機",
          price: 1200,
          description:
            "高音質藍牙耳機，配備藍牙5.0技術，10小時續航，支持語音助手，輕鬆連接。",
          status: "現貨",
          image: require("@/assets/image/earphone.png"),
        },
        {
          id: 4,
          name: "雙肩背包",
          price: 850,
          description:
            "防水耐用的雙肩背包，20L容量，內含筆電隔層，適合日常通勤或旅行攜帶。",
          status: "現貨",
          image: require("@/assets/image/bag.png"),
        },
        {
          id: 5,
          name: "環保保溫杯",
          price: 300,
          description:
            "不鏽鋼製環保保溫杯，500ml容量，8小時保溫，攜帶方便，隨時享受熱飲。",
          status: "現貨",
          image: require("@/assets/image/thermoscup.png"),
        },
        {
          id: 6,
          name: "便攜式充電寶",
          price: 600,
          description:
            "10000mAh容量的便攜充電寶，支持快速充電，輕便設計，適合外出時隨身攜帶。",
          status: "現貨",
          image: require("@/assets/image/powerbank.png"),
        },
      ],
    };
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    filteredProducts() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) return this.products;

      return this.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.price.toString().includes(query) ||
          product.status.toLowerCase().includes(query)
        );
      });
    },
  },
  methods: {
    showCustomAlert(
      title,
      message = "",
      confirmText = "確定",
      type = "success"
    ) {
      this.alertTitle = title;
      this.alertMessage = message;
      this.alertConfirmText = confirmText;
      this.alertType = type;
      this.showAlert = true;
    },

    handleAlertClose() {
      this.showAlert = false;
    },

    addToCart(product) {
      const existingItem = this.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      // 只顯示提示，不打開購物車
      this.showCustomAlert("已加入購物車", "", "確定", "success");
    },

    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      if (this.cartItems.length === 0) {
        this.showCart = false;
      }
      // 購物車中刪除不顯示提示
    },

    updateQuantity(index, change) {
      const item = this.cartItems[index];
      const newQuantity = item.quantity + change;

      if (newQuantity > 0) {
        item.quantity = newQuantity;
      } else {
        this.removeFromCart(index);
      }
    },

    checkout() {
      if (this.cartItems.length === 0) {
        this.showCustomAlert(
          "購物車是空的",
          "請先將商品加入購物車",
          "確定",
          "warning"
        );
        return;
      }
      this.showCart = false;
      this.showCheckoutModal = true;
    },

    handleCloseCheckoutModal() {
      this.showCheckoutModal = false;
      if (this.cartItems.length > 0) {
        this.showCart = true;
      }
    },

    handleOrderSubmit(orderData) {
      console.log("訂單資料：", orderData);
      this.showCheckoutModal = false;
      this.cartItems = [];
      this.showCustomAlert(
        "訂單已成功提交！",
        "感謝您的購買",
        "確定",
        "success"
      );
    },

    handleRemoveItem(index) {
      this.cartItems.splice(index, 1);
      if (this.cartItems.length === 0) {
        this.showCheckoutModal = false;
      }
      // 訂購單頁面刪除時顯示提示
      this.showCustomAlert("已移除商品", "", "確定", "success");
    },
  },
};

</script>

<style lang="scss" scoped>
.shopping {
  width: 100%;

  // 導航欄
  .nav {
    width: 100%;
    height: 60px;
    background-color: #14183e;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    .container {
      width: 99%;
      height: 100%;

      .nav-content {
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .cart-btn {
          background-color: #00a9ff;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 8px 20px;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.3s ease;
          position: relative;

          &:hover {
            background-color: #0088cc;
          }

          .cart-icon {
            width: 20px;
            height: 20px;
            object-fit: contain;
          }

          .cart-count {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #ff4757;
            color: white;
            font-size: 12px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }

  // 購物車彈窗
  .cart-modal {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: flex-end;
    z-index: 1001;

    .cart-content {
      width: 30%;
      min-width: 300px;
      height: 90%;
      background-color: #14183e;
      padding: 2%;
      border-radius: 0 0 25px 25px;
      color: white;
      display: flex;
      flex-direction: column;

      .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        h3 {
          margin: 0;
          font-size: 1.2rem;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          opacity: 0.7;

          &:hover {
            opacity: 1;
          }
        }
      }

      .cart-items {
        flex: 1;
        overflow-y: auto;
        margin: 20px 0;

        .cart-item {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);

          .item-image {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            overflow: hidden;
            background: #fff;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .item-info {
            flex: 1;
            padding: 0 15px;

            h4 {
              margin: 0 0 5px;
              font-size: 14px;
            }

            p {
              margin: 0;
              color: #00a9ff;
              font-size: 14px;
            }
          }

          .item-quantity {
            display: flex;
            align-items: center;
            gap: 10px;

            button {
              width: 24px;
              height: 24px;
              border: none;
              background: rgba(255, 255, 255, 0.1);
              color: white;
              border-radius: 4px;
              cursor: pointer;

              &:hover {
                background: rgba(255, 255, 255, 0.2);
              }
            }

            span {
              min-width: 20px;
              text-align: center;
            }
          }

          .remove-btn {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            padding: 0 10px;
            cursor: pointer;
            opacity: 0.7;

            &:hover {
              opacity: 1;
            }
          }
        }
      }

      .cart-empty {
        text-align: center;
        padding: 40px 0;
        color: rgba(255, 255, 255, 0.6);
      }

      .cart-footer {
        margin-top: auto;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: bold;
        }

        .checkout-btn {
          width: 100%;
          background-color: #00a9ff;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 12px 20px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #0088cc;
          }
        }
      }
    }
  }

  // 主要內容區
  .main-content {
    width: 100%;
    padding-top: 60px;

    .banner {
      width: 100%;
      max-width: 1920px;
      margin: 5% auto;
    }

    .search-wrapper {
      width: 90%;
      margin: 0 auto 5%;
      display: flex;
      justify-content: center;

      .search-input-wrapper {
        position: relative;
        width: 40%;
        min-width: 280px;
        display: flex;
        justify-content: center;

        .search-icon {
          position: absolute;
          left: 8%;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .search-input {
          width: 80%;
          padding: 12px 12px 12px 40px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          font-size: 1rem;
          background: rgba(255, 252, 252, 0.1);
          color: white;

          &::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }

          &:focus {
            border-color: #00a9ff;
            outline: none;
          }
        }
      }
    }

    .product-wrapper {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto 10%;
      padding: 0 2%;

      .product-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 2%;

        .product-item {
          flex: 0 0 32%;
          margin-bottom: 2%;
          border-radius: 10px;
          overflow: hidden;
          background: transparent;
          transition: transform 0.3s ease;

          .product-img {
            width: 100%;
            aspect-ratio: 1;
            background: #fff;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: row;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            .status-tag {
              position: absolute;
              top: 0;
              left: 0;
              background: #28349c;
              padding: 2% 4%;
              border-radius: 10px 0 10px 0; 
              font-size: 12px;
              color: #fff;
              z-index: 2;
              transform-origin: left top;
              animation: tagAppear 0.5s ease-out;
              transition: all 0.3s ease;
              box-shadow: 0 0 10px rgba(20, 24, 62, 0.5);
            }

            .product-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(20, 24, 62, 0.9);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-evenly;
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;

              .overlay-content {
                padding: 20px;
                width: 70%;
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #fff;
                gap: 15px;

                h3 {
                  margin: 0;
                  text-align: center;
                }

                .product-description {
                  color: #fff;
                  font-size: 14px;
                  line-height: 1.5;
                  margin: 0;
                  text-align: start;
                  display: -webkit-box;
                  -webkit-line-clamp: 4;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                }
              }

              .add-to-cart {
                background-color: #fff;
                color: #000000;
                border: none;
                border-radius: 10px;
                padding: 8px 20px;
                font-size: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: background-color 0.3s ease;
                width: 70%;
                min-width: 120px;

                &:hover {
                  background-color: #0088cc;
                  color: #fff;
                }

                .cart-icon {
                  width: 16px;
                  height: 16px;
                  object-fit: contain;
                }
              }
            }
          }

          &:hover {
            transform: translateY(-5px);

            .product-overlay {
              opacity: 1;
              visibility: visible;
            }
          }

          .product-content {
            padding: 4%;

            .product-title {
              font-size: 16px;
              color: #fff;
              margin-bottom: 8px;
            }

            .product-price {
              font-size: 18px;
              color: #fff;
              font-weight: bold;
              margin: 0;
            }
          }
        }
      }
    }
  }

  // RWD
  @media screen and (max-width: 768px) {
    .nav {
      height: 50px;

      .cart-btn {
        padding: 6px 16px;
        font-size: 0.9rem;

        .cart-icon {
          width: 16px;
          height: 16px;
        }
      }
    }

    .cart-content {
      width: 50% !important;
    }

    .main-content {
      padding-top: 50px;

      .search-wrapper {
        .search-input-wrapper {
          .search-icon {
            width: 16px;
            height: 16px;
          }
        }
      }

      .product-wrapper {
        .product-grid {
          .product-item {
            flex: 0 0 49%;

            .product-img {
              .product-overlay {
                .overlay-content {
                  padding: 15px;

                  .product-description {
                    font-size: 12px;
                    line-height: 1.4;
                    -webkit-line-clamp: 3;
                  }
                }

                .add-to-cart {
                  padding: 6px 16px;
                  font-size: 12px;
                  min-width: 100px;

                  .cart-icon {
                    width: 14px;
                    height: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    .cart-content {
      width: 100% !important;
      border-radius: 0 !important;
    }

    .main-content {
      .product-wrapper {
        width: 95%;

        .product-grid {
          .product-item {
            flex: 0 0 100%;
          }
        }
      }

      .search-wrapper {
        width: 95%;

        .search-input-wrapper {
          width: 100%;
        }
      }
    }
  }
}

</style>
