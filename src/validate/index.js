'use strict'

class FormValidate {
  constructor (form) {
    this.form = form
    this.init = this.init.bind(this)
  }

  init () {
    console.log(this.form)
  }
}

export default FormValidate
