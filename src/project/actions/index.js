import * as R from "ramda";

import { convertPath, isElement } from "../../helpers";

import axios from "axios";

const ramda = {};
Object.keys(R).forEach((k) => {
  const fn = R[k];
  if (typeof fn === "function") {
    ramda["$".concat(k)] = () => (args) => {
      if (Array.isArray(args)) return fn(...args);
      return fn(args);
    };
  }
});
const $env = () => () => () => {
  return process.env.PUBLIC_URL;
};
const $length = () => () => (prev) => {
  if (Array.isArray(prev)) return prev.length;
  return null;
};
const $getData =
  ({ get }) =>
  (args) =>
  (prev) => {
    const path = convertPath(
      args[0] ? `data.${args[0]}` : prev ? `data.${prev}` : "data"
    );
    const r = R.path(path)(get());
    if (!r) return "";
    return r;
  };
const $setData =
  ({ get, set }) =>
  (args) =>
  (value) => {
    const path = ["data", ...convertPath(args[0])];
    const newValue = args[1] ? args[1] : value;
    if (R.equals(R.path(path)(get()), newValue)) return;
    set(R.assocPath(path, newValue));
  };
const $resetData =
  ({ set }) =>
  () =>
  () => {
    set(() => ({
      data: {
        appName: "Conduit",
        articleList: [],
        authoredList: null,
        commentList: null,
        draft: { article: null, comment: null, user: null },
        favoritedList: null,
        feedList: null,
        isLoading: true,
        profile: null,
        profileTab: "authored",
        tab: "feed",
        user: null,
      },
    }));
  };
const $log = () => (args) => (prev) => {
  const r = args[0] ? args : [prev];
  console.log(...r);
  return prev;
};
const $pass = () => (fns) => (prev) => {
  R.pipe(...fns)(prev);
  return prev;
};
const $render =
  ({ get, path }) =>
  (args) =>
  (prev) => {
    const el = isElement(args[0], path)
      ? args[0]
      : isElement(prev, path)
      ? prev
      : null;
    return get().api.renderTree(get().api.generateTree(el, path));
  };
const $stopPropagation = () => () => (e) => {
  e.stopPropagation();
  return e;
};
const $axios = () => (args) => (prev) => {
  const options = args[0] ? args[0] : prev;
  const token = window.localStorage.getItem("jwt");
  options.headers = { Authorization: token ? `Token ${token}` : null };
  return axios(options);
};
const $get = () => (args) => (prev) => {
  if (args.length > 1) return R.path(args)(prev);
  const path = convertPath(args[0]);
  const r = R.path(path)(prev);
  return r;
};
const $set = () => (args) => (prev) => {
  const path = convertPath(args[0]);
  const newValue = args[1];
  return R.assocPath(path, newValue)(prev);
};
const $preventDefault = () => () => (e) => {
  e.preventDefault();
  return e;
};
const $parseInt = () => () => (prev) => {
  return parseInt(prev);
};
const $spread =
  () =>
  () =>
  (...prev) =>
    prev;
const $setToken = () => (args) => (prev) => {
  const newToken = args[1] || prev;
  if (!newToken) window.localStorage.removeItem(args[0]);
  else window.localStorage.setItem(args[0], newToken);
};
const $getToken = () => (args) => () => {
  const token = window.localStorage.getItem(args[0]);
  if (!token) return "";
  return token;
};
const $clearToken = () => (args) => () => {
  window.localStorage.removeItem(args[0]);
};
const $val = () => (args) => {
  const fns = args.map((arg) => (typeof arg === "function" ? arg : () => arg));
  return R.call(R.pipe(...fns));
};
const $history = () => (args) => (prev) => {
  const path = args[0] || prev;
  window.history.pushState({}, "", path);
  window.history.go(0);
};
const $location = () => () => () => {
  return window.location.href;
};
const $toDateString = () => (args) => (prev) => {
  const options = {
    weekday: undefined,
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (!prev) return null;
  return new Date(prev).toLocaleDateString("en-US", args[0] || options);
};
const $stringify = () => (args) => (prev) => JSON.stringify(prev, ...args);
const $ceil = () => () => (prev) => {
  return Math.ceil(prev);
};
const actions = R.merge({
  $axios,
  $get,
  $ceil,
  $stringify,
  $getData,
  $pass,
  $history,
  $log,
  $resetData,
  $clearToken,
  $toDateString,
  $preventDefault,
  $stopPropagation,
  $render,
  $spread,
  $setData,
  $setToken,
  $getToken,
  $set,
  $location,
  $length,
  $env,
  $val,
  $parseInt,
})(ramda);
export default actions;
