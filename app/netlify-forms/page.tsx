export const dynamic = 'force-static'

// Page invisible uniquement pour la détection des formulaires par Netlify au build.
export default function NetlifyFormsPage() {
  return (
    <div hidden aria-hidden="true" style={{ display: 'none' }}>
      <form name="contactv2" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="company" />
        <select name="budget"><option value=""></option></select>
        <textarea name="message"></textarea>
      </form>
    </div>
  )
}
