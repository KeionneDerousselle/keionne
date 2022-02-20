import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createClient } from 'contentful/dist/es-modules/contentful.js'

// eslint-disable-next-line import/namespace
// const { createClient } = contentful.default

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
