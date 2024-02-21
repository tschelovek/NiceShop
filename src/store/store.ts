import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { API_BASE_URL } from "@/config";
import axios from "axios";

export interface State {
  cartProducts: CartProductsItem[] | [];
  cartProductsData: CartProductsDataItem[] | [];
  userAccessKey: string | null;
  orderInfo: [] | null;
  isCartLoading: boolean;
  categories: Category[];
}

type Category = {
  id: number;
  title: string;
  slug: string;
};

type CartProductsItem = {
  quantity: number;
  productId: number;
};

type CartProductsDataItem = {
  id: number;
  price: number;
  product: {
    colors: [];
    id: number;
    image: {};
    price: number;
    slug: string;
    title: string;
  };
  quantity: number;
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    cartProducts: [],
    cartProductsData: [],
    userAccessKey: null,

    orderInfo: null,

    isCartLoading: false,

    categories: [],
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },

    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },

    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, quantity }: CartProductsItem) {
      const item = state.cartProducts.find(
        (product) => product.productId === productId
      );

      if (item) {
        item.quantity = quantity;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.productId !== productId
      );
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
      }));
    },
    setIsCartLoading(state, bool) {
      state.isCartLoading = bool;
    },

    updateCategories(state, items) {
      state.categories = items;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find(
          (p) => p.product.id === item.productId
        );

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0
      );
    },
    cartProductTypesAmount(state) {
      return state.cartProducts.length;
    },
    orderDetailProducts(state) {
      return state.orderInfo?.basket.items || [];
    },
    orderTotalPrice(state, getters) {
      return getters.orderDetailProducts.reduce(
        (acc, item) => item.product.price * item.quantity + acc,
        0
      );
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: { userAccessKey: context.state.userAccessKey },
        })
        .then((response) => {
          console.log(response);
          context.commit("updateOrderInfo", response.data);
        });
    },
    loadCart(context) {
      context.commit("setIsCartLoading", true);

      return new Promise((resolve) => setTimeout(resolve, 1500)).then(() =>
        axios
          .get(`${API_BASE_URL}/api/baskets`, {
            params: { userAccessKey: context.state.userAccessKey },
          })
          .then((response) => {
            context.commit("setIsCartLoading", false);

            if (!context.state.userAccessKey) {
              localStorage.setItem(
                "userAccessKey",
                response.data.user.accessKey
              );
              context.commit(
                "updateUserAccessKey",
                response.data.user.accessKey
              );
            }

            context.commit("updateCartProductsData", response.data.items);
            // context.commit('syncCartProducts');
          })
      );
    },
    loadCategories(context) {
      return axios
        .get(`${API_BASE_URL}/api/productCategories`)
        .then((response) => {
          context.commit("updateCategories", response.data.items);
        });
    },
    addProductToCart(context, { productId, amount }) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
        axios
          .post(
            `${API_BASE_URL}/api/baskets/products`,
            {
              productId,
              quantity: amount,
            },
            {
              params: { userAccessKey: context.state.userAccessKey },
            }
          )
          .then((response) => {
            context.commit("updateCartProductsData", response.data.items);
            context.commit("syncCartProducts");
          })
      );
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit("updateCartProductAmount", { productId, amount });

      if (amount < 1) {
        return;
      }

      return axios
        .put(
          `${API_BASE_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: { userAccessKey: context.state.userAccessKey },
          }
        )
        .then((response) => {
          context.commit("updateCartProductsData", response.data.items);
        })
        .catch(() => {
          context.commit("syncCartProducts");
        });
    },
    deleteCartProduct(context, { productId }) {
      return (
        axios
          .delete(`${API_BASE_URL}/api/baskets/products`, {
            data: { productId },
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          // eslint-disable-next-line no-unused-vars
          .then((response) => {
            context.commit("updateCartProductsData", response.data.items);
            context.commit("syncCartProducts");
          })
      );
    },
  },
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
