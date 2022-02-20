import { mount, VueWrapper } from '@vue/test-utils'
import Section from './index.vue'

describe('Section', () => {
  let wrapper: VueWrapper<InstanceType<typeof Section>>
  const title = 'Section Title'

  describe('when a default slot is provided', () => {
    let defaultSlotId: string

    beforeAll(() => {
      defaultSlotId = 'defaultSlotId'

      wrapper = mount(Section, {
        props: {
          title,
        },
        slots: {
          default: `<div id="${defaultSlotId}">Some Content</div>`,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should display the title', () => {
      const titleEl = wrapper.get('.section__title')

      expect(titleEl.isVisible()).toBe(true)
      expect(titleEl.text()).toBe(title)
    })

    it('should display the default slot content', () => {
      expect(wrapper.get(`#${defaultSlotId}`).isVisible()).toBe(true)
    })
  })

  describe('when a default slot is not provided', () => {
    let defaultSlotId: string

    beforeAll(() => {
      defaultSlotId = 'defaultSlotId'

      wrapper = mount(Section, {
        props: {
          title,
        },
      })
    })

    afterAll(() => {
      wrapper.unmount()
    })

    it('should display the title', () => {
      const titleEl = wrapper.get('.section__title')

      expect(titleEl.isVisible()).toBe(true)
      expect(titleEl.text()).toBe(title)
    })

    it('should not display the default slot content', () => {
      expect(() => wrapper.get(`#${defaultSlotId}`)).toThrow()
    })
  })
})
