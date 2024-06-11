<template>
  <h1>PAYMENT</h1>
  <form @submit.prevent="submitForm">
    <div>
      <label for="cardNumber">Card Number:</label>
      <input
        type="text"
        id="cardNumber"
        v-model="form.cardNumber"
        maxlength="19"
        minlength="16"
        required
        @keyup="changeCardLogo"
      />
      <img :src="cardLogoBasedOnFirstNumber" alt="" width="50px" />
      <span v-if="errors.cardNumber">{{ errors.cardNumber }}</span>
    </div>
    <div>
      <label for="expireDate">Expire Date:</label>
      <input type="date" id="expireDate" v-model="form.expireDate" required />
      <span v-if="errors.expireDate">{{ errors.expireDate }}</span>
    </div>
    <div>
      <label for="cardHolderName">Card Holder Name:</label>
      <input
        type="text"
        id="cardHolderName"
        v-model="form.cardHolderName"
        maxlength="50"
        required
      />
      <span v-if="errors.cardHolderName">{{ errors.cardHolderName }}</span>
    </div>
    <div>
      <label for="cvv">CVV:</label>
      <input type="number" id="cvv" v-model="form.cvv" />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { PaymentDto } from "../models/Payment";
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "CardForm",
  setup() {
    let cardLogo = ref<string>();
    const form = ref<PaymentDto>({
      cardNumber: "",
      expireDate: "",
      cardHolderName: "",
      cvv: undefined,
    });

    const errors = ref({
      cardNumber: "",
      expireDate: "",
      cardHolderName: "",
    });

    const cardLogoBasedOnFirstNumber = computed(() => {
      if (form.value.cardNumber.startsWith("3")) {
        return require("../assets/visa/american-express-logo-4.svg");
      }
      if (form.value.cardNumber.startsWith("4")) {
        return require("../assets/visa/visa-logo-5.svg");
      }
      if (form.value.cardNumber.startsWith("5")) {
        return require("../assets/visa/MasterCard_Logo.svg");
      }
      return "";
    });

    const changeCardLogo = () => {
      if (form.value.cardNumber.startsWith("4")) {
        cardLogo = "AWX";
        console.log(cardLogo);
      }
    };
    const validateForm = () => {
      let isValid = true;
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      errors.value.cardNumber = "";
      errors.value.expireDate = "";
      errors.value.cardHolderName = "";

      if (
        !form.value.cardNumber.startsWith("3") ||
        !form.value.cardNumber.startsWith("4") ||
        !form.value.cardNumber.startsWith("5")
      ) {
        errors.value.cardNumber =
          "Sorry This card (type / Company) is not provided ";
        isValid = false;
      }
      if (
        form.value.cardNumber.length > 19 ||
        form.value.cardNumber.length < 16
      ) {
        errors.value.cardNumber =
          "Card number cannot be longer than 19 or less than 16 character";
        isValid = false;
      }

      const expireDate = new Date(form.value.expireDate);
      if (expireDate < tomorrow) {
        errors.value.expireDate = "Expire date must be at least tomorrow";
        isValid = false;
      }

      if (form.value.cardHolderName.length > 50) {
        errors.value.cardHolderName =
          "Card holder name cannot be longer than 50 characters";
        isValid = false;
      }

      return isValid;
    };

    const submitForm = () => {
      if (validateForm()) {
        console.log("Form submitted:", form.value);
      }
    };
    return {
      form,
      errors,
      submitForm,
      changeCardLogo,
      cardLogo,
      cardLogoBasedOnFirstNumber,
    };
  },
});
</script>
