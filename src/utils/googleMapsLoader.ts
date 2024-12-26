import { Loader } from '@googlemaps/js-api-loader';

let loader: Loader | null = null;

export const getGoogleMapsLoader = () => {
  if (!loader) {
    loader = new Loader({
      apiKey: 'AIzaSyBpyx3FTnDuj6a2XEKerIKFt87wxQYRov8',
      version: 'weekly',
      libraries: []
    });
  }
  return loader;
};