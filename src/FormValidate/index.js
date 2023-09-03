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

  submit(event) {
    event.preventDefault()

    const requiredFormGroups = this._form.querySelectorAll(
      `.${this._inputGroupClass}`
    )

    requiredFormGroups.forEach((requiredFormGroup) => {
      const requiredField = requiredFormGroup.querySelector('[data-required]')
      if (requiredField) {
        this.validation({ target: requiredField })
      }
    })

    if (this.hasValidFields()) {
      return true
    } else {
      requiredFormGroups?.[0]?.focus()
      return false
    }
  }

  hasValidFields() {
    const requiredFields = this._form.querySelectorAll('[data-required]')

    if (!requiredFields.length) {
      return true
    }

    const formGroups = Array.from(requiredFields).filter((field) => {
      return field.closest(`.${this._inputGroupClass}`)
    })

    const validFormGroups = Array.from(requiredFields).filter((field) => {
      const formGroup = field.closest(`.${this._inputGroupClass}`)
      return formGroup.classList.contains(this._validClass)
    })

    return formGroups?.length === validFormGroups?.length
  }

  getValues() {
    const formFields = this._form.elements

    return Array.from(formFields).reduce((acc, element) => {
      const isButtons = element.type === 'submit' || element.type === 'reset'

      if (!isButtons) {
        acc[element.name] = element.value
      }

      return acc
    }, {})
  }

  reset() {
    const formFieldsWithInvalidClass = this._form.querySelectorAll(
      `.${this._invalidClass}`
    )

    const formFieldsWithValidClass = this._form.querySelectorAll(
      `.${this._validClass}`
    )

    Array.from(formFieldsWithInvalidClass).forEach((element) => {
      element.classList.remove(this._invalidClass)
      element.classList.remove(this._validClass)
    })

    Array.from(formFieldsWithValidClass).forEach((element) => {
      element.classList.remove(this._invalidClass)
      element.classList.remove(this._validClass)
    })

    this._form.reset()
  }

  init() {
    const formFields = this._form.querySelectorAll('[data-required]')

    this._form.setAttribute('novalidate', '')

    formFields.forEach((field) => {
      field.addEventListener('keyup', (event) => this.validation(event))
      field.addEventListener('input', (event) => this.validation(event))
      field.addEventListener('change', (event) => this.validation(event))
      field.addEventListener('blur', (event) => this.validation(event))

      if (field.type === 'radio' || field.type === 'checkbox') {
        if (field.checked) {
          this.validation({ target: field })
        }
        return
      }

      if (field.value.trim().length) {
        this.validation({ target: field })
      }
    })

    this._form.addEventListener('submit', (event) => {
      this.submit(event)
    })
  }

  validation(event) {
    const field = event.target
    const formGroup = field.closest(`.${this._inputGroupClass}`)

    if (field.type === 'checkbox' || field.type === 'radio') {
      field.checked ? this.addSuccess(formGroup) : this.addError(formGroup)
    } else {
      !field.value.trim()
        ? this.addError(formGroup)
        : this.addSuccess(formGroup)
    }

    return this.hasValidFields()
  }

  addError(formGroup) {
    const errorMessage = document.createElement('span')
    const field = formGroup.querySelector('[data-required]')
    const isErrorMessage = formGroup.querySelector(`.${this._msgClass}`)

    formGroup.classList.remove(this._validClass)
    formGroup.classList.add(this._invalidClass)

    errorMessage.classList.add(this._msgClass)
    errorMessage.innerHTML =
      field?.getAttribute('data-validate-msg') || 'Required field'

    if (!isErrorMessage) {
      formGroup.appendChild(errorMessage)
    }
  }

  addSuccess(formGroup) {
    const errorMessage = formGroup.querySelector(`.${this._msgClass}`)

    formGroup.classList.remove(this._invalidClass)
    formGroup.classList.add(this._validClass)
    errorMessage?.remove()
  }
}

export default function formValidate(...args) {
  return new FormValidate(...args)
}
