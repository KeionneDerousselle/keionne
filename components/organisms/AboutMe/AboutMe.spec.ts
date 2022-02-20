import { ContentfulClientApi } from 'contentful'
import { mount, VueWrapper } from '@vue/test-utils'
import * as App from '#app'
import AboutMe from './index.vue'

jest.mock('#app', () => ({
  useNuxtApp: jest.fn(),
  useAsyncData: jest.fn().mockResolvedValue({}),
}))

describe('About Me', () => {
  let wrapper: VueWrapper<InstanceType<typeof AboutMe>>
  let aboutMeEntryId: string
  let title: string
  let blurbTitle: string
  let blurbDescription: string
  let ctaLabel: string

  beforeAll(() => {
    aboutMeEntryId = 'aboutMeEntryId'
    title = 'About Me'
    blurbTitle = 'Hi, there!'
    blurbDescription = 'lorem ipsum dolor sit amet'
    ctaLabel = 'Download CV'

    const useNuxtAppMock = App.useNuxtApp as jest.Mock
    useNuxtAppMock.mockImplementation(() => ({
      $contentful: jest.fn().mockReturnValue({
        entries: {
          ABOUT_ME: aboutMeEntryId,
        },

        client: {
          getEntry: jest.fn().mockResolvedValue({
            data: {
              value: {
                fields: {
                  title,
                  blurbTitle,
                  blurbDescription,
                  ctaLabel,
                },
              },
            },
          }),
        } as unknown as ContentfulClientApi,
      }),
    }))

    const useAsyncDataMock = App.useAsyncData as jest.Mock
    useAsyncDataMock.mockImplementation((_, fn) => fn())

    wrapper = mount({
      template: `<Suspense><AboutMe /></Suspense>`,
      components: {
        AboutMe,
      },
    })
  })

  afterAll(() => {
    wrapper.unmount()
  })

  it('renders the about me page title', () => {
    expect(wrapper.get('.section__title').text()).toContain(title)
  })

  it('renders the about me blurb title', () => {
    expect(wrapper.get('.about__speech-bubble__content__title').text()).toContain(blurbTitle)
  })

  it('renders the about me blurb description', () => {
    expect(wrapper.get('.about__speech-bubble__content__description').text()).toContain(blurbDescription)
  })

  it('renders the about me cta', () => {
    const cvDownloadLink = wrapper.get('.about__cta')

    expect(cvDownloadLink.text()).toContain(ctaLabel)
    expect(cvDownloadLink.attributes('href')).toBe('/assets/downloads/Keionne_Derousselle_Resume.pdf')
    expect(cvDownloadLink.attributes('download')).toBe('')
  })
})
