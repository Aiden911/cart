<template>
  <div class="wrapper">
    <section class="pinned-section">
      <div class="container">
        <div class="banner">
          <div class="image-container">
            <img
              src="@/assets/image/tv.png"
              alt="Image 1"
              class="first-image"
            />
            <img
              src="@/assets/image/poster.png"
              alt="Image 2"
              class="second-image"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTrigger: null,
    };
  },
  async mounted() {
    try {
      await this.loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
      );
      await this.loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
      );

      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);

        const firstImage = document.querySelector(".first-image");
        const secondImage = document.querySelector(".second-image");

        // 創建主時間軸
        const tl = window.gsap.timeline({
          scrollTrigger: {
            trigger: ".pin",
            start: "5% 60px",
            end: "+=150%",
            pin: true,
            pinSpacing: false,
            scrub: 1.5,
            anticipatePin: 1,
            // markers:true,
          },
        });
        

        // 第一張圖片只放大，不變透明
        tl.set(firstImage, {
          opacity: 1,
          scale: 1,
          z: 0,
          transformOrigin: "center center",
        })
          .to(firstImage, {
            scale: 2.7,
            z: 1000,
            duration: 1,
            ease: "power1.in",
          })
          .to(firstImage, {
            opacity: 0,
            duration: 0.1,
            ease: "none",
          });

        // 第二張圖片在第一張放大到一定程度後出現
        tl.fromTo(
          secondImage,
          {
            opacity: 0,
            scale: 1,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "none",
          },
          ">-0.1" // 在第一張圖片動畫接近結束時開始
        );
      }
    } catch (error) {
      console.error("Error loading GSAP:", error);
    }
  },
  beforeUnmount() {
    if (this.scrollTrigger) {
      this.scrollTrigger.kill();
    }
  },
  methods: {
    loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 90vh;
  width: 100%;
  perspective: 1000px;
}

.pinned-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;

  .banner {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      img{
        width: 100%;
        height: 100%;
        object-fit:cover;
      }
    }

    @media screen and (max-width: 1024px) {
      width: 95%;
      margin: 10%;
    }

    .first-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 1; // 保持完全不透明
      transform: translateZ(0);
      object-fit: contain;
      backface-visibility: hidden;
    }

    .second-image {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: auto;
      max-height: 80vh;
      opacity: 0;
      object-fit: contain;
      z-index: 1; // 確保在第一張圖片上方
    }
  }
}

// 確保內容不會有不必要的滾動
html,
body {
  overflow-x: hidden;
  &.is-pinned {
    overflow: hidden;
  }
}
</style>
