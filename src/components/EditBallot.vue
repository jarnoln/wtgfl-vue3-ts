<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-6">
        <h2>Your ballot</h2>
        <table id="ballot">
          <tr
            v-for="(choice, index) in ballot"
            :id="choice.id"
            :key="choice.id"
          >
            <td>{{ index + 1 }}.</td>
            <td class="choice" :style="'background-color: ' + choice.color">
              {{ choice.title }}
            </td>
          </tr>
        </table>
      </div>
      <div class="col-12 col-sm-6">
        <h2>Choices</h2>
        <table id="choices">
          <tr
            v-for="choice in unusedChoices"
            :id="choice.id"
            :key="choice.id"
            :style="'background-color: ' + choice.color"
            @click="addToBallot(choice)"
          >
            <td class="choice">{{ choice.title }}</td>
          </tr>
        </table>
      </div>
    </div>
    <p>
      <button
        id="btn-clear-ballot"
        type="button"
        class="btn btn-secondary"
        :disabled="ballot.length === 0"
        @click="clearBallot()"
      >
        Clear ballot
      </button>
    </p>
    <p>
      <button
        id="btn-cast-ballot"
        type="button"
        class="btn btn-primary"
        :disabled="ballot.length === 0"
        @click="castBallot()"
      >
        Cast ballot
      </button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import { Ballot } from '@/types'
import { Choice } from '@/types'

export default defineComponent({
  name: 'EditBallot',
  props: {
    pollId: {
      type: String,
      required: true
    },
    voterId: {
      type: String,
      required: true
    }
  },
  emits: {
    ballotWasCast: null
  },
  created() {
    console.log('EditBallot:created()')
    // this.clearBallot()
  },
  data() {
    return {
      ballot: [] as Choice[]
    }
  },
  computed: {
    ...mapState(['choices', 'ballots']),
    unusedChoices: function() {
      // List of choices that are not yet included in ballot
      const unused: Choice[] = []
      for (let i = 0; i < this.choices.length; i++) {
        if (!this.isUsed(this.choices[i])) {
          unused.push(this.choices[i])
        }
      }
      return unused
    }
  },
  methods: {
    addToBallot(choice: Choice) {
      console.log('addToBallot(', choice, ')')
      if (!this.ballot.includes(choice)) {
        this.ballot.push(choice)
      }
    },
    clearBallot() {
      console.log('clearBallot()')
      this.ballot = []
    },
    castBallot() {
      console.log('castBallot()')
      const voterId: string = this.voterId.toString()
      const ballot: Ballot = {
        voterId: voterId,
        choices: this.ballot
      }
      this.$store.commit('addBallot', ballot)
      this.clearBallot()
      this.$emit('ballotWasCast')
    },
    isUsed(choice: Choice): boolean {
      for (let i = 0; i < this.ballot.length; i++) {
        if (this.ballot[i].id === choice.id) {
          return true
        }
      }
      return false
    }
  }
})
</script>

<style scoped>
table {
  border: 1px solid black;
}

.choice {
  padding: 5px;
  margin: 3px;
  border: 1px solid black;
  font-weight: bold;
}

#ballot {
  font-family: 'Permanent Marker';
  font-weight: bold;
}
</style>
