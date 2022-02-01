class Utils {
  getIfDefined(props) {
    const definedProps = {};
    Object.keys(props).forEach(([name, value]) => {
      if (value !== undefined) {
        definedProps[name] = value;
      }
    });
    return definedProps;
  }

  snakeCase(str) {
    // 1. Make the first letter lower case so that we don't prepend an underscore in step 2
    const a = str.charAt(0).toLowerCase() + str.slice(1);

    // 2. Convert all caps to lower case and prepend an underscore in all cases, except the first.
    const b = a.replace(/([A-Z])/g, (match) => '_' + match.toLowerCase());

    // 3. Convert any sequence of non-alphanumeric characters to a single underscore
    return b.replace(/[^a-z0-9]+/, '_');
  }
}
export default new Utils();
