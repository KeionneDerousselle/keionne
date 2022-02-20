import { createClient } from 'contentful'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export const contentfulPlugin = () => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_ABOUT_ME_ENTRY_ID } = useRuntimeConfig()

  const client = createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN,
  })

  return {
    provide: {
      contentful: () => ({
        client,
        entries: {
          ABOUT_ME: CONTENTFUL_ABOUT_ME_ENTRY_ID,
        },
      }),
    },
  }
}

export default defineNuxtPlugin(contentfulPlugin)
