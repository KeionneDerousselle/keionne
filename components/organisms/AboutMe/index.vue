<script setup lang="ts">
import { useNuxtApp, useAsyncData } from '#app'
import Section from '@/components/molecules/Section/index.vue'
import ButtonLink from '@/components/atoms/ButtonLink/index.vue'

interface AboutMeProps {
  title: string
  blurbTitle: string
  blurbDescription: string
  ctaLabel: string
}

const { $contentful } = useNuxtApp()
const { client, entries } = $contentful()
const { data } = await useAsyncData('about me', () => client.getEntry(entries.ABOUT_ME))
const { title, blurbTitle, blurbDescription, ctaLabel } = data.value.fields as AboutMeProps
</script>

<template>
  <Section :title="title" class="about">
    <div class="flex flex-wrap">
      <div class="about__avatar">
        <div>
          <img src="https://via.placeholder.com/150x150" alt="Keionne's Avatar" />
        </div>
      </div>

      <div class="about__speech-bubble">
        <div class="about__speech-bubble__content">
          <h3 class="about__speech-bubble__content__title font-semibold text-2xl text-purple-600 mb-4">
            {{ blurbTitle }}
          </h3>
          <p class="about__speech-bubble__content__description text-purple-500">
            {{ blurbDescription }}
          </p>
          <div class="mt-8 flex justify-center items-center">
            <ButtonLink
              href="/assets/downloads/Keionne_Derousselle_Resume.pdf"
              download
              class="about__cta text-white"
              >{{ ctaLabel }}</ButtonLink
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
