export function getParam(name, src) {
  const re = new RegExp(`(?:^|\\?|#|&)${name}=([^&#]*)(?:$|&|#)`, 'i');
  const m = re.exec(src || window.location.href);
  return m ? encodeURI(m[1]) : '';
}

export function setParam(name, str, url) {
  const re = new RegExp(`(?:^|\\?|#|&)${name}=([^&#]*)(?:$|&|#)`, 'i');
  const src = url || window.location.href;
  const m = re.exec(src);
  if (m != null) {
    return src.replace(m[0], m[0].replace(`${name}=${m[1]}`, `${name}=${str}`));
  }
  if (src.indexOf('?') !== -1) {
    return `${src}&${name}=${str}`;
  }
  return `${src}?${name}=${str}`;
}

export function removeParam(name, src) {
  return src.replace(new RegExp(`[?&]${name}=[^&#]*(#.*)?$`), '$1').replace(new RegExp(`([?&])${name}=[^&]*&`), '$1');
}
