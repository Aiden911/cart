<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">×</button>
        
        <h2 class="modal-title">訂單商品</h2>
        
        <!-- 訂單商品列表 -->
        <div class="order-items">
          <div class="order-header">
            <div>商品圖片</div>
            <div>商品名稱</div>
            <div>數量</div>
            <div>單價</div>
            <div>總金額</div>
            <div></div>
          </div>

          <div v-for="(item, index) in cartItems" :key="item.id" class="order-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-name">{{ item.name }}</div>
            <div class="item-quantity">{{ item.quantity }}</div>
            <div class="item-price">NT${{ item.price }}</div>
            <div class="item-total">NT${{ item.price * item.quantity }}</div>
            <button class="remove-btn" @click="removeItem(index)">×</button>
          </div>

          <div class="order-total">
            <span>結帳金額：</span>
            <span>NT${{ total }}</span>
          </div>
        </div>

        <!-- 訂購表單 -->
        <h2 class="modal-title">訂購資料</h2>
        <form @submit.prevent="handleSubmit" class="form-wrapper">
          <div class="form-group">
            <label>
              <span class="required">*</span>姓名：
            </label>
            <input
              type="text"
              v-model="formData.name"
              :class="{ 'input-error': errors.name }"
              @focus="clearError('name')"
              @input="validateField('name')"
              placeholder="請輸入姓名"
            />
            <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label>
              <span class="required">*</span>電子信箱：
            </label>
            <input
              type="email"
              v-model="formData.email"
              :class="{ 'input-error': errors.email }"
              @focus="clearError('email')"
              @input="validateField('email')"
              placeholder="請輸入電子信箱"
            />
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label>
              <span class="required">*</span>聯絡電話：
            </label>
            <input
              type="tel"
              v-model="formData.phone"
              :class="{ 'input-error': errors.phone }"
              @focus="clearError('phone')"
              @input="validateField('phone')"
              placeholder="請輸入手機號碼"
            />
            <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <label>
              <span class="required">*</span>收件地址：
            </label>
            <input
              type="text"
              v-model="formData.address"
              :class="{ 'input-error': errors.address }"
              @focus="clearError('address')"
              @input="validateField('address')"
              placeholder="請輸入收件地址"
            />
            <span class="error-message" v-if="errors.address">{{ errors.address }}</span>
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="submit-btn"
              :disabled="!isFormValid || cartItems.length === 0"
              :class="{ 'btn-disabled': !isFormValid || cartItems.length === 0 }"
            >
              訂單提交
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutModal',
  props: {
    cartItems: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  },
  mounted() {
    // 禁用背景滾動
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    // 組件卸載前恢復滾動
    document.body.style.overflow = ''
  },
  computed: {
    isFormValid() {
      return this.formData.name.trim() &&
             this.formData.email.trim() &&
             this.validateEmail(this.formData.email) &&
             this.formData.phone.trim() &&
             this.validatePhone(this.formData.phone) &&
             this.formData.address.trim() &&
             !this.errors.name &&
             !this.errors.email &&
             !this.errors.phone &&
             !this.errors.address
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    },
    validatePhone(phone) {
      const re = /^09\d{8}$/
      return re.test(phone)
    },
    validateField(field) {
      switch (field) {
        case 'name':
          if (!this.formData.name.trim()) {
            this.errors.name = '請輸入姓名'
          } else {
            this.errors.name = ''
          }
          break
        case 'email':
          if (!this.formData.email.trim()) {
            this.errors.email = '請輸入電子信箱'
          } else if (!this.validateEmail(this.formData.email)) {
            this.errors.email = '請輸入有效的電子信箱'
          } else {
            this.errors.email = ''
          }
          break
        case 'phone':
          if (!this.formData.phone.trim()) {
            this.errors.phone = '請輸入聯絡電話'
          } else if (!this.validatePhone(this.formData.phone)) {
            this.errors.phone = '請輸入有效的手機號碼（格式：0912345678）'
          } else {
            this.errors.phone = ''
          }
          break
        case 'address':
          if (!this.formData.address.trim()) {
            this.errors.address = '請輸入收件地址'
          } else {
            this.errors.address = ''
          }
          break
      }
    },
    validateForm() {
      let isValid = true
      
      this.validateField('name')
      this.validateField('email')
      this.validateField('phone')
      this.validateField('address')

      if (Object.values(this.errors).some(error => error !== '')) {
        isValid = false
      }

      return isValid
    },
    clearError(field) {
      this.errors[field] = ''
    },
    removeItem(index) {
      this.$emit('remove-item', index)
    },
    closeModal() {
      document.body.style.overflow = '' // 關閉 modal 時恢復滾動
      this.$emit('close')
    },
    handleSubmit() {
      if (this.cartItems.length === 0) {
        return;
      }

      if (!this.validateForm()) {
        alert('請填寫完整的訂購資料');
        return;
      }

      this.$emit('submit', {
        orderItems: this.cartItems,
        totalAmount: this.total,
        customerInfo: { ...this.formData }
      });

      this.resetForm();
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
      this.errors = {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  overflow: hidden;

  .modal-container {
    position: relative;
    background: white;
    width: 90%;
    max-width: 800px;
    border-radius: 8px;
    max-height: 90vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; // 增加 iOS 滾動順暢度

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 30px;
      height: 30px;
      border: none;
      background: none;
      font-size: 24px;
      color: #333;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.3s ease;
      z-index: 1;

      &:hover {
        color: #ff4757;
      }
    }

    .modal-content {
      padding: 2rem;

      .modal-title {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
        font-size: 24px;
      }

      .order-items {
        margin-bottom: 3rem;

        .order-header {
          display: grid;
          grid-template-columns: 100px 2fr 1fr 1fr 1fr 50px;
          background: #14183e;
          color: white;
          padding: 1rem;
          text-align: center;
          font-size: 15px;
        }

        .order-item {
          display: grid;
          grid-template-columns: 100px 2fr 1fr 1fr 1fr 50px;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #eee;
          text-align: center;

          .item-image {
            width: 80px;
            height: 80px;
            margin: 0 auto;
            background: #fff;
            border: 1px solid #eee;
            border-radius: 4px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .remove-btn {
            background: none;
            border: none;
            color: #ff4757;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            
            &:hover {
              color: #ff0000;
            }
          }
        }

        .order-total {
          text-align: right;
          padding: 1rem;
          font-size: 1.2rem;
          font-weight: bold;
        }
      }

      .form-wrapper {
        max-width: 600px;
        margin: 0 auto;

        .form-group {
          margin-bottom: 1.5rem;
          
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 15px;
            color: #333;

            .required {
              color: #ff4757;
              margin-right: 4px;
            }
          }

          input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 15px;

            &.input-error {
              border-color: #ff4757;
            }

            &:focus {
              outline: none;
              border-color: #00a9ff;
            }

            &::placeholder {
              color: #999;
            }
          }

          .error-message {
            color: #ff4757;
            font-size: 13px;
            margin-top: 4px;
            display: block;
          }
        }
      }

      .form-actions {
        text-align: center;
        margin-top: 2rem;
        margin-bottom: 1rem;

        .submit-btn {
          background: #00a9ff;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 0.75rem 3rem;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;

          &:hover {
            background: #0088cc;
          }

          &.btn-disabled {
            background: #cccccc;
            cursor: not-allowed;

            &:hover {
              background: #cccccc;
            }
          }

          &:disabled {
            background: #cccccc;
            cursor: not-allowed;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .modal-overlay {
    .modal-container {
      width: 95%;
      padding: 1rem;

      .modal-content {
        padding: 1rem;

        .order-items {
          .order-header,
          .order-item {
            grid-template-columns: 80px 1.5fr 1fr 1fr 1fr 40px;
            font-size: 14px;
          }

          .item-image {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 480px) {
  .modal-overlay {
    .modal-container {
      width: 100%;
      height: 100%;
      border-radius: 0;

      .modal-content {
        .order-items {
          overflow-x: auto;

          .order-header {
            grid-template-columns: 60px 1.5fr 1fr 1fr 1fr 40px;
            font-size: 12px;
            min-width: 500px;
          }

          .order-item {
            grid-template-columns: 60px 1.5fr 1fr 1fr 1fr 40px;
            font-size: 12px;
            min-width: 500px;

            .item-image {
              width: 50px;
              height: 50px;
            }
          }
        }

        .form-wrapper {
          padding: 0 1rem;
        }
      }
    }
  }
}
</style>