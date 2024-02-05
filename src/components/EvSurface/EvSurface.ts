import {makeClassName, propsFactory} from "@/util";
import {makeDimensionsProps} from "@/composables/dimensions.ts";
import {PropType} from "vue";

/**
 * # Surface Elevation
 *
 * Elevations are the layered surfaces that form the foundation of the UI.
 * They create a blank canvas containing other UI components.
 * Such as text, icons, backgrounds, and borders.
 *
 */
export type SurfaceElevation = 'default'
    | 'panel'
    | 'overlay'
    | 'sunken';

/**
 * # Make Elevation Class
 */
export function makeElevationClass(elevation: string) {
    return makeClassName(elevation, 'elevation');
}

/**
 * # Make Surface Props
 */
export const makeEvSurfaceProps = propsFactory({
    elevation: {
        type: String as PropType<SurfaceElevation>,
        default: 'default'
    },
    // Rounded
    rounded: {
        type: [String, Number, Boolean],
        default: undefined
    },
    // Scrollable
    scrollable: {
        type: [String, Boolean],
        default: undefined
    },
    ...makeDimensionsProps()
}, 'EvSurface');