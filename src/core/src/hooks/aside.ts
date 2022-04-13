// import { computed } from 'vue';
// import { AsideGroup } from '../interface';
import { useFree } from './free';

export function useAside () {
  const {
    asideDragStartRef,
    asideWidgetsRef,
    // asideGroupRef
    asidesCompute,
    flattenAsidesCompute,
    widgetsUsed
  } = useFree();

  function handleSetAsideDragStart (start = false) {
    console.log('set drag');
    asideDragStartRef.value = start;
    console.log(asideDragStartRef.value);
  }

  // 拉平
  // function flatten (data: any): any[] {
  //   let children: any[] = [];
  //   data.map((item: any) => {
  //     if (item.children && item.children.length) {
  //       children = [...children, ...item.children];
  //     }
  //     return item;
  //   }).concat(children.length ? flatten(children) : children);

  //   return children;
  // }

  // const asidesCompute = computed(() => {
  //   let _id = 0;
  //   return asideWidgetsRef.value.map(item => {
  //     return asideGroupRef.value
  //       ? {
  //           ...item,
  //           children: (item as AsideGroup).children.map(child => {
  //             return {
  //               ...child,
  //               id: _id++
  //             };
  //           })
  //         }
  //       : {
  //           ...item,
  //           id: _id++
  //         };
  //   });
  // });

  return {
    widgetsUsed,
    asideWidgetsRef,
    asideDragStartRef,
    asidesCompute,
    flattenAsidesCompute,
    // flattenAsidesCompute,
    // asidesCompute,
    handleSetAsideDragStart
  };
}
