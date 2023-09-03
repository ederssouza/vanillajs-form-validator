class FormValidate {
  constructor({
    formSelector,
    inputGroupClass = 'form-group',
    validClass = 'valid-field',
    invalidClass = 'invalid-field',
    msgClass = 'error-msg-field'
  }) {
    if (!(formSelector instanceof window.Element)) {
      throw new TypeError('formSelector should a valid selector')
    }

    this._form = formSelector
    this._inputGroupClass = inputGroupClass
    this._validClass = validClass
    this._invalidClass = invalidClass
    this._msgClass = msgClass
  }

  cpfIsValid() {}

  trigger() {}

  submit(event) {
    event.preventDefault()

    if (this.hasValidFields()) {
      return true
    }

    const requiredFields = this._form.querySelectorAll(
      `[data-required]:not(.${this._validClass})`
    )

    requiredFields.forEach((requiredField) => {
      this.addError(requiredField)
    })

    requiredFields[0].focus()

    return false
  }

  getValues() {
    const $formElements = this._form.elements

    return Array.from($formElements).reduce((acc, element) => {
      const isButtons = element.type === 'submit' || element.type === 'reset'

      if (!isButtons) {
        acc[element.name] = element.value
      }

      return acc
    }, {})
  }

  reset() {
    const $formElements = this._form.elements

    Array.from($formElements).forEach((element) => {
      element.classList.remove(this._invalidClass)
      element.classList.remove(this._validClass)
    })

    this._form.reset()
  }

  init() {
    const $inputs = this._form.querySelectorAll('[data-required]')

    this._form.setAttribute('novalidate', '')

    $inputs.forEach(($input) => {
      $input.addEventListener('keyup', (event) => this.validation(event))
      $input.addEventListener('input', (event) => this.validation(event))
      $input.addEventListener('change', (event) => this.validation(event))
      $input.addEventListener('blur', (event) => this.validation(event))
    })

    this._form.addEventListener('submit', (event) => {
      this.submit(event)
    })
  }

  validation(event) {
    const $formElement = event.target

    !$formElement.value.length
      ? this.addError($formElement)
      : this.addSuccess($formElement)

    return this.hasValidFields()
  }

  addError(element) {
    const parent = element.closest(`.${this._inputGroupClass}`)
    const errorMessage = document.createElement('span')
    const isErrorMessage = parent.querySelector(`.${this._msgClass}`)

    element.classList.remove(this._validClass)
    element.classList.add(this._invalidClass)
    errorMessage.classList.add(this._msgClass)
    errorMessage.innerHTML =
      element.getAttribute('data-validate-msg') || 'Required field'

    if (!isErrorMessage) {
      parent.appendChild(errorMessage)
    }
  }

  addSuccess(element) {
    const parent = element.parentNode
    const errorMessage = parent.querySelector(`.${this._msgClass}`)

    element.classList.remove(this._invalidClass)
    element.classList.add(this._validClass)
    errorMessage?.remove()
  }

  hasValidFields() {
    const $inputs = this._form.querySelectorAll('[data-required]')
    const $validInputs = this._form.querySelectorAll(
      `[data-required].${this._validClass}`
    )

    return $inputs?.length === $validInputs?.length
  }
}

export default function formValidate(...args) {
  return new FormValidate(...args)
}
