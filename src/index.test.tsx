/*
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

import React from "react";
import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Status, Wrapper } from "./index";
import type { LoaderOptions } from "@googlemaps/js-api-loader";

// set up partial mock of @googlemaps/js-api-loader being used for the tests
// helper to control the promise returned by Loader.load
class Deferred<T> {
  public promise: Promise<T>;
  public resolve: (value: PromiseLike<T> | T) => void;
  public reject: (reason?: unknown) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

let loaderDeferred = new Deferred<unknown>();
const loaderSpy = jest.fn();
const loadMock = jest.fn();

jest.mock("@googlemaps/js-api-loader", () => {
  // this is the only part of the @googlemaps/js-api-loader api
  // surface being used in the wrapper class.
  class Loader {
    constructor(options: LoaderOptions) {
      loaderSpy(options);
    }

    public async load() {
      return loadMock();
    }
  }

  return { Loader };
});

beforeEach(() => {
  jest.resetAllMocks();

  loaderDeferred = new Deferred<unknown>();
  loadMock.mockReturnValue(loaderDeferred.promise);
});

afterEach(() => {
  // clean up jsdom
  document.documentElement.innerHTML = "";
});

test("it should render children after load", async () => {
  const { container, findByText } = render(
    <Wrapper apiKey={"YOUR_API_KEY"}>TEST CONTENT</Wrapper>
  );

  expect(container).toBeEmptyDOMElement();

  await act(async () => {
    // actual return value isn't needed here, since the wrapper doesn't
    // interact with the maps API object that would normally be returned
    loaderDeferred.resolve({});
  });

  expect(await findByText("TEST CONTENT")).toBeVisible();
});

test("it should not render children after error", async () => {
  const { queryByText } = render(
    <Wrapper apiKey={"YOUR_API_KEY"}>TEST CONTENT</Wrapper>
  );

  await act(async () => {
    loaderDeferred.reject(new Error("some loader error"));
  });

  expect(queryByText("TEST CONTENT")).toBeNull();
});

test("it should use render prop on success when there are no children", async () => {
  const { findByTestId } = render(
    <Wrapper
      apiKey={"YOUR_API_KEY"}
      render={(status) => <div data-testid="loader-status">{status}</div>}
    ></Wrapper>
  );

  expect(await findByTestId("loader-status")).toHaveTextContent(Status.LOADING);

  await act(async () => {
    loaderDeferred.resolve({});
  });

  expect(await findByTestId("loader-status")).toHaveTextContent(Status.SUCCESS);
});

test("it should use render prop on failure", async () => {
  const { findByTestId } = render(
    <Wrapper
      apiKey={"YOUR_API_KEY"}
      render={(status) => <div data-testid="loader-status">{status}</div>}
    ></Wrapper>
  );

  await act(async () => {
    loaderDeferred.reject(new Error("some error"));
  });

  expect(await findByTestId("loader-status")).toHaveTextContent(Status.FAILURE);
});

test("it should use children on success when children and render prop are specified", async () => {
  const { findByTestId, queryByTestId } = render(
    <Wrapper
      apiKey={"YOUR_API_KEY"}
      render={(status) => <div data-testid="loader-status">{status}</div>}
    >
      <div data-testid="content">TEST CONTENT</div>
    </Wrapper>
  );

  expect(await findByTestId("loader-status")).toHaveTextContent(Status.LOADING);

  await act(async () => {
    loaderDeferred.resolve({});
  });

  expect(await findByTestId("content")).toHaveTextContent("TEST CONTENT");
  expect(queryByTestId("loader-status")).toBeNull();
});

test("it should render multiple wrapper elements", async () => {
  const { findByTestId } = render(
    <>
      <Wrapper
        apiKey={"YOUR_API_KEY"}
        render={(status) => <div data-testid="loader1-status">{status}</div>}
      >
        <div data-testid="content1">TEST CONTENT 1</div>
      </Wrapper>

      <Wrapper
        apiKey={"YOUR_API_KEY"}
        render={(status) => <div data-testid="loader2-status">{status}</div>}
      >
        <div data-testid="content2">TEST CONTENT 2</div>
      </Wrapper>
    </>
  );

  expect(await findByTestId("loader1-status")).toHaveTextContent(
    Status.LOADING
  );
  expect(await findByTestId("loader2-status")).toHaveTextContent(
    Status.LOADING
  );

  await act(async () => {
    loaderDeferred.resolve({});
  });

  expect(await findByTestId("content1")).toHaveTextContent("TEST CONTENT 1");
  expect(await findByTestId("content2")).toHaveTextContent("TEST CONTENT 2");

  expect(loaderSpy).toHaveBeenCalledTimes(2);
});

test("it should pass props to Loader", async () => {
  render(<Wrapper apiKey={"YOUR_API_KEY"} libraries={["maps", "places"]} />);

  expect(loaderSpy).toHaveBeenCalledWith({
    apiKey: "YOUR_API_KEY",
    libraries: ["maps", "places"],
  });
});

test("it should execute the callback", async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Loader: LoaderMock } = require("@googlemaps/js-api-loader");
  const callback = jest.fn();

  render(<Wrapper apiKey={"YOUR_API_KEY"} callback={callback} />);

  expect(callback.mock.calls[0][0]).toBe(Status.LOADING);
  expect(callback.mock.calls[0][1]).toBeInstanceOf(LoaderMock);

  await act(async () => {
    loaderDeferred.resolve({});
  });

  expect(callback.mock.calls[1][0]).toBe(Status.SUCCESS);
  expect(callback.mock.calls[1][1]).toBeInstanceOf(LoaderMock);

  expect(callback).toHaveBeenCalledTimes(2);
});
