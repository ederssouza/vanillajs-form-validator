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

          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `
}
