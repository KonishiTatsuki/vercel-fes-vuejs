<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeCheckout,
  },
  data () {
    // this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    this.publishableKey = "pk_test_51MZoEnEW99nNbvF2wfqjn4RN0z4EnGjcHSRB0WZ2VfIgn7n15VycY9GK2kuUxUBDbJjBioBcwHNJeePiJMrJnH68009RZaFnav";
    return {
      loading: false,
      lineItems: [
        {
          price: 'price_1MZoILEW99nNbvF2EZMuZXk5', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:8080/success',
      cancelURL: 'http://localhost:8080/error',
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
      // alert("hi world")
    },
  },
};
</script>

<template>
  <div class="about">
    <p>決済</p>
    <div>
      <stripe-checkout
        ref="checkoutRef"
        mode="payment"
        :pk="publishableKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="(v) => (loading = v)"
      />
      <button @click="submit">Pay now!</button>
    </div>
  </div>
</template>
