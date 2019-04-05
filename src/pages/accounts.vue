<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn small color="primary" dark v-on="on">New</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Account Information</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 md6>
                  <v-text-field v-model="newAccount.name" label="Account Name" required></v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                  <currency-selector :currencies="currencies" v-model="newAccount.currency" />
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="newAccount.initialBalance" label="Initial Balance" type="number" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    auto-grow
                    v-model="newAccount.notes"
                    label="Notes"
                    rows="1"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="saveAndClose">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>

    <v-flex xs12>
      <v-data-table
        :items="accounts"
        class="elevation-1"
        hide-actions
        hide-headers
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.balance }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import CurrencySelector from '@/components/currencySelector';

export default {
  name: "accounts",
  components: { CurrencySelector },
  data: () => ({
    dialog: false,
    newAccount: {
      name: "",
      initialBalance: 0,
      currency: "",
      notes: ""
    }
  }),
  computed: {
    currencies() {
      return this.$store.getters["settings/userCurrencies"];
    },
    accounts() {
      return this.$store.getters["accounts/accountList"];
    }
  },
  methods: {
    saveAndClose() {
      this.$store.dispatch("accounts/addAccount", this.newAccount);
      this.close();
      console.log('saved & closed');
    },
    close() {
      this.newAccount = {
        name: "",
        initialBalance: 0,
        currency: ""
      }
      this.dialog = false
      console.log('closed');
    },
    refresh() {
      this.$store.dispatch("accounts/getAccounts");
    }
  }
};
</script>
