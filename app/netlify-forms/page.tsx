export const dynamic = 'force-static'

export default function NetlifyFormsPage() {
  return (
    <div hidden aria-hidden="true" style={{ display: 'none' }}>
      <form name="contactv2" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <input type="text" name="company" />
        <select name="budget"><option value=""></option></select>
        <textarea name="message"></textarea>
      </form>
    </div>
  )
}
