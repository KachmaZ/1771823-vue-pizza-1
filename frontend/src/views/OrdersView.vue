<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>
    <template v-if="userOrders.length > 0">
      <section v-for="order in userOrders" :key="order.id" class="sheet order">
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span>Сумма заказа: {{ getOrderPrice(order) }} ₽</span>
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button type="button" class="button" @click="repeatOrder(order)">
              Повторить
            </button>
          </div>
        </div>

        <ul class="order__list">
          <li
            v-for="pizza in order.orderPizzas"
            :key="pizza.id"
            class="order__item"
          >
            <div class="product">
              <img
                src="@assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ getSizeById(pizza.sizeId).name }},
                    {{ getDoughById(pizza.doughId).name }}
                  </li>
                  <li>Соус: {{ getSauceById(pizza.sauceId).name }}</li>
                  <li v-if="pizza.ingredients">
                    Начинка:
                    {{
                      pizza.ingredients
                        .map(
                          (ingredient) =>
                            getIngredientById(ingredient.ingredientId).name
                        )
                        .join(", ")
                    }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">
              {{ pizza.quantity > 1 ? `${pizza.quantity}x` : ""
              }}{{ getSinglePizzaPrice(pizza) }} ₽
            </p>
          </li>
        </ul>

        <ul class="order__additional">
          <li v-for="misc in order.orderMisc" :key="misc.id">
            <img
              :src="getPublicImage(getMiscById(misc.miscId).image)"
              width="20"
              height="30"
              :alt="getMiscById(misc.miscId).name"
            />
            <p>
              <span>{{ getMiscById(misc.miscId).name }}</span>
              <b
                >{{
                  getMiscById(misc.miscId).quantity > 1
                    ? `${getMiscById(misc.miscId).quantity}x`
                    : ""
                }}{{ getMiscById(misc.miscId).price }} ₽</b
              >
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки:
          {{ order.addressId }}
          {{
            userAddresses.find((address) => address.id === order.addressId).name
          }}
        </p>
      </section>
    </template>
    <div v-else class="sheet cart__empty">
      <p>В истории нет ни одного заказа</p>
    </div>
  </div>
</template>

<script setup>
import { getPublicImage } from "@/common/helpers";
import { storeToRefs } from "pinia";
import { useProfileStore } from "../store/profileStore";
import { useDataStore } from "../store/dataStore";
import { useCartStore } from "../store/cartStore";

const profileStore = useProfileStore();
const { userOrders, getOrderPrice, userAddresses } = storeToRefs(profileStore);
const { deleteOrder, repeatOrder } = profileStore;

const {
  getSauceById,
  getDoughById,
  getSizeById,
  getMiscById,
  getIngredientById,
} = useDataStore();

const { getSinglePizzaPrice } = storeToRefs(useCartStore());
</script>

<style lang="scss" scoped>
.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}

.cart__empty {
  padding: 20px 30px;
}
</style>
