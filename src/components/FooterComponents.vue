<template>
  <footer class="footer">
    <section class="end-of-page">
      <div class="footer-waves">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g class="wave-group">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(135, 118, 246, 0.50)" />
            <use href="#gentle-wave" x="48" y="3" fill="#0FACF7" />
            <use href="#gentle-wave" x="48" y="5" fill="#002147" />
          </g>
        </svg>
      </div>
      <div class="footer-content">
        <div class="container">
          <div class="company-info">
            <h3>Aiden購物網</h3>
            <p>苗栗市中山路000號</p>
            <p>037-000-000</p>
          </div>
          <div class="copyright">
            <p>Copyright ©2024 [訊航科技公司] 測驗用. All rights reserved. 測驗內容僅限面試使用，未經授權不得轉載、分享或公開。</p>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: 'WaveFooter'
}
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.end-of-page {
  position: relative;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.footer-waves {
  position: relative;
  width: 100%;
  
  .waves {
    position: relative;
    width: 100%;
    height: 20vh;
    margin-bottom: -7px;
    min-height: 100px;
    max-height: 150px;
  }
}

.wave-group {
  width: 100%;
  
  use {
    width: 100%;
    animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
    
    &:nth-child(1) {
      animation-delay: -2s;
      animation-duration: 7s;
      opacity: 0.8;
    }
    
    &:nth-child(2) {
      animation-delay: -3s;
      animation-duration: 10s;
      opacity: 0.9;
    }
    
    &:nth-child(3) {
      animation-delay: -4s;
      animation-duration: 13s;
    }
  }
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

.footer-content {
  width: 100%;
  background: linear-gradient(to bottom, #052241 31%, #0B396A 100%);
  // padding: 3rem 5vw;
  box-sizing: border-box;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}

.company-info {
  text-align: center;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: normal;
  }
  
  p {
    margin: 0.5rem 0;
    font-size: 1rem;
    line-height: 1.5;
  }
}

.copyright {
  text-align: center;
  width: 100%;
  
  p {
    font-size: 0.875rem;
    line-height: 1.6;
    opacity: 0.8;
    margin: 0;
  }
}

@media screen and (max-width: 768px) {
  .box {
    height: 5vh;
  }
  
  .footer-waves .waves {
    height: 40px;
    min-height: 40px;
  }
  
  .footer-content {
    padding: 2rem 1rem;
    
    .container {
      gap: 1.5rem;
    }
  }
  
  .company-info {
    h3 {
      font-size: 1.25rem;
    }
    
    p {
      font-size: 0.875rem;
    }
  }
  
  .copyright p {
    font-size: 0.75rem;
  }
}
</style>