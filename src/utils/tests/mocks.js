export function basicForm() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>

      <body>
        <form id="form">
          <div class="form-group">
            <input type="text" name="name" />
          </div>

          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </body>
    </html>
  `
}

export function fullForm() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>

      <body>
        <form id="form">
          <div class="form-group">
            <label for="">Name</label>
            <input type="text" name="name" placeholder="Name" data-required />
          </div>

          <div class="form-group">
            <label for="">Optional</label>
            <input type="text" name="optional" placeholder="optional" />
          </div>

          <div class="form-group">
            <label for="">E-mail</label>
            <input type="text" name="email" placeholder="E-mail" data-required />
          </div>

          <div class="form-group">
            <label for="">Options</label>
            <select type="text" name="options" data-required>
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>

          <div class="form-group">
            <label for="">Accept termos</label>
            <input type="checkbox" name="terms" value="true" data-required /> yes
          </div>

          <div class="form-group">
            <div class="label">Gender</div>

            <label>
              <input type="radio" name="gender" value="male" data-required /> Male
            </label>

            <label>
              <input type="radio" name="gender" value="female" data-required /> Female
            </label>
          </div>

          <div class="form-group">
            <label for="">Comments</label>
            <textarea
              name="comments"
              placeholder="Comments"
              data-required
            ></textarea>
          </div>

          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>
      </body>
    </html>
  `
}
