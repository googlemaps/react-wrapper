/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import commonjs from "@rollup/plugin-commonjs";
import filesize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

const INPUT_FILE_PATH = "src/index.tsx";
const OUTPUT_NAME = "Loader";

const GLOBALS = {
  react: "React",
};

const PLUGINS = [
  typescript(),
  resolve({
    browser: true,
    resolveOnly: [/^(?!react$)/, /^(?!@googlemaps\/js-api-loaderm$)/],
  }),
  commonjs(),
  filesize(),
];

const EXTERNAL = ["react", "@googlemaps/js-api-loader"];

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: "umd",
  },
  {
    file: pkg.main,
    format: "cjs",
  },
  {
    file: pkg.module,
    format: "es",
  },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: OUTPUT_NAME,
    globals: GLOBALS,
    sourcemap: true,
  },
  external: EXTERNAL,
  plugins: PLUGINS,
}));

export default config;
