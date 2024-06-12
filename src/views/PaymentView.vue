<template>
  <h1>PAYMENT</h1>
  <form @submit.prevent="submitForm">
    <div>
      <!-- <label for="cardHolderName">Card Holder Name:</label> -->
      <input
        type="text"
        id="cardHolderName"
        placeholder="Card Holder Name"
        class="InputElement Input"
        v-model="form.cardHolderName"
        maxlength="50"
        required
      />
      <span v-if="errors.cardHolderName">{{ errors.cardHolderName }}</span>
    </div>

    <div id="card-element"></div>
    <div v-if="stripeError">{{ stripeError }}</div>
    <button type="submit">Submit</button>
  </form>
</template>

<style>
#card-element {
  padding: 100px;
}
card-element * {
  overflow: visible !important;
}
#card-element input {
  background-color: red;
  color: green !important;
}
</style>

<script lang="ts">
import { PaymentDto } from "../models/Payment";
import { defineComponent, ref, computed, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";

export default defineComponent({
  name: "CardForm",
  setup() {
    const form = ref<PaymentDto>({
      cardHolderName: "",
    });

    const errors = ref({
      cardHolderName: "",
    });
    const stripeError = ref<string>("");
    let stripe: any;
    let elements: any;
    let cardElement: any;

    const validateForm = () => {
      let isValid = true;
      errors.value.cardHolderName = "";
      if (form.value.cardHolderName.length > 50) {
        errors.value.cardHolderName =
          "Card holder name cannot be longer than 50 characters";
        isValid = false;
      }

      if (
        (form.value.cardHolderName.split(" ").length < 2 &&
          form.value.cardHolderName.split(" ")[0].length < 3) ||
        form.value.cardHolderName.split(" ")[1].length < 3
      ) {
        errors.value.cardHolderName =
          "Card holder name should contain at least 2 real names";
        isValid = false;
      }
      return isValid;
    };

    const submitForm = async () => {
      if (validateForm()) {
        const { clientSecret } = await fetch(
          "http://localhost:3000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: 10000 }),
          }
        ).then((res) => res.json());
        console.log(clientSecret);
        console.log(form.value.cardHolderName);

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: form.value.cardHolderName,
            },
          },
        });

        if (result.error) {
          stripeError.value = result.error.message;
        } else {
          if (result.paymentIntent.status === "succeeded") {
            alert("Payment succeeded!");
          }
        }
      }
    };

    onMounted(async () => {
      stripe = await loadStripe(
        "pk_test_51PQTFgKQW5VsZdS1Mj1GyY2jtJrITz02uNIuJ50mFjWY19ZLMxfwAQwuzlc5YNejT3Ljz9zAVOd8MPc0jmtVruIw00lKBP7Nun"
      );
      elements = stripe.elements();
      cardElement = elements.create("card");
      cardElement.mount("#card-element");
    });

    return {
      form,
      errors,
      submitForm,
      stripeError,
    };
  },
});
</script>
