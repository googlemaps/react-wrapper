(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@googlemaps/js-api-loader')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', '@googlemaps/js-api-loader'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Loader = {}, global.React, global.jsApiLoader));
}(this, (function (exports, React, jsApiLoader) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    /**
     * Copyright 2021 Google LLC. All Rights Reserved.
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at.
     *
     *      Http://www.apache.org/licenses/LICENSE-2.0.
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    exports.Status = void 0;
    (function (Status) {
        Status["LOADING"] = "LOADING";
        Status["FAILURE"] = "FAILURE";
        Status["SUCCESS"] = "SUCCESS";
    })(exports.Status || (exports.Status = {}));
    /**
     * A component to wrap the loading of the Google Maps JavaScript API.
     *
     * ```
     * import { Wrapper } from '@googlemaps/react-wrapper';
     *
     * const MyApp = () => (
     * 	<Wrapper apiKey={'YOUR_API_KEY'}>
     * 		<MyMapComponent />
     * 	</Wrapper>
     * );
     * ```
     *
     * @param props
     */
    const Wrapper = ({ children, render, ...options }) => {
        const [status, setStatus] = React.useState(exports.Status.LOADING);
        React.useEffect(() => {
            new jsApiLoader.Loader(options).load().then(() => setStatus(exports.Status.SUCCESS), () => setStatus(exports.Status.FAILURE));
        }, []);
        if (status === exports.Status.SUCCESS && children)
            return React__default['default'].createElement(React__default['default'].Fragment, null, children);
        if (render)
            return render(status);
        return React__default['default'].createElement(React__default['default'].Fragment, null);
    };

    exports.Wrapper = Wrapper;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
