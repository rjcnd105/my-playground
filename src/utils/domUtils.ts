const inputChangeTrigger = (el: HTMLInputElement, newValue: string) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(
        el,
        newValue
    )
    el.dispatchEvent(new Event('change', { bubbles: true }))
}

const domUtils = {
    inputChangeTrigger,
}
export default domUtils
