/**
 * Astryx dialogs and drawers open with showModal(), which lifts them into the browser's
 * top layer: they then ignore the prototype's device frame, cover the page, and make
 * everything outside them (the prototype panel, "Fill in for me") unclickable.
 *
 * Inside a prototype frame or a preview tile we open them non-modally instead. They are
 * `position: fixed` and rendered in place, so they resolve against the frame (which has
 * a transform) and stay inside it; prototype.css adds the dimmed backdrop and releases
 * the page scroll lock Astryx applies for open dialogs. Preview tiles are `inert`, so a
 * dialog opening inside one cannot take focus and scroll the page to itself. Stories
 * outside the prototype are untouched.
 */
const KEY = '__sayoNativeShowModal'
type Patched = typeof HTMLDialogElement.prototype & { [KEY]?: () => void }

export function keepDialogsInFrame() {
  if (typeof HTMLDialogElement === 'undefined') return
  const proto = HTMLDialogElement.prototype as Patched
  if (proto[KEY]) return
  const native = proto.showModal
  proto[KEY] = native
  proto.showModal = function (this: HTMLDialogElement) {
    if (this.closest('.proto-device, [data-proto-still]')) {
      this.setAttribute('data-proto-modal', '')
      if (!this.open) this.show()
      return
    }
    native.call(this)
  }
}

keepDialogsInFrame()
