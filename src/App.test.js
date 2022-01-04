import * as R from "ramda";

import { cleanup, render } from "@testing-library/react";
import { convertPath, walk } from "./helpers";

import App from "./App";
import React from "react";
import { store } from "./App";

const entry = "App";
const { api, elements } = store.getState();
const testTree = api.generateTree(elements[entry], entry);

afterEach(cleanup);

walk(
  (testLeaf) => {
    const testid = testLeaf.props["data-testid"];
    function testElement(el, elPath) {
      if (!el) return;
      switch (typeof el) {
        case "string":
          it(`should have text ${el}`, () => {
            const { queryByTestId } = render(<App />);
            const renderLeaf = queryByTestId(testid);
            expect(renderLeaf).toHaveTextContent(el);
          });
          break;
        case "object":
          if (Array.isArray(el)) {
            el.forEach((e, i) => testElement(e, `${elPath}.${i}`));
          } else if (el.props) {
            const currPath = elPath.replace(testid, "").replace(/^\./, "");
            const { props, children } = el;
            const { style } = props;
            if (style) {
              it(`should have style`, () => {
                const { queryByTestId } = render(<App />);
                const renderLeaf = queryByTestId(testid);
                const currLeaf = R.path(convertPath(currPath), renderLeaf);
                expect(currLeaf).toHaveStyle(style);
              });
            }
            testElement(children, `${elPath}.children`);
            break;
          }
        default:
          break;
      }
    }
    testElement(testLeaf, testid);
    return testLeaf;
  },
  [
    null,
    (child) => {
      try {
        if (child.props["data-testid"]) return true;
      } catch (err) {}
      return false;
    },
  ]
)(testTree);
