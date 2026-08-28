export function getElement<T extends Element>(selector: string): T {
    const element = document.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Không tìm thấy phần tử: ${selector}`);
    }

    return element;
}

export function getClosest(target: EventTarget | null, selector: string): Element | null {
    return target instanceof Element ? target.closest(selector) : null;
}
