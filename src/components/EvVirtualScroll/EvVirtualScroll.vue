<script setup lang="ts">

import {makeEvVirtualScrollProps} from "./EvVirtualScroll.ts";
import {getCurrentComponent, getScrollParent, toWebUnit} from "../../util";
import {useDimensions} from "../../composables/dimensions.ts";
import {onMounted, onScopeDispose, toRef, useSlots} from "vue";
import {useVirtual} from "../../composables/virtual.ts";
import {useToggleScope} from "../../composables/toggleScope.ts";
import EvVirtualScrollItem from "./EvVirtualScrollItem.vue";

const props = defineProps(makeEvVirtualScrollProps());
const slots = useSlots();

const component = getCurrentComponent('EvVirtualScroll');
const dimensionStyles = useDimensions(props);
const {
    containerRef,
    handleScroll,
    handleItemResize,
    scrollToIndex,
    paddingTop,
    paddingBottom,
    computedItems,
} = useVirtual(props, toRef(props, 'items'));

useToggleScope(() => props.renderless, () => {

    onMounted(() => {
        containerRef.value = getScrollParent(component.vnode.el as HTMLElement, true);
        containerRef.value?.addEventListener('scroll', handleScroll);
    });

    onScopeDispose(() => {
        containerRef.value?.removeEventListener('scroll', handleScroll);
    });
});


defineExpose({
    scrollToIndex
});

</script>
<template>
    <template v-if="props.renderless">
        <div class="ev-virtual-scroll--spacer"
             :style="{ paddingTop: toWebUnit(paddingTop) }"
        ></div>
        <ev-virtual-scroll-item
            v-for="item in computedItems"
            :key="item.index"
            :renderless="props.renderless"
            @update:height="(height) => handleItemResize(item.index, height)"
        >
            <slot v-bind="{ item: item.raw, index: item.index }"  />
        </ev-virtual-scroll-item>
        <div class="ev-virtual-scroll--spacer"
             :style="{ paddingBottom: toWebUnit(paddingBottom) }"
        ></div>
    </template>

    <div v-else
         ref="containerRef"
         :class="[
             'ev-virtual-scroll',
             props.class
         ]"
         :style="[
             dimensionStyles,
             props.style
         ]"
         @scroll="handleScroll"
    >
        <div class="ev-virtual-scroll--container"
             :style="[{
                 paddingTop: toWebUnit(paddingTop),
                 paddingBottom: toWebUnit(paddingBottom)
             }]"
        >
            <ev-virtual-scroll-item
                v-for="item in computedItems"
                :key="item.index"
                :renderless="props.renderless"
                @update:height="(height) => handleItemResize(item.index, height)"
            >
                <slot v-bind="{ item: item.raw, index: item.index }"  />
            </ev-virtual-scroll-item>
        </div>
    </div>

</template>