import { shallowMount, VueWrapper } from '@vue/test-utils'
import SectionTitle from './index.vue'

describe('SectionTitle', () => {
  let wrapper: VueWrapper<InstanceType<typeof SectionTitle>>
  let title: string

  beforeAll(() => {
    title = 'Section Title'
    wrapper = shallowMount(SectionTitle, {
      props: {
        title,
      },
    })
  })

  afterAll(() => {
    wrapper.unmount()
  })

  it('should render the section title', () => {
    expect(wrapper.get('h2.section__title').text()).toBe(title)
  })
})
