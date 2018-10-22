import each from 'lodash/each';
class Utils {
  getIfDefined(props) {
    const definedProps = {};
    each(props, (value, name) => {
      if (value !== undefined) {
        definedProps[name] = value;
      }
    });
    return definedProps;
  }
}
export default new Utils();
