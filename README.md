# Google Maps JavaScript API React Wrapper

[![npm](https://img.shields.io/npm/v/@googlemaps/react-wrapper)](https://www.npmjs.com/package/@googlemaps/react-wrapper)
![Build](https://github.com/googlemaps/react-wrapper/workflows/Test/badge.svg)
![Release](https://github.com/googlemaps/react-wrapper/workflows/Release/badge.svg)
[![codecov](https://codecov.io/gh/googlemaps/react-wrapper/branch/master/graph/badge.svg)](https://codecov.io/gh/googlemaps/react-wrapper)
![GitHub contributors](https://img.shields.io/github/contributors/googlemaps/react-wrapper?color=green)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![](https://github.com/jpoehnelt/in-solidarity-bot/raw/main/static//badge-flat-square.png)](https://github.com/apps/in-solidarity)

> [!IMPORTANT]  
> This library has been archived.
> We recommend all users of this package to switch to the new
> [`@vis.gl/react-google-maps`](https://www.npmjs.com/package/@vis.gl/react-google-maps),
> which provides a collection of components and hooks and can be configured
> to be fully compatible with this package.
> 
> See [the migration guide](https://visgl.github.io/react-google-maps/docs/guides/migrating-from-react-wrapper)
> for more details on how to switch from this package to `@vis.gl/react-google-maps`.

## Description

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
  const ref = useRef<HTMLDivElement>();
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const map = new google.maps.Map(ref.current, {center, zoom});
    setMap(map);

    return () => {
      google.maps.event.clearInstanceListeners(map);
      setMap(null);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // do something with the map instance
  }, [map]);

  return <div ref={ref} id="map" />;
}
```

## Examples

See the [examples](https://github.com/googlemaps/react-wrapper/tree/main/examples) folder for additional usage patterns.

- [Basic Demo](https://googlemaps.github.io/react-wrapper/public/basic/)

## Install

Available via npm as the package [@googlemaps/react-wrapper](https://www.npmjs.com/package/@googlemaps/react-wrapper).

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

## Support

This library is community supported. We're comfortable enough with the stability and features of
the library that we want you to build real production applications on it.

If you find a bug, or have a feature suggestion, please [log an issue][issues]. If you'd like to
contribute, please read [How to Contribute][contrib].

[issues]: https://github.com/googlemaps/react-wrapper/issues
[contrib]: https://github.com/googlemaps/react-wrapper/blob/master/CONTRIBUTING.md
[js_api_loader]: https://www.npmjs.com/package/@googlemaps/js-api-loader
