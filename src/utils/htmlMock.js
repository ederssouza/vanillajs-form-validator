export function renderHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
      </head>

      <body>
        <form id="form">
          <div class="form-group">
            <input type="text" name="name" data-required="true" />
          </div>

          <div class="form-group">
            <input type="text" name="optional" placeholder="Optional" />
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
