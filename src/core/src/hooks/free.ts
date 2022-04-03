import { inject } from 'vue';
import { FreeLayoutInjection, freeLayoutInjectionKey } from '../interface';

export function useFree () {
  const freeLayout = inject(freeLayoutInjectionKey);

  return freeLayout as FreeLayoutInjection;
}
