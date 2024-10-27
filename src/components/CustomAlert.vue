// components/CustomAlert.vue
<template>
  <Transition name="fade">
    <div v-if="show" class="alert-overlay">
      <div class="alert-container">
        <div class="alert-content">
          <div class="alert-title">{{ title }}</div>
          <div class="alert-message" v-if="message">{{ message }}</div>
          <button class="alert-button" @click="handleConfirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'CustomAlert',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '確定'
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.alert-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 90%;
  width: 400px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

.alert-content {
  text-align: center;
}

.alert-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.alert-message {
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
}

.alert-button {
  background-color: #00a9ff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 30px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.alert-button:hover {
  background-color: #0088cc;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>