<template>
  <main class="content container" v-if="productStatus.isLoading">
    <PreloaderDotsWave />
  </main>
  <main class="content container" v-else-if="productStatus.isFailed">
    Не удалось загрузить товар
    <button @click.prevent="">Попробовать загрузить ещё раз</button>
  </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            {{ category }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image.file.url"
            :alt="product.title"
          />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="doAddToCart"
          >
            <b class="item__price"> {{ product.pricePretty }} ₽ </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ColorOptions
                class="colors"
                :colors="product.colors"
                v-model:currentColorId="currentColorId"
              />
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объем в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="32"
                    />
                    <span class="sizes__value"> 32gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="64"
                    />
                    <span class="sizes__value"> 64gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="128"
                      checked=""
                    />
                    <span class="sizes__value"> 128gb </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <CounterComponent
                class="form__counter"
                v-model.number="productAmount"
              />

              <button
                class="button button--primery"
                type="submit"
                :disabled="productAddSending"
              >
                В корзину
              </button>
              <BaseModal v-model:open="isShownAddedMessage">
                Товар добавлен в корзину
              </BaseModal>
            </div>

            <div v-show="productAdded">Товар добавлен в корзину</div>
            <div v-show="productAddSending">Добавляем товар в корзину...</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
            Синхронизация со смартфоном<br />
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
            Поддержка сторонних приложений<br />
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
            оптимизировать свои велотренировки, сделав их максимально
            эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по
            ANT+, объединяя полученную с них информацию. Данные отображаются на
            дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно
            отслеживает местоположение, принимая сигнал с целого комплекса
            спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства
            составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты
            смартфона. Корпус гаджета выполнен из черного пластика. На
            обращенной к пользователю стороне расположен дисплей диагональю 56
            мм. На дисплей выводятся координаты и скорость, а также полученная
            со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не
            входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а
            также выдерживает кратковременное (до 30 минут) погружение в воду на
            глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import CounterComponent from "@/components/CounterComponent.vue";
import ColorOptions from "@/components/ColorOptions.vue";
import BaseModal from "@/components/BaseElements/BaseModal.vue";
import PreloaderDotsWave from "@/components/PreloaderDotsWave.vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRoute } from "vue-router";
import useFetchProduct, {
  ResponseFetchProduct,
} from "@/composable/useFetchProduct";
// import useProduct from "@/composable/useFetchProduct.js";

const store = useStore();
const route = useRoute();
const { product, status: productStatus, fetchProduct } = useFetchProduct();
const currentColorId = ref(null);

const productAmount = ref(1);
const isShownAddedMessage = ref(false);
const productAdded = ref(false);
const productAddSending = ref(false);

const categories = () => {
  store.dispatch("loadCategories");
};

fetchProduct(Number(route.params.id));

// export default defineComponent({
//   components: {
//     PreloaderDotsWave,
//     Counter,
//     ColorOptions,
//     BaseModal,
//   },
//   setup() {
//     const $store = useStore();
//     const $route = useRoute();
//     const {
//       product,
//       category,
//       status: productStatus,
//       fetchProduct,
//     } = useProduct();

//     const currentColorId = ref(null);

//     const productAmount = ref(1);
//     const isShownAddedMessage = ref(false);
//     const productAdded = ref(false);
//     const productAddSending = ref(false);
//     const doAddToCart = () => {
//       productAdded.value = false;
//       productAddSending.value = true;

//       $store
//         .dispatch("addProductToCart", {
//           productId: product.value.id,
//           amount: productAmount.value,
//         })
//         .then(() => {
//           isShownAddedMessage.value = true;
//           productAdded.value = true;
//           productAddSending.value = false;
//         });
//     };
//     const categories = () => {
//       $store.dispatch("loadCategories");
//     };

//     // watch(() => $route.fullPath, () => {
//     //   doLoadProduct()
//     // }, {immediate: true});

//     // doLoadProduct();

//     // onBeforeRouteUpdate(() => doLoadProduct());

//     fetchProduct($route.params.id);

//     return {
//       currentColorId,
//       productAmount,
//       productData: product,
//       productStatus,
//       isShownAddedMessage,
//       productAdded,
//       productAddSending,
//       product,
//       category,

//       doAddToCart,
//     };
//   },
// });
</script>
