'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var jsApiLoader = require('@googlemaps/js-api-loader');

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
const Wrapper = ({ children, render, callback, ...options }) => {
    const [status, setStatus] = React.useState(exports.Status.LOADING);
    React.useEffect(() => {
        const loader = new jsApiLoader.Loader(options);
        const setStatusAndExecuteCallback = (status) => {
            if (callback)
                callback(status, loader);
            setStatus(status);
        };
        setStatusAndExecuteCallback(exports.Status.LOADING);
        loader.load().then(() => setStatusAndExecuteCallback(exports.Status.SUCCESS), () => setStatusAndExecuteCallback(exports.Status.FAILURE));
    }, []);
    if (status === exports.Status.SUCCESS && children)
        return React__default['default'].createElement(React__default['default'].Fragment, null, children);
    if (render)
        return render(status);
    return React__default['default'].createElement(React__default['default'].Fragment, null);
};

exports.Wrapper = Wrapper;
//# sourceMappingURL=index.cjs.js.map
