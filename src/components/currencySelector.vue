<template>
  <v-select
    :items="currencies"
    item-text="name"
    item-value="symbol"
    label="currency"
    :value="currency"
    @change="updateCurrency"
  ></v-select>
</template>

<script>
export default {
  name: "currencySelector",
  props: ["currencies", "currency"],
  methods: {
    updateCurrency(payload) {
      this.$emit("input", payload);
    }
  }
};
</script>
