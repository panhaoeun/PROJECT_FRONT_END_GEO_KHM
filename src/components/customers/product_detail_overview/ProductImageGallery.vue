<template>
    <div :class="zoomer_box">
        <b-row>
            <b-col md="2">
                <div
                    class="control-box"
                    v-bind:class="{ 'd-none d-md-block': thumbs.length <= 1 }"
                >
                    <div @click="moveThumbs('left')" class="control justify-content-center flex">
                        <slot name="left">
                            <i class="pi pi-chevron-circle-up" style="font-size: 1.5rem;"></i>
                        </slot>
                    </div>
                    <div class="thumb-list">
                        <img
                            @mouseover="chooseThumb(thumb, $event)"
                            draggable="false"
                            v-show="key < options.scroll_items"
                            :key="key"
                            :src="thumb.url"
                            @click="chooseThumb(thumb, $event)"
                            v-for="(thumb, key) in thumbs"
                            class="responsive-image cz-thumblist-item cz-image-zoom cursor-pointer img-responsive w-100 __max-h-323px hover:shadow-2"
                            :style="{
                                boxShadow:
                                    thumb.id === chooseProductActiveMulti(thumb.id) 
                                        ? '0px 0px 0px 2px' +
                                        options.choosed_thumb_border_color
                                        : '',
                            }"
                            :class="{
                                'choosed-thumb': thumb.id === chooseProductActiveMulti(thumb.id),
                            }"
                        />
                    </div>
                    <div @click="moveThumbs('right')" class="control justify-content-center flex">
                        <slot name="right">
                            <i class="pi pi-chevron-circle-down" style="font-size: 1.5rem;"></i>
                        </slot>
                    </div>
                </div>
            </b-col>
            <!-- Preview URL -->
            <b-col md="10">
                <div class="preview-box">
                    <img
                        :src="previewImg.url"
                        :data-zoom="previewLargeImg.url"
                        class="responsive-image cursor-pointer"
                        draggable="false"
                    />
                </div>
            </b-col>
        </b-row>
        <!-- Image Zoom before image -->
        <div :id="pane_id" class="pane-container d-none d-md-block"></div>
    </div>
</template>
<script>
// We need this specific version of working Drift-Zoom package.
import Drift from "../../../assets/drift_zoom/src/js/Drift";
/**
 * Courtesy of akulubala from vue-product-zoomer
 */
export default {
  name: 'ProductImageGallery',
  props: {
    baseZoomerOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    baseImages: {
      type: Array,
      required: true,
      default() {
        return Array;
      }
    }
  },
  data() {
    return {
      previewImg: {},
      previewLargeImg: {},
      thumbs: [],
      normal_size: [],
      large_size: [],
      choosedThumb: {},
      drift: null,
      options: {
        zoomFactor: 4,
        pane: 'pane',
        hoverDelay: 300,
        namespace: 'container-zoomer',
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: '#aa1c1c',
        move_button_style: 'chevron'
      }
    };
  },
  computed: {
    zoomer_box() {
      return `${this.options.namespace}-zoomer-box`;
    },
    pane_id() {
      return `${this.options.namespace}-pane-container`;
    },
    move_button() {
      return this.options.move_button_style === 'chevron'
        ? {
          left: 'pi pi-chevron-left',
          right: 'pi pi-chevron-right'
        }
        : {
          left: 'pi pi-angle-double-left',
          right: 'pi pi-angle-double-right'
        };
    }
   },
   watch: {
    choosedThumb(thumb) {
        const matchNormalImg = this.thumbs.find(img => img.id === thumb.id);
        if(matchNormalImg){
            this.previewLargeImg = Object.assign({}, matchNormalImg);
            this.previewImg = Object.assign({}, matchNormalImg);
            if (this.drift !== null) {
              this.drift.setZoomImageURL(matchNormalImg?.url);
            }
        }        
    }
  },
  mounted() {
    this.runImager();
    window.addEventListener('resize', this.runImager);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.runImager);
  },
  created() {
    if (Object.keys(this.baseImages).length > 0) {
        for (const key in this.baseImages) {
            if (Object.prototype.hasOwnProperty.call(this.baseImages, key)) {
                this[key] = this.baseImages[key];
                this.thumbs= this.baseImages[key];
            }
        }
    }
    
    // Base Zoom
    if (Object.keys(this.baseZoomerOptions).length > 0) {
      // eslint-disable-next-line
      for (const key in this.baseZoomerOptions) {
        if (Object.prototype.hasOwnProperty.call(this.baseZoomerOptions, key)) {
          const element = this.baseZoomerOptions[key];
          this.options[key] = element;
        }
      }
    }
    if (
      this.options.pane === 'container-round'
      || this.options.pane === 'container'
    ) {
      this.options.hoverBoundingBox = false;
    } else {
      this.options.hoverBoundingBox = true;
    }
  },
  methods: {
    runImager() {
      document
        .querySelector(`.${this.zoomer_box} .thumb-list`)
        .setAttribute(
          'style',
          `grid-template-columns: repeat(${this.baseZoomerOptions.scroll_items}, auto)`
        );
      const t = setInterval(() => {
        if (document.readyState === 'complete') {
          if (this.options.pane === 'container-round') {
            this.options.inlinePane = true;
          } else {
            this.options.inlinePane = false;
            this.options.paneContainer = document.getElementById(this.pane_id);
            const rect = document
              .querySelector(`.${this.zoomer_box}`)
              .getBoundingClientRect();
            let customStyle = '';
            if (this.options.pane === 'pane') {
              customStyle = `width:${rect.width * 1.2}px;height:${
                rect.height
              }px;left:${rect.right}px;top:${0}px;`;
            } else {
              const rect1 = document
                .querySelector('.preview-box')
                .getBoundingClientRect();
              const beginner = document
                .querySelector('.beginner')
                .getBoundingClientRect();
              customStyle = `width:${rect1.width}px;height:${
                rect1.height
              }px;left:${rect1.x - beginner.x}px;top:${0}px;`;
            }
            this.options.paneContainer.setAttribute('style', customStyle);
          }

          this.options.injectBaseStyles = true;
          const previewImg = `.${this.zoomer_box} .preview-box img`;

          this.drift = this.drift
            ? this.drift
            : new Drift(document.querySelector(previewImg), this.options);
          clearInterval(t);
        }
      }, 500);
    },
    // Choose Thumbnail
    chooseThumb(thumb, event) {
      const eventType = event.type;
      if (eventType === 'mouseover') {
        if (this.options.move_by_click !== true) {
          this.choosedThumb = thumb;
        }
      } else {
        this.choosedThumb = thumb;
      }
    },
    moveThumbs(direction) {
      const len = this.thumbs.length;
      if (direction === 'right') {
        const moveThumb = this.thumbs.splice(len - 1, 1);
        this.thumbs = [moveThumb[0], ...this.thumbs];
      } else {
        const moveThumb = this.thumbs.splice(0, 1);
        this.thumbs = [...this.thumbs, moveThumb[0]];
      }
    },
    chooseProductActiveMulti(){
        this.choosedThumb = this.thumbs[0];
    }
  }
};
</script>
<!-- Styles -->
<style>
    @import "../../../assets/drift_zoom/src/css/drift-basic.css";
</style>
