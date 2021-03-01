# Google Maps JavaScript API React Wrapper

[![npm](https://img.shields.io/npm/v/@googlemaps/react-wrapper)](https://www.npmjs.com/package/@googlemaps/react-wrapper)
![Build](https://github.com/googlemaps/react-wrapper/workflows/Build/badge.svg)
![Release](https://github.com/googlemaps/react-wrapper/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/googlemaps/react-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/googlemaps/react-wrapper)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/react-wrapper?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Description
Wrap React components with this libary to load the Google Maps JavaScript API.

``` javascript
import { Wrapper } from "@googlemaps/react-wrapper";

const MyApp = () => (
  <Wrapper apiKey={"YOUR_API_KEY"}>
    <MyMapComponent />
  </Wrapper>
);
```

The preceding example will not render any elements unless the Google Maps JavaScript API is successfullly loaded. To handle error cases and the time until load is complete, it is recommended to provide render props.

```javascript
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status) => {
  switch (status) {
    case status === Status.LOADING:
      return <Spinner />;
    case status === Status.FAILURE:
      return <ErrorComponent />;
    case status === Status.SUCCESS:
      return <MyMapComponent />;
  }
};

const MyApp = () => <Wrapper apiKey={"YOUR_API_KEY"} render={render} />;
```

When combining children and render props, the children will render on success and the render prop will be executed for other status values.

```javascript
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <Spinner />;
  if (status === Status.FAILURE) return <ErrorComponent />;
  return null;
};

const MyApp = () => (
  <Wrapper apiKey={"YOUR_API_KEY"} render={render}>
    <MyMapComponent />
  </Wrapper>
);
```

This wrapper uses [@googlemaps/js-api-loader][js_api_loader] to load the Google Maps JavaScript API. This library uses a singleton pattern and will not attempt to load the library more than once. All options accepted by [@googlemaps/js-api-loader][js_api_loader] are also accepted as props to the wrapper component.

## Install

Available via npm as the package [@googlemaps/react-wrapper](https://www.npmjs.com/package/@googlemaps/react-wrapper).

`npm i @googlemaps/react-wrapper`

or

`yarn add @googlemaps/react-wrapper`

## Documentation

The reference documentation can be found at this [link](https://googlemaps.github.io/react-wrapper/index.html).


## Support

This library is community supported. We're comfortable enough with the stability and features of
the library that we want you to build real production applications on it.

If you find a bug, or have a feature suggestion, please [log an issue][issues]. If you'd like to
contribute, please read [How to Contribute][contrib].

[issues]: https://github.com/googlemaps/react-wrapper/issues
[contrib]: https://github.com/googlemaps/react-wrapper/blob/master/CONTRIBUTING.md
[js_api_loader]: https://www.npmjs.com/package/@googlemaps/js-api-loader