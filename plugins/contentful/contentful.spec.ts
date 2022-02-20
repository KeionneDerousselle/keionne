import * as Contentful from 'contentful/dist/es-modules/contentful'
import * as App from '#app'
import { contentfulPlugin } from './index'

jest.mock('contentful/dist/es-modules/contentful', () => ({
  createClient: jest.fn(),
}))

jest.mock('#app', () => ({
  defineNuxtPlugin: jest.fn(),
  useRuntimeConfig: jest.fn(),
}))

describe('Contentful Plugin', () => {
  let contentfulSpaceId: string
  let contentfulAccessToken: string
  let contentfulAboutMeEntryId: string
  let mockClient: Contentful.ContentfulClientApi
  let returned: {
    provide?: {
      contentful: () => {
        client: Contentful.ContentfulClientApi
        entries: {
          ABOUT_ME: string
        }
      }
    }
  }

  beforeAll(() => {
    contentfulSpaceId = 'spaceId'
    contentfulAccessToken = 'accessToken'

    const useRuntimeConfigMock = App.useRuntimeConfig as jest.Mock
    useRuntimeConfigMock.mockReturnValue({
      CONTENTFUL_SPACE_ID: contentfulSpaceId,
      CONTENTFUL_ACCESS_TOKEN: contentfulAccessToken,
      CONTENTFUL_ABOUT_ME_ENTRY_ID: contentfulAboutMeEntryId,
    })

    mockClient = {} as Contentful.ContentfulClientApi

    const createClientMock = Contentful.createClient as jest.Mock
    createClientMock.mockReturnValue(mockClient)

    returned = contentfulPlugin()
  })

  it('should call createClient with the correct arguments', () => {
    const createClientMock = Contentful.createClient as jest.Mock
    expect(createClientMock).toHaveBeenCalledWith({
      space: contentfulSpaceId,
      accessToken: contentfulAccessToken,
    })
  })

  it('should return the client', () => {
    expect(returned.provide.contentful()).toEqual({
      client: mockClient,
      entries: {
        ABOUT_ME: contentfulAboutMeEntryId,
      },
    })
  })
})
