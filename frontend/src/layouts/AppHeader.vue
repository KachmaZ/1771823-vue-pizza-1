<template>
  <header class="header">
    <div class="header__logo">
      <RouterLink :to="{ name: 'Main' }" class="logo">
        <img
          src="@assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </RouterLink>
    </div>
    <div class="header__cart">
      <RouterLink :to="{ name: 'Cart' }">{{ getOrderPrice() }} ₽</RouterLink>
    </div>
    <div class="header__user">
      <template v-if="isAuthenticated">
        <RouterLink :to="{ name: 'UserData' }">
          <img
            :src="getPublicImage(getUserAttribute('avatar'))"
            :alt="getUserAttribute('name')"
            width="32"
            height="32"
          />
          <span>{{ getUserAttribute("name") }}</span>
        </RouterLink>
        <a class="header__login" @click.prevent="logoutClickHandler">
          <span>Выйти</span>
        </a>
      </template>
      <RouterLink v-else :to="{ name: 'SignIn' }" class="header__login"
        ><span>Войти</span></RouterLink
      >
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/authStore";
import router from "../router";
import { getPublicImage } from "../common/helpers";
import { useCartStore } from "../store/cartStore";
import { RouterLink } from "vue-router";

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
const { logout, getUserAttribute } = authStore;

const { getOrderPrice } = useCartStore();

const logoutClickHandler = async () => {
  await logout();
  await router.push({ name: "SignIn" });
};
</script>

<style lang="scss">
.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: $green-500;
  box-shadow: $shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: $white;
    background-color: $green-500;
    background-image: url("@assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: $white;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: "";
    vertical-align: middle;

    background: url("@assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}

.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: "";
    vertical-align: middle;

    background: url("@assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}

.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}
</style>
