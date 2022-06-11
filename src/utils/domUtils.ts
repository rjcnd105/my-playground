import {RefObject} from "react";

const inputChangeTrigger = (el: HTMLInputElement, newValue: string) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(
        el,
        newValue
    )
    el.dispatchEvent(new Event('change', { bubbles: true }))
}


type PosT = 'top' | 'center' | 'bottom'

type ScrollOpt = {
    smooth: boolean
    position: PosT
    extraValue: number
}
const defaultScrollOpt: ScrollOpt = {
    smooth: false,
    position: 'top',
    extraValue: 0,
}

function getPositionValue(
    position: ScrollOpt['position'],
    { scrollSize, elTop, elSize }: { scrollSize: number; elTop: number; elSize: number }
) {
    console.log(elTop, scrollSize, elSize)
    switch (position) {
        case 'top':
            return elTop
        case 'center':
            return elTop - scrollSize / 2 + elSize / 2
        case 'bottom':
            return elTop - scrollSize + elSize
    }
}

function getPositionY(
    position: ScrollOpt['position'],
    scrollEl: Pick<HTMLElement, 'offsetHeight'>,
    el: Pick<HTMLElement, 'offsetTop' | 'offsetHeight'>
) {
    return getPositionValue(position, {
        scrollSize: scrollEl.offsetHeight,
        elTop: el.offsetTop,
        elSize: el.offsetHeight,
    })
}

type ElementT = string | RefObject<HTMLElement>
function getEl(el: ElementT) {
    return typeof el === 'string' ? document.querySelector<HTMLElement>(el) : el.current
}

const scrollToY = (
    scrollSelector: ElementT,
    childSelector: ElementT,
    _scrollOpt: Partial<ScrollOpt>
) => {
    const scrollEl = getEl(scrollSelector)
    const childrenEl = getEl(childSelector)
    const { smooth, position, extraValue } = {
        ...defaultScrollOpt,
        ..._scrollOpt,
    }

    if (!scrollEl || !childrenEl) return

    const positionValue = getPositionY(position, scrollEl, childrenEl) + extraValue

    smooth
        ? scrollEl.scrollTo({
            behavior: 'smooth',
            top: positionValue,
        })
        : (scrollEl.scrollTop = positionValue)
}

const onEnter = (fn: React.KeyboardEventHandler<HTMLInputElement>) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        e.preventDefault()
        return fn(e)
    }
}

const domUtils = {
    inputChangeTrigger,
    scrollToY,
    onEnter
}
export default domUtils
