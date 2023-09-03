import { renderHTML } from '../utils/htmlMock'
import FormValidate from './index'

function dispatchEvent(element, eventName) {
  const event = new window.Event(eventName, { bubbles: true })
  element.dispatchEvent(event)
}

describe('FormValidate', () => {
  let formSelector
  let formValidate

  const defaultValues = {
    inputGroupClass: 'form-group',
    validClass: 'custom-valid-css-class',
    invalidClass: 'custom-invalid-css-class',
    msgClass: 'custom-error-msg-css-class'
  }

  const { validClass, invalidClass, msgClass } = defaultValues

  beforeEach(() => {
    document.body.innerHTML = renderHTML()
    formSelector = document.querySelector('#form')
    formValidate = FormValidate({ formSelector, ...defaultValues })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('when formSelector is not a valid selector', () => {
    it('should throw a TypeError', () => {
      const formSelector = 'form'
      const formValidate = () => FormValidate({ formSelector })

      expect(formValidate).toThrow(TypeError)
      expect(formValidate).toThrowError('formSelector should a valid selector')
    })
  })

  describe('when formSelector is a valid selector', () => {
    it('should render a form with novalidate attribute', () => {
      formValidate.init()

      dispatchEvent(formSelector, 'submit')

      expect(formSelector.getAttribute('novalidate')).not.toBeNull()
    })
  })

  describe('when the form is submitted', () => {
    describe('and there are no required fields', () => {
      beforeEach(() => {
        const inputs = document.querySelectorAll('[data-required]')

        Array.from(inputs).forEach((element) => {
          element.removeAttribute('data-required')
        })
      })

      it('should return form values', () => {
        formValidate.init()

        dispatchEvent(formSelector, 'submit')

        expect(formValidate.hasValidFields()).toBe(true)
        expect(formValidate.getValues()).toEqual({
          name: '',
          optional: '',
          options: '',
          comments: ''
        })
      })
    })

    describe('and there are required fields', () => {
      it('should return an error before required input and add error CSS class', () => {
        const requiredInput = document.querySelector("[name='name']")
        const inputGroup = requiredInput.parentNode

        formValidate.init()

        dispatchEvent(formSelector, 'submit')

        expect(formValidate.hasValidFields()).toBe(false)
        expect(requiredInput.classList.contains(invalidClass)).toBe(true)
        expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
        expect(inputGroup.textContent).toContain('Required field')
      })
    })
  })

  describe('when required text field', () => {
    describe('and dispatch keyup event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'keyup')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const nameInput = document.querySelector("[name='name']")
          const optionsSelect = document.querySelector("[name='options']")
          const commentsTextarea = document.querySelector("[name='comments']")
          const inputGroup = nameInput.parentNode

          formValidate.init()
          nameInput.value = 'name value'
          optionsSelect.value = 'option2'
          commentsTextarea.value = 'comments'

          dispatchEvent(nameInput, 'keyup')
          dispatchEvent(optionsSelect, 'change')
          dispatchEvent(commentsTextarea, 'change')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: '',
            options: 'option2',
            comments: 'comments'
          })

          expect(nameInput.classList.contains(invalidClass)).toBe(false)
          expect(nameInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })

    describe('and dispatch input event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'input')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const nameInput = document.querySelector("[name='name']")
          const optionsSelect = document.querySelector("[name='options']")
          const commentsTextarea = document.querySelector("[name='comments']")
          const inputGroup = nameInput.parentNode

          formValidate.init()
          nameInput.value = 'name value'
          optionsSelect.value = 'option2'
          commentsTextarea.value = 'comments'

          dispatchEvent(nameInput, 'input')
          dispatchEvent(optionsSelect, 'change')
          dispatchEvent(commentsTextarea, 'change')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: '',
            options: 'option2',
            comments: 'comments'
          })

          expect(nameInput.classList.contains(invalidClass)).toBe(false)
          expect(nameInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })

    describe('and dispatch change event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'change')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const nameInput = document.querySelector("[name='name']")
          const optionsSelect = document.querySelector("[name='options']")
          const commentsTextarea = document.querySelector("[name='comments']")
          const inputGroup = nameInput.parentNode

          formValidate.init()
          nameInput.value = 'name value'
          optionsSelect.value = 'option2'
          commentsTextarea.value = 'comments'

          dispatchEvent(nameInput, 'change')
          dispatchEvent(optionsSelect, 'change')
          dispatchEvent(commentsTextarea, 'change')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: '',
            options: 'option2',
            comments: 'comments'
          })

          expect(nameInput.classList.contains(invalidClass)).toBe(false)
          expect(nameInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })

    describe('and dispatch blur event', () => {
      describe('and not has valid value', () => {
        it('should return an error before required input and add error CSS class', () => {
          const requiredInput = document.querySelector("[name='name']")
          const inputGroup = requiredInput.parentNode

          formValidate.init()

          dispatchEvent(requiredInput, 'blur')

          expect(formValidate.hasValidFields()).toBe(false)
          expect(requiredInput.classList.contains(invalidClass)).toBe(true)
          expect(requiredInput.classList.contains(validClass)).toBe(false)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeDefined()
          expect(inputGroup.textContent).toContain('Required field')
        })
      })

      describe('and has valid value', () => {
        it('should return form values', () => {
          const nameInput = document.querySelector("[name='name']")
          const optionsSelect = document.querySelector("[name='options']")
          const commentsTextarea = document.querySelector("[name='comments']")
          const inputGroup = nameInput.parentNode

          formValidate.init()
          nameInput.value = 'name value'
          optionsSelect.value = 'option2'
          commentsTextarea.value = 'comments'

          dispatchEvent(nameInput, 'blur')
          dispatchEvent(optionsSelect, 'change')
          dispatchEvent(commentsTextarea, 'change')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            name: 'name value',
            optional: '',
            options: 'option2',
            comments: 'comments'
          })

          expect(nameInput.classList.contains(invalidClass)).toBe(false)
          expect(nameInput.classList.contains(validClass)).toBe(true)
          expect(inputGroup.querySelector(`.${msgClass}`)).toBeNull()
        })
      })
    })
  })

  describe('when call reset method', () => {
    it('should reset all form fields', () => {
      const formFields = formSelector.elements
      const nameInput = document.querySelector("[name='name']")
      const optionalInput = document.querySelector("[name='optional']")
      const optionsSelect = document.querySelector("[name='options']")
      const commentsTextarea = document.querySelector("[name='comments']")

      formValidate.init()
      nameInput.value = 'name value'
      optionalInput.value = 'optional value'
      optionsSelect.value = 'option2'
      commentsTextarea.value = 'comments'

      dispatchEvent(nameInput, 'blur')
      dispatchEvent(optionsSelect, 'change')
      dispatchEvent(commentsTextarea, 'change')

      expect(formValidate.hasValidFields()).toBe(true)
      expect(formValidate.getValues()).toEqual({
        name: 'name value',
        optional: 'optional value',
        options: 'option2',
        comments: 'comments'
      })

      formValidate.reset()

      expect(formValidate.getValues()).toEqual({
        name: '',
        optional: '',
        options: '',
        comments: ''
      })

      Array.from(formFields).forEach((element) => {
        const isButtons = element.type === 'submit' || element.type === 'reset'

        if (!isButtons) {
          expect(element.classList.contains(invalidClass)).toBe(false)
          expect(element.classList.contains(validClass)).toBe(false)
        }
      })
    })
  })
})
