<template>
  <v-app @keydown.enter.prevent>
    <div class="d-flex flex-column pa-3" style="height: 35vh">
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 8vh">
            <v-app-bar app color="transparent" dark>
              <v-toolbar-title
                ><v-icon class="pa-0">mdi-calculator</v-icon
                >Calculator</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <HistoryDialog
                :history
                @clearHistory="clearHistory"
                @historyItemClick="historyItemClick"
              ></HistoryDialog>
            </v-app-bar>
          </v-responsive>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 8vh">
            <input
              v-model="upperDisplay"
              type="text"
              class="calculator__result-secondary"
              disabled
            />
          </v-responsive>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-responsive style="height: 8vh">
            <input
              v-model="display"
              type="text"
              class="calculator__result-primary"
              readonly
            />
          </v-responsive>
        </v-col>
      </v-row>
    </div>
    <div class="d-inline-flex flex-column pa-3" style="height: 65vh">
      <v-row>
        <v-col class="p-style" v-for="button in buttons" :key="button" cols="3">
          <base-button
            @inp="input"
            :value="button"
            :isDisable="disable_btn && checkDisableBtn(button)"
          ></base-button>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import calculatorMixin from "./mixins/calculator";
import BaseButton from "./ui/BaseButton.vue";
import HistoryDialog from "./ui/HistoryDialog.vue";

export default {
  components: {
    BaseButton,
    HistoryDialog,
  },
  mixins: [calculatorMixin],
  methods: {
    checkDisableBtn(button) {
      if (this.disable_btn_list.find((btn) => button === btn)) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  },
};
</script>

<style>
.p-style {
  padding: 0.15%;
}

.calculator__result-primary,
.calculator__result-secondary {
  width: 100%;
  height: 60%;
  background-color: transparent;
  border: none;
  text-align: right;
  font-weight: 700;
  font-size: 2rem;
  font-family: "Noto Sans JP", sans-serif;
  color: #111111;
}

.calculator__result-secondary {
  width: 100%;
  font-weight: 400;
  font-size: 1rem;
  margin-top: 10px;
  color: #4b4b4b;
}

.v-application {
  background-color: #f3f3f3;
}
</style>
