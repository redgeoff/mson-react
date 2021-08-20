import components from './components';
import compiler from 'mson/lib/compiler';

class Utils {
  getUIComponent(component) {
    const name = component.getClassName();
    const Component = components[name];
    if (component.get('render')) {
      return component.get('render');
    } else if (Component !== undefined) {
      return Component;
    } else if (compiler.isCompiled(compiler.getComponent(name))) {
      const Parent = Object.getPrototypeOf(component.constructor);
      return this.getUIComponent(new Parent());
    } else {
      // The React component wasn't found so check the MSON layer to see if we can automatically
      // determine the component from any MSON.
      const ancestorName = compiler.getOldestCompiledAncestor(name);
      const Ancestor = compiler.getComponent(ancestorName);
      return this.getUIComponent(new Ancestor());
    }
  }
}

export default new Utils();
