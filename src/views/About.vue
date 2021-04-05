<template>
  <div class="container">
    <div class="about">
      <h1 class="text-center">Where To Go For Lunch?</h1>
      <div class="quote">
        <p>
          “The History of every major Galactic Civilization tends to pass
          through three distinct and recognizable phases, those of Survival,
          Inquiry and Sophistication, otherwise known as the How, Why, and Where
          phases.
        </p>
        <p>
          For instance, the first phase is characterized by the question 'How
          can we eat?' the second by the question 'Why do we eat?' and the third
          by the question 'Where shall we have lunch?”
        </p>
        <p>
          ― Douglas Adams:
          <a
            href="https://en.wikipedia.org/wiki/The_Restaurant_at_the_End_of_the_Universe"
          >
            The Restaurant at the End of the Universe
          </a>
        </p>
      </div>

      <p>
        The last one is the most difficult one since it needs to be answered
        every day and often you don't want to have the same answer every day.
      </p>
      <p>
        It is especially difficult if you are in a group of people trying to
        decide together where to have lunch and everyone has their own
        preferences.
      </p>

      <p>
        As it seems to be fashionable nowadays to solve life's problems with
        apps, here is one to solve this particular problem (though I suppose it
        would be possible to use this to solve also any other issue where a
        group of people need to make some common decision).
      </p>
      <p>
        Everyone gets to list their preferences and this will magically(*) pick
        the one that is most fair for everyone.
      </p>
      <small
        >(*) Actually it is using one of several supported election methods. The
        method can be changed from settings.</small
      >

      <h2>Here is how it works:</h2>

      <ul>
        <li>
          Add available options to choose form
        </li>
        <li>
          Vote: Choose your favorite options by clicking available choices in
          order of preference, then press "Cast ballot"
        </li>
        <li>
          Let other people cast their ballots. (Currently everyone needs to use
          the same device but in future there will probably be shareable link.)
        </li>
        <li>
          After everyone has casted their vote, see the results page to see
          which option won. (Or options in case of tie).
        </li>
      </ul>

      <h2>Supported election methods</h2>

      <ul>
        <li>
          <a href="https://en.wikipedia.org/wiki/Plurality_voting">Plurality</a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Approval_voting">Approval</a>
        </li>
        <li>
          <a href="https://en.wikipedia.org/wiki/Schulze_method">Schulze</a>
        </li>
      </ul>

      <h2>Technicalities</h2>

      <p>
        Coded by <a href="https://jln.fi">Jarno Luoma-Nirva</a> using
        <a href="https://v3.vuejs.org/">Vue 3</a> and
        <a href="https://www.typescriptlang.org/">TypeScript</a>. This software
        is open source and available on
        <a href="https://github.com/jarnoln/wtgfl-vue3-ts">GitHub</a>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.quote {
  padding: 5px;
  margin: 3px;
  font-style: italic;
}
</style>
