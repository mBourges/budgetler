<template>
  <v-container grid-list-md>
    <v-layout align-center column>
      <v-flex xs12>
        <currencies
          :base-currency="baseCurrency"
          :additional-currencies="additionalCurrencies"
          :currencies="currencies"
          @baseCurrencyChanged="updateBaseCurrency"
          @additionalCurrenciesChanged="updateAdditionalCurrencies"
          @update="saveDb"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Currencies from "@/components/currencies";
import { getCurrencies } from "@/middlewares/countryCurrencies";

export default {
  name: "settings",
  components: { Currencies },
  computed: {
    currencies: function() {
      return getCurrencies();
    },
    baseCurrency: function() {
      return this.$store.state.settings.baseCurrency;
    },
    additionalCurrencies: function() {
      return this.$store.state.settings.additionalCurrencies;
    }
  },
  methods: {
    updateBaseCurrency: function(event) {
      this.$store.commit("settings/updateBaseCurrency", event);
    },
    updateAdditionalCurrencies: function(event) {
      this.$store.commit("settings/updateAdditionalCurrencies", event);
    },
    saveDb: function() {
      this.$store.dispatch("settings/saveSettings");
    }
  }
};
</script>
