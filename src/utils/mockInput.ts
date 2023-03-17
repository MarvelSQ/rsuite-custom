/**
 * 由于 React 中使用 defineProperty 重写了 input 的 value 属性，导致无法直接修改 input 的 value 值
 * 该方法用于模拟用户输入，触发 input 的 change 事件
 * 输入前，会先将 input 的 value 原有的 descriptor 缓存起来
 * 为 input 的 value 重新定义 descriptor，使其可写
 * 修改 input 的 value 值
 * 触发 input 的 change 事件
 * 将 input 的 value 的 descriptor 还原
 */
export function mockInput(input: HTMLInputElement, text: string) {
  const changeEvent = document.createEvent("HTMLEvents");
  const descrptor = Object.getOwnPropertyDescriptor(input, "value");
  if (descrptor) {
    Object.defineProperty(input, "value", {
      writable: true,
      configurable: true,
      enumerable: true,
    });
  }
  input.value = text;
  changeEvent.initEvent("change", true, true);
  input.dispatchEvent(changeEvent);
  if (descrptor) {
    Object.defineProperty(input, "value", descrptor);
  }
  input.blur();
}
