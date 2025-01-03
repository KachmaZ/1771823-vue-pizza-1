import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useDataStore } from "./dataStore";
import { usePizzaStore } from "./pizzaStore";
import { ordersService } from "../services";
import { useAuthStore } from "./authStore";
import { useProfileStore } from "./profileStore";
import router from "../router";

export const useCartStore = defineStore("cart", () => {
  const { getEntity } = storeToRefs(useDataStore());
  const { getUserAttribute } = useAuthStore();
  const { fetchOrders } = useProfileStore();

  const cart = ref({
    userId: getUserAttribute("id"),
    phone: getUserAttribute("phone"),
    address: {
      street: "222",
      building: "222",
      flat: "222",
      comment: "222",
    },
    pizzas: [],
    misc: [
      {
        miscId: 1,
        quantity: 0,
      },
      {
        miscId: 2,
        quantity: 0,
      },
      {
        miscId: 3,
        quantity: 0,
      },
    ],
  });

  const getSinglePizzaPrice = computed(() => (pizza) => {
    let ingredientsSum = 0;

    pizza.ingredients.forEach((ingredient) => {
      ingredientsSum +=
        getEntity.value(ingredient.ingredientId, "ingredient").price *
        ingredient.quantity;
    });

    return (
      (getEntity.value(pizza.sauceId, "sauce").price +
        getEntity.value(pizza.doughId, "dough").price +
        ingredientsSum) *
      getEntity.value(pizza.sizeId, "size").multiplier
    );
  });

  const getOrderPrice = computed(() => (order = cart.value) => {
    return (
      order.pizzas.reduce(
        (acc, pizza) => acc + getSinglePizzaPrice.value(pizza) * pizza.quantity,
        0
      ) +
      order.misc.reduce(
        (acc, misc) =>
          acc + getEntity.value(misc.miscId, "misc").price * misc.quantity,
        0
      )
    );
  });

  const addPizzaToCart = (name) => {
    const { pizzaIngredients, pizzaDough, pizzaSauce, pizzaSize } = storeToRefs(
      usePizzaStore()
    );
    const preparedIngredients = [];
    Object.entries(pizzaIngredients.value).forEach(
      ([ingredientId, quantity]) => {
        if (quantity > 0) {
          preparedIngredients.push({
            ingredientId,
            quantity,
          });
        }
      }
    ),
      cart.value.pizzas.push({
        name,
        sauceId: pizzaSauce.value,
        doughId: pizzaDough.value,
        sizeId: pizzaSize.value,
        quantity: 1,
        ingredients: preparedIngredients,
      });
  };

  const sendOrder = async () => {
    await ordersService.createOrder(cart.value);

    await fetchOrders();
    router.push({ name: "Orders" });
  };

  return {
    cart,
    getSinglePizzaPrice,
    getOrderPrice,

    addPizzaToCart,
    sendOrder,
  };
});
