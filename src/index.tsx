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

import {Loader, LoaderOptions} from '@googlemaps/js-api-loader';
import React, {ReactElement, ReactNode, useEffect, useState} from 'react';

export enum Status {
  LOADING = 'LOADING',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

/**
 * The `WrapperProps` interface extends the `LoaderOptions` interface from
 * [@googlemaps/js-api-loader](https://npmjs.com/package/@googlemaps/js-api-loader).
 * See the reference documentation for
 * [LoaderOptions](https://googlemaps.github.io/js-api-loader/interfaces/LoaderOptions.html)
 * for a complete list of all props that are available.
 */
export interface WrapperProps extends LoaderOptions {
  /**
   * Children wrapped by the `<Wrapper>{elements}</Wrapper`.
   */
  children?: ReactNode;
  /**
   * Render prop used to switch on the status.
   */
  render?: (status: Status) => ReactElement;
  /**
   * Callback prop used to access `@googlemaps/js-api-loader` and `Status`.
   *
   * Note: The callback be executed multiple times in the lifecycle of the component.
   */
  callback?: (status: Status, loader: Loader) => void;
}

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
export const Wrapper = ({
  children,
  render,
  callback,
  ...options
}: WrapperProps): ReactElement => {
  const [status, setStatus] = useState(Status.LOADING);

  useEffect(() => {
    const loader = new Loader(options);

    const setStatusAndExecuteCallback = (status: Status) => {
      if (callback) callback(status, loader);
      setStatus(status);
    };

    setStatusAndExecuteCallback(Status.LOADING);

    loader.load().then(
      () => setStatusAndExecuteCallback(Status.SUCCESS),
      () => setStatusAndExecuteCallback(Status.FAILURE)
    );
  }, []);

  if (status === Status.SUCCESS && children) return <>{children}</>;

  if (render) return render(status);

  return <></>;
};
