import { commonLight } from 'naive-ui';
import { createTheme } from 'naive-ui/lib/_mixins';

const freeLight = createTheme({
  name: 'Free',
  common: commonLight
});

export default freeLight;
export type FreeTheme = typeof freeLight
