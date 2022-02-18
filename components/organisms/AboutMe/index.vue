<script setup lang="ts">
import Section from '@/components/molecules/Section/index.vue'
import Button from '@/components/atoms/Button/index.vue'
</script>

<template>
  <Section title="About Me" class="about">
    <div class="flex flex-wrap">
      <div class="about__avatar">
        <div>
          <img src="https://via.placeholder.com/150x150" alt="Keionne's Avatar" />
        </div>
      </div>

      <div class="about__speech-bubble">
        <div class="about__speech-bubble__content">
          <h3 class="font-semibold text-2xl text-purple-600 mb-4">Hi there!</h3>
          <p class="text-purple-500">
            My name is Keionne Derousselle. I am a hardworking full stack engineer, who loves technology. Eager to learn
            new things, I am constantly honing my craft. Delivering quality products is what drives me to create.
          </p>
          <div class="mt-8 flex justify-center items-center">
            <Button href="/assets/downloads/Keionne_Derousselle_Resume.pdf" download class="text-white"
              >Download CV</Button
            >
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<style lang="scss">
.about__avatar {
  @apply mb-8 md:mb-0 flex justify-center md:justify-start w-full md:w-1/4 relative px-4;

  @media (min-width: 768px) {
    flex: 0 0 25%;
    max-width: 25%;
  }

  > img {
    @apply align-middle;
  }
}

.about__speech-bubble {
  @apply relative w-full md:w-3/4;

  padding-left: 15px;
  padding-right: 15px;

  &::before {
    @apply absolute w-0 h-0 left-1/2;

    content: '';
    top: -10px;
    border-top: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    transform: translateX(-7.5px);
  }

  @media (min-width: 768px) {
    flex: 0 0 75%;
    max-width: 75%;

    &::before {
      border-left: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 15px solid #fff;
      left: 0;
      top: 20%;
      transform: translateX(0);
    }
  }

  &__content {
    @apply rounded-3xl shadow-custom p-8 bg-white w-full;
  }
}
</style>
