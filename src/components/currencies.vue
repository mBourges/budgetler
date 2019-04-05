<template>
  <div>
    <h1 class="title">Currencies</h1>
    <v-form>
      <v-container>
        <v-layout wrap>
          <v-flex xs12 md6>
            <v-select
              :items="currencies"
              item-text="name"
              item-value="symbol"
              return-object
              label="Base currencies"
              :value="baseCurrency"
              @change="updateBaseCurrency"
            ></v-select>
          </v-flex>
          <v-flex xs12 md6>
            <v-select
              :items="currencies"
              attach
              label="Additional currencies"
              item-text="name"
              item-value="symbol"
              multiple
              return-object
              :value="additionalCurrencies"
              @change="updateAdditionalCurrencies"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
      <v-btn color="primary" @click.prevent="updateDb">update</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "currencies",
  props: ["baseCurrency", "additionalCurrencies", "currencies"],
  methods: {
    updateBaseCurrency: function(event) {
      this.$emit("baseCurrencyChanged", event);
    },
    updateAdditionalCurrencies: function(event) {
      this.$emit("additionalCurrenciesChanged", event);
    },
    updateDb: function() {
      this.$emit('update')
    }
  }
};
</script>
