// @ts-ignore
import { createToaster } from '@meforma/vue-toaster';

const toasterObject = createToaster({
  position: 'top',
  duration: 3000,
});

export function toaster(type: 'success' | 'error' | 'info', message: string) {
  if (type === 'error') {
    toasterObject.error(`
      <p>Error</p>
      <span>${message}</span>
    `);
  } else if (type === 'info') {
    toasterObject.info(`
      <span>${message}</span>
    `);
  } else {
    toasterObject.success(`
      <p>Success</p>
      <span>${message}</span>
    `);
  }

  return;
}
