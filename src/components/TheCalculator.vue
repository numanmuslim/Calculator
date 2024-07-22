<template>
  <v-app @keydown.enter.prevent>
    <v-container fluid>
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
          <v-responsive style="height: 10vh">
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
          <v-responsive style="height: 10vh">
            <input
              v-model="display"
              type="text"
              class="calculator__result-primary"
              readonly
            />
          </v-responsive>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="p-style" v-for="button in buttons" :key="button" cols="3">
          <v-responsive :height="height">
            <base-button
              @inp="input"
              :value="button"
              :isDisable="disable_btn && checkDisableBtn(button)"
            ></base-button>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import calculatorMixin from "./mixins/calculator";
import BaseButton from "./ui/BaseButton.vue";
import HistoryDialog from "./ui/HistoryDialog.vue";
import { computed } from "vue";
import { useDisplay } from "vuetify";

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
  mounted(){
    window.addEventListener('keydown', this.handleKeyPress);
  },
  beforeUnmount(){
    window.removeEventListener('keydown', this.handleKeyPress);
  }
  ,
  setup() {
    const { name } = useDisplay();

    const height = computed(() => {
      // console.log(name._object.height)
      const displayHeight = name._object.height;
      if (450 > displayHeight) return "8vh";
      else if (450 <= displayHeight && displayHeight < 500) return "8.3vh";
      else if (500 <= displayHeight && displayHeight < 550) return "8.5vh";
      else if (550 <= displayHeight && displayHeight <= 600) return "8.8vh";
      else if (600 <= displayHeight && displayHeight < 650) return "9.1vh";
      else if (650 <= displayHeight && displayHeight < 700) return "9.5vh";
      else if (700 <= displayHeight && displayHeight < 750) return "9.6vh";
      else if (750 <= displayHeight && displayHeight <= 850) return "9.7vh";
      else if (1000 <= displayHeight && displayHeight <= 1280) return "10.3vh";
      else if (1280 <= displayHeight) return "10.6vh";
      else return "10vh";
    });
    //   console.log(height.value)
    return { height };
  },
};
</script>

<style>
.p-style {
  padding: 0.2%;
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
