import { render } from 'preact'

import { init, getProps } from '../../config'
import { HTMLElement } from '../HTMLElement'
import { Emoji } from '.'
import EmojiProps from './EmojiProps'

export default class EmojiElement extends HTMLElement {
  static Props = EmojiProps

  constructor(props) {
    super(props)
  }

  async connectedCallback() {
    const props = getProps(this.props, EmojiProps, this)
    props.element = this
    props.ref = (component) => {
      this.component = component
    }

    await init()
    if (this.disconnected) return

    render(<Emoji {...props} />, this)
  }
}

if (
  typeof customElements !== 'undefined' &&
  !customElements.get('lyrics-emoji')
) {
  customElements.define('lyrics-emoji', EmojiElement)
}
