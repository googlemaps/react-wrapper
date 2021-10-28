// /**
//  * Copyright 2021 Google LLC. All Rights Reserved.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at.
//  *
//  *      Http://www.apache.org/licenses/LICENSE-2.0.
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

/* eslint @typescript-eslint/no-unsafe-member-access: 0 */
/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
/* eslint @typescript-eslint/no-unsafe-call: 0 */
/* eslint @typescript-eslint/no-unsafe-return: 0 */

import React, {ReactElement} from 'react';
import {Wrapper, Status} from './index';
import {Loader, LoaderOptions} from '@googlemaps/js-api-loader';
import {render, act} from '@testing-library/react';
import {waitFor} from '@testing-library/dom';

/**
 * Helper to resolve/reject the Loader promise.
 * Pass an error to reject the promise.
 *
 * @param e Error to pass to loader
 */
const executeLoaderCallback = async (e?: string | Error): Promise<void> => {
  await act(async () => {
    const loader = Loader['instance'];

    if (e) {
      loader.onerrorEvent = e;
      loader.callbacks[0](e);
    } else {
      loader.callback();
    }

    await waitFor(() => loader.done);
  });
};

const child = 'foo';
const renderProp = (status: Status): ReactElement => <>{status}</>;

afterEach(() => {
  document.getElementsByTagName('html')[0].innerHTML = '';
  delete Loader['instance'];
});

test('it should render children after load', async () => {
  const {container} = render(
    <Wrapper apiKey={'YOUR_API_KEY'}>{child}</Wrapper>
  );
  expect(container.innerHTML).toBe('');
  await executeLoaderCallback();
  expect(container.innerHTML).toBe(child);
});

test('it should not render children after error', async () => {
  const {container} = render(
    <Wrapper apiKey={'YOUR_API_KEY'}>{child}</Wrapper>
  );
  expect(container.innerHTML).toBe('');
  await executeLoaderCallback('some error');
  expect(container.innerHTML).toBe('');
});

test('it should use render prop success', async () => {
  const {container} = render(
    <Wrapper apiKey={'YOUR_API_KEY'} render={renderProp}></Wrapper>
  );
  expect(container.innerHTML).toBe(Status.LOADING);
  await executeLoaderCallback();
  expect(container.innerHTML).toBe(Status.SUCCESS);
});

test('it should use render prop failure', async () => {
  const {container} = render(
    <Wrapper apiKey={'YOUR_API_KEY'} render={renderProp}></Wrapper>
  );
  expect(container.innerHTML).toBe(Status.LOADING);
  await executeLoaderCallback('some error');
  expect(container.innerHTML).toBe(Status.FAILURE);
});

test('it should use children if success and render prop', async () => {
  const {container} = render(
    <Wrapper apiKey={'YOUR_API_KEY'} render={renderProp}>
      {child}
    </Wrapper>
  );
  expect(container.innerHTML).toBe(Status.LOADING);
  await executeLoaderCallback();
  expect(container.innerHTML).toBe(child);
});

test('it should render multiple wrapper elements', async () => {
  const load = jest.spyOn(Loader.prototype, 'load');
  // eslint-disable-next-line
  const setScript = jest.spyOn<Loader, any>(Loader.prototype, 'setScript');

  const {container} = render(
    <>
      <Wrapper apiKey={'YOUR_API_KEY'} render={renderProp}>
        {child}
      </Wrapper>
      <Wrapper apiKey={'YOUR_API_KEY'} render={renderProp}>
        {child}
      </Wrapper>
    </>
  );
  expect(container.innerHTML).toBe(`${Status.LOADING}${Status.LOADING}`);
  await executeLoaderCallback();
  expect(container.innerHTML).toBe(`${child}${child}`);

  expect(load).toHaveBeenCalledTimes(2);
  expect(setScript).toHaveBeenCalledTimes(1);
});

test('it should pass props to Loader and use the correct script url', () => {
  const loaderOptions: LoaderOptions = {
    apiKey: 'YOUR_API_KEY',
    libraries: ['places'],
  };

  render(<Wrapper {...loaderOptions} />);

  // grab the script from the document
  const script = document.getElementsByTagName('script')[0];

  // compare url to what is generated directly from loader
  expect(script.src).toBe(new Loader(loaderOptions).createUrl());
});

test('it should execute the callback', async () => {
  const callback = jest.fn();
  const loaderOptions: LoaderOptions = {
    apiKey: 'YOUR_API_KEY',
  };

  render(<Wrapper {...{...loaderOptions, callback}} />);

  expect(callback.mock.calls[0][0]).toBe(Status.LOADING);
  expect(callback.mock.calls[0][1]).toBeInstanceOf(Loader);

  await executeLoaderCallback();

  expect(callback.mock.calls[1][0]).toBe(Status.SUCCESS);
  expect(callback.mock.calls[1][1]).toBeInstanceOf(Loader);

  expect(callback).toBeCalledTimes(2);
});
