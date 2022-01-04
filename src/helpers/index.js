import isEmpty from "ramda/src/isEmpty";
import { isValidElement } from "react";
import split from "ramda/src/split";
export const convertPath = (path) => {
  if (!path) return [];
  return typeof path === "string"
    ? split(".")(path).map((k) => (k.match(/[0-9]+/) ? parseInt(k) : k))
    : path;
};
export const isElement = (o, p) => {
  if (!o || typeof o !== "object" || !o.type) return false;
  if (p) {
    const path = convertPath(p);
    if (path[path.length - 1] !== "props") return true;
  }
  if (
    omit(["type", "props", "children", "key", "data-testid"])(Object.keys(o))
      .length === 0
  ) {
    return true;
  }
  return false;
};
export const walk = (replacer, [breakFn, continueFn]) => {
  return (obj, path) => {
    if (breakFn && breakFn(obj, path)) return obj;
    if (!continueFn || continueFn(obj, path)) obj = replacer(obj, path);
    if (typeof obj !== "object" || isEmpty(obj) || !obj) return obj;
    if (isValidElement(obj)) return obj;
    const r = Object.keys(obj).reduce(
      (acc, key) => {
        const nextPath = path ? path.concat(".").concat(key) : key;
        acc[key] = walk(replacer, [breakFn, continueFn])(obj[key], nextPath);
        return acc;
      },
      Array.isArray(obj) ? [] : {}
    );
    if (isEmpty(r)) return obj;
    return r;
  };
};
