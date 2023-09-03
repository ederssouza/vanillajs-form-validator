import {
  basicForm,
  formWithFieldsFilled,
  formWithMultipleFields
} from '../utils/tests/mocks'
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

  const { inputGroupClass, validClass, invalidClass, msgClass } = defaultValues

  describe('when formSelector param is not a valid selector', () => {
    it('should throw a TypeError', () => {
      const formSelector = 'form'
      const formValidate = () => FormValidate({ formSelector })

      expect(formValidate).toThrow(TypeError)
      expect(formValidate).toThrowError('formSelector should a valid selector')
    })
  })

  describe('when submitting form', () => {
    describe('and form not have the required fields', () => {
      beforeEach(() => {
        document.body.innerHTML = basicForm()
        formSelector = document.querySelector('#form')
        formValidate = FormValidate({ formSelector, ...defaultValues })
      })

      afterEach(() => {
        document.body.innerHTML = ''
        formValidate = undefined
      })

      it('should return valid form', () => {
        formValidate.init()

        dispatchEvent(formSelector, 'submit')

        expect(formValidate.hasValidFields()).toBe(true)
      })
    })

    describe('and form have the required fields', () => {
      beforeEach(() => {
        document.body.innerHTML = formWithMultipleFields()
        formSelector = document.querySelector('#form')
        formValidate = FormValidate({ formSelector, ...defaultValues })
      })

      afterEach(() => {
        document.body.innerHTML = ''
        formValidate = undefined
      })

      it('should return invalid form', () => {
        formSelector = document.querySelector('#form')
        formValidate.init()

        dispatchEvent(formSelector, 'submit')

        const formGroupsWithErrors = formSelector.querySelectorAll(
          `.${invalidClass}`
        )

        const errorMessages = formSelector.querySelectorAll(`.${msgClass}`)

        expect(formValidate.hasValidFields()).toBe(false)
        expect(formGroupsWithErrors.length).toBe(6)
        expect(errorMessages.length).toBe(6)
      })

      describe('and dispatch keyup event', () => {
        it('should toggle success and error classes when user changes input value', () => {
          formSelector = document.querySelector('#form')
          formValidate.init()

          const nameField = formSelector.querySelector('[name="name"]')
          const nameFieldFormGroup = nameField.closest(`.${inputGroupClass}`)

          dispatchEvent(nameField, 'keyup')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(false)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(true)

          nameField.value = 'John Doe'

          dispatchEvent(nameField, 'keyup')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(true)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(
            false
          )
        })
      })

      describe('and dispatch input event', () => {
        it('should toggle success and error classes when user changes input value', () => {
          formSelector = document.querySelector('#form')
          formValidate.init()

          const nameField = formSelector.querySelector('[name="name"]')
          const nameFieldFormGroup = nameField.closest(`.${inputGroupClass}`)

          dispatchEvent(nameField, 'input')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(false)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(true)

          nameField.value = 'John Doe'

          dispatchEvent(nameField, 'input')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(true)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(
            false
          )
        })
      })

      describe('and dispatch change event', () => {
        it('should toggle success and error classes when user changes input value', () => {
          formSelector = document.querySelector('#form')
          formValidate.init()

          const nameField = formSelector.querySelector('[name="name"]')
          const nameFieldFormGroup = nameField.closest(`.${inputGroupClass}`)

          dispatchEvent(nameField, 'change')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(false)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(true)

          nameField.value = 'John Doe'

          dispatchEvent(nameField, 'change')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(true)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(
            false
          )
        })
      })

      describe('and dispatch blur event', () => {
        it('should toggle success and error classes when user changes input value', () => {
          formSelector = document.querySelector('#form')
          formValidate.init()

          const nameField = formSelector.querySelector('[name="name"]')
          const nameFieldFormGroup = nameField.closest(`.${inputGroupClass}`)

          dispatchEvent(nameField, 'focus')
          dispatchEvent(nameField, 'blur')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(false)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(true)

          nameField.value = 'John Doe'

          dispatchEvent(nameField, 'focus')
          dispatchEvent(nameField, 'blur')

          expect(nameFieldFormGroup.classList.contains(validClass)).toBe(true)
          expect(nameFieldFormGroup.classList.contains(invalidClass)).toBe(
            false
          )
        })
      })

      describe('and all fields was filled and call getValues and reset methods', () => {
        it('should reset all fields', () => {
          formSelector = document.querySelector('#form')
          formValidate.init()

          const nameField = formSelector.querySelector('[name="name"]')
          const optionalField = formSelector.querySelector('[name="optional"]')
          const emailField = formSelector.querySelector('[name="email"]')
          const optionsField = formSelector.querySelector('[name="options"]')
          const termsField = formSelector.querySelector('[name="terms"]')
          const genderField = formSelector.querySelector('[name="gender"]')
          const commentsField = formSelector.querySelector('[name="comments"]')

          nameField.value = 'John Doe'
          optionalField.value = 'optional'
          emailField.value = 'john.doe@gmail.com'
          optionsField.value = 'option2'
          termsField.checked = true
          genderField.checked = true
          commentsField.value = 'comments'

          dispatchEvent(nameField, 'change')
          dispatchEvent(formSelector, 'submit')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            comments: 'comments',
            email: 'john.doe@gmail.com',
            gender: 'female',
            name: 'John Doe',
            optional: 'optional',
            options: 'option2',
            terms: 'true'
          })

          formValidate.reset()

          expect(formValidate.getValues()).toEqual({
            comments: '',
            email: '',
            gender: 'female',
            name: '',
            optional: '',
            options: '',
            terms: 'true'
          })
        })
      })

      describe('and some fields was filled and call getValues and reset methods', () => {
        beforeEach(() => {
          document.body.innerHTML = formWithFieldsFilled()
          formSelector = document.querySelector('#form')
          formValidate = FormValidate({ formSelector, ...defaultValues })
        })

        afterEach(() => {
          document.body.innerHTML = ''
          formValidate = undefined
        })

        it('should reset all fields', () => {
          formSelector = document.querySelector('#form')
          formValidate.init()

          const nameField = formSelector.querySelector('[name="name"]')
          const optionalField = formSelector.querySelector('[name="optional"]')
          const emailField = formSelector.querySelector('[name="email"]')
          const optionsField = formSelector.querySelector('[name="options"]')
          const termsField = formSelector.querySelector('[name="terms"]')
          const genderField = formSelector.querySelector('[name="gender"]')
          const commentsField = formSelector.querySelector('[name="comments"]')

          nameField.value = 'John Doe'
          optionalField.value = 'optional'
          emailField.value = 'john.doe@gmail.com'
          optionsField.value = 'option2'
          termsField.checked = true
          genderField.checked = true
          commentsField.value = 'comments'

          dispatchEvent(nameField, 'change')
          dispatchEvent(formSelector, 'submit')

          expect(formValidate.hasValidFields()).toBe(true)
          expect(formValidate.getValues()).toEqual({
            comments: 'comments',
            email: 'john.doe@gmail.com',
            gender: 'female',
            name: 'John Doe',
            optional: 'optional',
            options: 'option2',
            terms: 'true'
          })

          formValidate.reset()

          expect(formValidate.getValues()).toEqual({
            comments: '',
            email: 'john.doe@gmail.com',
            gender: 'female',
            name: '',
            optional: '',
            options: '',
            terms: 'true'
          })
        })
      })
    })
  })
})
