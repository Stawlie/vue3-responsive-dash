import { Directive } from "vue";
import elementResizeDetector from "element-resize-detector";

const erd = elementResizeDetector({
  strategy: "scroll",
});

const resize: Directive = {
  mounted(el, _, vnode) {
    erd.listenTo(el, (element) => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      vnode.el.dispatchEvent(
        new CustomEvent("resize", { detail: { width, height } })
      );
    });
  },
  unmounted(el) {
    erd.uninstall(el);
  },
};

export default resize;
