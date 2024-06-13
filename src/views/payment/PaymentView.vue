<template>
  <PageHeader :pageName="'Payment'" />
  <form @submit.prevent="submitForm">
    <div class="card">
      <div>
        <input
          type="text"
          id="cardHolderName"
          placeholder="Card Holder Name"
          class="InputElement Input"
          v-model="form.cardHolderName"
          maxlength="50"
          required
        />
        <span class="error-msg" v-if="errors.cardHolderName">{{
          errors.cardHolderName
        }}</span>
      </div>
      <div class="card-emb-form">
        <div id="card-element"></div>
      </div>
      <div class="error-msg" v-if="stripeError">{{ stripeError }}</div>
      <div class="text-center">
        <button class="btn-primary" type="submit">Submit</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { PaymentDto } from "../../models/Payment";
import { defineComponent, ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import PageHeader from "../../components/layout/PageHeader.vue";

export default defineComponent({
  name: "CardForm",
  components: {
    PageHeader,
  },
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

      if (form.value.cardHolderName.split(" ").length < 2) {
        errors.value.cardHolderName =
          "Card holder name should contain at least 2 names";
        if (
          form.value.cardHolderName.split(" ")[0].length < 3 ||
          form.value.cardHolderName.split(" ")[1].length < 3
        )
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
      cardElement = elements.create("card", {
        style: {
          input: {
            backgroundColor: "#AAA",
          },
          base: {
            iconColor: "#7462f4",
            color: "#000",
            fontWeight: "500",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
              color: "#7462f4",
            },
            "::placeholder": {
              color: "#7462f4",
            },
          },
          invalid: {
            iconColor: "#cf2e2e",
            color: "#cf2e2e",
          },
        },
      });
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

<style scoped>
#cardHolderName {
  width: 97%;
  font-size: 16px;
}
#card-element {
  border: 1px solid #7462f4;
  padding: 15px;
  background: #eee;
  border-radius: 8px;
  margin: 20px 0px;
}
</style>
