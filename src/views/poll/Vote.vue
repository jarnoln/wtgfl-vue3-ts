<template>
  <div class="container">
    <PollBar :pollId="pollId" />
    <h1>Vote</h1>
    <div class="row">
      <div class="col-12 col-sm-10">
        <div v-if="checkForNextVoter">
          <button
            id="btn-next-voter"
            type="button"
            class="btn btn-primary"
            @click="nextVoter()"
          >
            Next voter
          </button>
          <button
            id="btn-see-results"
            type="button"
            class="btn btn-primary"
            @click="goToResults()"
          >
            See results
          </button>
        </div>
        <div v-else>
          <EditBallot
            :pollId="pollId"
            :voterId="voterId"
            @ballotWasCast="afterCastBallot"
          />
          <form>
            <label for="voter-id">Voter ID:</label>
            <input id="voter-id" type="text" v-model="voterId" />
          </form>
        </div>
      </div>
      <div class="col-12 col-sm-2">
        <Ballots />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import EditBallot from '@/components/EditBallot.vue'
import Ballots from '@/components/Ballots.vue'
import PollBar from '@/components/PollBar.vue'

export default defineComponent({
  name: 'Vote',
  props: {
    pollId: {
      type: String,
      required: true
    }
  },
  components: {
    Ballots,
    EditBallot,
    PollBar
  },
  created() {
    this.nextVoter()
  },
  data() {
    return {
      voterId: '',
      checkForNextVoter: false
    }
  },
  computed: mapState(['choices', 'ballots']),
  methods: {
    afterCastBallot() {
      console.log('afterCastBallot')
      this.checkForNextVoter = true
    },
    nextVoter() {
      console.log('nextVoter()')
      const nextVoterIndex: number = this.ballots.length + 1
      this.voterId = 'voter' + nextVoterIndex.toString()
      this.checkForNextVoter = false
    },
    goToResults() {
      console.log('goToResults()')
      this.$router.push({
        name: 'Results',
        params: { pollId: this.pollId }
      })
    }
  }
})
</script>
