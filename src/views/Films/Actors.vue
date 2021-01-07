<template>
  <div>
       <div class="swiper-container">
        <div class="swiper-wrapper">
            <!-- 数据是父组件传输给子组件，因此使用插槽 -->
             <slot></slot>
          <!-- <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div> -->
         
        </div>
        
      </div> 
  </div>
</template>
<script>
// 4 演职人员轮播图形式的，将轮播图进行导入
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css"; //在使用swiper的时候也需要将swiper的css进行导入

  export default {
    // 4.3 swiper设置js
  mounted(){
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,//每一屏显示几张
      spaceBetween: 30,//两个图片之间的间距
     
    });
  }
  }
</script>

<style lang='scss' scoped>
// 4.2swiper的样式
 .swiper-container {
      width: 100%;
      height: 100%;
    }

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
</style>