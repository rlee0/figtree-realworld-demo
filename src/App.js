import * as project from "./project";

import { Figtree, create } from "figtree-js";

import React from "react";

const store = create(project);

function App() {
  return <Figtree store={store} entry={"App"} />;
}

export { store };
export default App;
