[![npm](https://img.shields.io/npm/v/@googlemaps/react-wrapper)][npm-pkg]
![Release](https://github.com/googlemaps/react-wrapper/workflows/Release/badge.svg)
![Stable](https://img.shields.io/badge/stability-stable-green)
[![Tests/Build](https://github.com/googlemaps/react-wrapper/actions/workflows/test.yml/badge.svg)](https://github.com/googlemaps/react-wrapper/actions/workflows/test.yml)

[![codecov](https://codecov.io/gh/googlemaps/react-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/googlemaps/react-wrapper)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![solidarity](https://github.com/jpoehnelt/in-solidarity-bot/raw/main/static//badge-flat-square.png)](https://github.com/apps/in-solidarity)

![Contributors](https://img.shields.io/github/contributors/googlemaps/react-wrapper?color=green)
[![License](https://img.shields.io/github/license/googlemaps/react-wrapper?color=blue)][license]
[![StackOverflow](https://img.shields.io/stackexchange/stackoverflow/t/google-maps?color=orange&label=google-maps&logo=stackoverflow)](https://stackoverflow.com/questions/tagged/google-maps)
[![Discord](https://img.shields.io/discord/676948200904589322?color=6A7EC2&logo=discord&logoColor=ffffff)][Discord server]

# Google Maps JavaScript API React Wrapper

> [!NOTE]
> Development of this package has been discontinued.
> We recommend all users of this package to switch to the new
> [`@vis.gl/react-google-maps`](https://npmjs.com/package/@vis.gl/react-google-maps),
> which provides a collection of components and hooks and can be configured
> to be fully compatible with this package.
>
> See [the migration guide](https://visgl.github.io/react-google-maps/docs/guides/migrating-from-react-wrapper)
> for more details on how to switch from this package to `@vis.gl/react-google-maps`.

## Description

This repository contains the React wrapper components for the Google Maps JavaScript API.

## Requirements

- [Sign up with Google Maps Platform]
- A Google Maps Platform [project] with the [**Maps Javascript API**][maps-sdk] enabled
- An [API key] associated with the project above
- [@googlemaps/react-wrapper NPM package][npm-pkg]

## Installation

### Loading the library

Wrap React components with this library to load the Google Maps JavaScript API.

```jsx
import {Wrapper} from '@googlemaps/react-wrapper';

const MyApp = () => (
  <Wrapper apiKey={'YOUR_API_KEY'}>
    <MyMapComponent />
  </Wrapper>
);
```

The preceding example will not render any elements unless the Google Maps JavaScript API is successfully loaded. To handle error cases and the time until load is complete, it is recommended to provide render props.

```jsx
import {Wrapper, Status} from '@googlemaps/react-wrapper';

const render = status => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />;
    case Status.FAILURE:
      return <ErrorComponent />;
    case Status.SUCCESS:
      return <MyMapComponent />;
  }
};

const MyApp = () => <Wrapper apiKey={'YOUR_API_KEY'} render={render} />;
```

When combining children and render props, the children will render on success and the render prop will be executed for other status values.

```tsx
import {Wrapper, Status} from '@googlemaps/react-wrapper';

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <ErrorComponent />;
  return <Spinner />;
};

const MyApp = () => (
  <Wrapper apiKey={'YOUR_API_KEY'} render={render}>
    <MyMapComponent />
  </Wrapper>
);
```

### @googlemaps/js-api-loader

This wrapper uses [@googlemaps/js-api-loader][js_api_loader] to load the Google Maps JavaScript API. This library uses a singleton pattern and will not attempt to load the library more than once. All options accepted by [@googlemaps/js-api-loader][js_api_loader] are also accepted as props to the wrapper component.

### MyMapComponent

The following snippets demonstrates the usage of `useRef` and `useEffect` hooks with Google Maps.

```tsx
function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}
```

## Examples

See the [examples](https://github.com/googlemaps/react-wrapper/tree/main/examples) folder for additional usage patterns.

- [Basic Demo](https://googlemaps.github.io/react-wrapper/public/basic/)

## Install

Available via npm as the package [@googlemaps/react-wrapper][npm-pkg].

```sh
npm i @googlemaps/react-wrapper
```

or

```sh
yarn add @googlemaps/react-wrapper
```

For TypeScript support additionally install type definitions.

```sh
npm i -D @types/google.maps
```

or

```sh
yarn add -D @types/google.maps
```

## Documentation

The reference documentation can be found at this [link](https://googlemaps.github.io/react-wrapper/index.html).

## Contributing

Contributions are welcome and encouraged! If you'd like to contribute, send us a [pull request] and refer to our [code of conduct] and [contributing guide].

## Attribution

As a reminder, you must comply with all applicable attribution requirements for the Google Maps Platform API(s) and SDK(s) used by the Extended Component Library.

## Terms of Service

This library uses Google Maps Platform services. Use of Google Maps Platform services through this library is subject to the Google Maps Platform [Terms of Service].

This library is not a Google Maps Platform Core Service. Therefore, the Google Maps Platform Terms of Service (e.g. Technical Support Services, Service Level Agreements, and Deprecation Policy) do not apply to the code in this library.

## Support

This library is offered via an open source [license]. It is not governed by the Google Maps Platform Support [Technical Support Services Guidelines, the SLA, or the [Deprecation Policy]. However, any Google Maps Platform services used by the library remain subject to the Google Maps Platform Terms of Service.

This library adheres to [semantic versioning] to indicate when backwards-incompatible changes are introduced. Accordingly, while the library is in version 0.x, backwards-incompatible changes may be introduced at any time.

If you find a bug, or have a feature request, please [file an issue] on GitHub. If you would like to get answers to technical questions from other Google Maps Platform developers, ask through one of our [developer community channels]. If you'd like to contribute, please check the [contributing guide].

You can also discuss this library on our [Discord server].

[js_api_loader]: https://npmjs.com/package/@googlemaps/js-api-loader

[API key]: https://developers.google.com/maps/documentation/javascript/get-api-key
[maps-sdk]: https://developers.google.com/maps/documentation/javascript
[documentation]: https://googlemaps.github.io/react-wrapper
[npm-pkg]: https://npmjs.com/package/@googlemaps/react-wrapper

[code of conduct]: ?tab=coc-ov-file#readme
[contributing guide]: CONTRIBUTING.md
[Deprecation Policy]: https://cloud.google.com/maps-platform/terms
[developer community channels]: https://developers.google.com/maps/developer-community
[Discord server]: https://discord.gg/hYsWbmk
[file an issue]: https://github.com/googlemaps/react-wrapper/issues/new/choose
[license]: LICENSE
[project]: https://developers.google.com/maps/documentation/javascript/cloud-setup#enabling-apis
[pull request]: https://github.com/googlemaps/react-wrapper/compare
[semantic versioning]: https://semver.org
[Sign up with Google Maps Platform]: https://console.cloud.google.com/google/maps-apis/start
[similar inquiry]: https://github.com/googlemaps/react-wrapper/issues
[SLA]: https://cloud.google.com/maps-platform/terms/sla
[Technical Support Services Guidelines]: https://cloud.google.com/maps-platform/terms/tssg
[Terms of Service]: https://cloud.google.com/maps-platform/terms

