/**
 * Lange's edit
 */

import "@polymer/polymer/lib/utils/mixin.js";
import "@polymer/polymer/lib/utils/style-gather.js";
import "@polymer/polymer/lib/utils/resolve-url.js";
import "@polymer/polymer/lib/elements/dom-module.js";

import type { PropertiesMixin } from "@polymer/polymer/lib/mixins/properties-mixin.js";
import type { PropertyEffects } from "@polymer/polymer/lib/mixins/property-effects.js";

export { ElementMixin };

/**
 * Element class mixin that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * Subclassers may provide the following static getters to return metadata
 * used to configure Polymer's features for the class:
 *
 * - `static get is()`: When the template is provided via a `dom-module`,
 *   users should return the `dom-module` id from a static `is` getter.  If
 *   no template is needed or the template is provided directly via the
 *   `template` getter, there is no need to define `is` for the element.
 *
 * - `static get template()`: Users may provide the template directly (as
 *   opposed to via `dom-module`) by implementing a static `template` getter.
 *   The getter must return an `HTMLTemplateElement`.
 *
 * - `static get properties()`: Should return an object describing
 *   property-related metadata used by Polymer features (key: property name
 *   value: object containing property metadata). Valid keys in per-property
 *   metadata include:
 *   - `type` (String|Number|Object|Array|...): Used by
 *     `attributeChangedCallback` to determine how string-based attributes
 *     are deserialized to JavaScript property values.
 *   - `notify` (boolean): Causes a change in the property to fire a
 *     non-bubbling event called `<property>-changed`. Elements that have
 *     enabled two-way binding to the property use this event to observe changes.
 *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
 *     To set a read-only property, use the private setter method
 *     `_setProperty(property, value)`.
 *   - `observer` (string): Observer method name that will be called when
 *     the property changes. The arguments of the method are
 *     `(value, previousValue)`.
 *   - `computed` (string): String describing method and dependent properties
 *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
 *     Computed properties are read-only by default and can only be changed
 *     via the return value of the computing method.
 *
 * - `static get observers()`: Array of strings describing multi-property
 *   observer methods and their dependent properties (e.g.
 *   `'observeABC(a, b, c)'`).
 *
 * The base class provides default implementations for the following standard
 * custom element lifecycle callbacks; users may override these, but should
 * call the super method to ensure
 * - `constructor`: Run when the element is created or upgraded
 * - `connectedCallback`: Run each time the element is connected to the
 *   document
 * - `disconnectedCallback`: Run each time the element is disconnected from
 *   the document
 * - `attributeChangedCallback`: Run each time an attribute in
 *   `observedAttributes` is set or removed (note: this element's default
 *   `observedAttributes` implementation will automatically return an array
 *   of dash-cased attributes based on `properties`)
 */
declare function ElementMixin<T extends new (...args: any[]) => void>(
	base: T,
): T &
	ElementMixinConstructor &
	PropertyEffectsConstructor &
	TemplateStampConstructor &
	PropertyAccessorsConstructor &
	PropertiesChangedConstructor &
	PropertiesMixinConstructor;

import type {
	PropertiesChanged,
	PropertiesChangedConstructor,
} from "@polymer/polymer/lib/mixins/properties-changed.js";
import type { PropertiesMixinConstructor } from "@polymer/polymer/lib/mixins/properties-mixin.js";
import type {
	PropertyAccessors,
	PropertyAccessorsConstructor,
} from "@polymer/polymer/lib/mixins/property-accessors.js";
import type { PropertyEffectsConstructor } from "@polymer/polymer/lib/mixins/property-effects.js";
import type {
	TemplateStamp,
	TemplateStampConstructor,
} from "@polymer/polymer/lib/mixins/template-stamp.js";

export interface ElementMixinConstructor {
	new (...args: any[]): ElementMixin;

	/**
	 * Overrides `PropertyEffects` to add map of dynamic functions on
	 * template info, for consumption by `PropertyEffects` template binding
	 * code. This map determines which method templates should have accessors
	 * created for them.
	 *
	 * @param template Template
	 * @param templateInfo Template metadata for current template
	 * @param nodeInfo Node metadata for current template.
	 * @returns .
	 */
	_parseTemplateContent(
		template: HTMLTemplateElement,
		templateInfo: TemplateInfo,
		nodeInfo: NodeInfo,
	): boolean;

	/**
	 * Override of PropertiesChanged createProperties to create accessors
	 * and property effects for all of the properties.
	 *
	 * @param props .
	 */
	createProperties(props: Record<string, unknown>): void;

	/**
	 * Overrides `PropertyEffects` to warn on use of undeclared properties in
	 * template.
	 *
	 * @param templateInfo Template metadata to add effect to
	 * @param prop Property that should trigger the effect
	 * @param effect Effect metadata object
	 */
	_addTemplatePropertyEffect(
		templateInfo: Record<string, unknown> | undefined,
		prop: string,
		effect?: Record<string, unknown>,
	): void;

	/**
	 * Override of PropertiesMixin _finalizeClass to create observers and
	 * find the template.
	 */
	_finalizeClass(): void;
	_prepareTemplate(): void;

	/**
	 * Creates observers for the given `observers` array.
	 * Leverages `PropertyEffects` to create observers.
	 *
	 * @param observers Array of observer descriptors for
	 *   this class
	 * @param dynamicFns Object containing keys for any properties
	 *   that are functions and should trigger the effect when the function
	 *   reference is changed
	 */
	createObservers(
		observers: Record<string, unknown> | undefined,
		dynamicFns: Record<string, unknown> | undefined,
	): void;

	/**
	 * Gather style text for a style element in the template.
	 *
	 * @param cssText Text containing styling to process
	 * @param baseURI Base URI to rebase CSS paths against
	 * @returns The processed CSS text
	 */
	_processStyleText(cssText: string, baseURI: string): string;

	/**
	 * Configures an element `proto` to function with a given `template`.
	 * The element name `is` and extends `ext` must be specified for ShadyCSS
	 * style scoping.
	 *
	 * @param is Tag name (or type extension name) for this element
	 */
	_finalizeTemplate(is: string): void;
}

type ElementMixin = {
	/**
	 * Lange: Yeah I kinda gave up here and just wanted to be done.
	 *
	 * This is because I need to just wrap up this TS port,
	 * and this part of the UI will be rewritten in React eventually anyway.
	 */
	[k: string]: any;

	_template: HTMLTemplateElement | undefined;
	_importPath: string;
	rootPath: string;
	importPath: string;
	root: StampedTemplate | HTMLElement | ShadowRoot | undefined;

	/**
	 * Lange: I modified  this from "Element" to "any".
	 */
	$: Record<string, any>;

	/**
	 * Stamps the element template.
	 */
	ready(): void;

	/**
	 * Overrides the default `PropertyAccessors` to ensure class
	 * metaprogramming related to property accessors and effects has
	 * completed (calls `finalize`).
	 *
	 * It also initializes any property defaults provided via `value` in
	 * `properties` metadata.
	 */
	_initializeProperties(): void;

	/**
	 * Implements `PropertyEffects`'s `_readyClients` call. Attaches
	 * element dom by calling `_attachDom` with the dom stamped from the
	 * element's template via `_stampTemplate`. Note that this allows
	 * client dom to be attached to the element prior to any observers
	 * running.
	 */
	_readyClients(): void;

	/**
	 * Provides a default implementation of the standard Custom Elements
	 * `connectedCallback`.
	 *
	 * The default implementation enables the property effects system and
	 * flushes any pending properties, and updates shimmed CSS properties
	 * when using the ShadyCSS scoping/custom properties polyfill.
	 */
	connectedCallback(): void;

	/**
	 * Attaches an element's stamped dom to itself. By default,
	 * this method creates a `shadowRoot` and adds the dom to it.
	 * However, this method may be overridden to allow an element
	 * to put its dom in another location.
	 *
	 * @param dom to attach to the element.
	 * @returns node to which the dom has been attached.
	 */
	_attachDom(dom: StampedTemplate | undefined): ShadowRoot | undefined;

	/**
	 * When using the ShadyCSS scoping and custom property shim, causes all
	 * shimmed styles in this element (and its subtree) to be updated
	 * based on current custom property values.
	 *
	 * The optional parameter overrides inline custom property styles with an
	 * object of properties where the keys are CSS properties, and the values
	 * are strings.
	 *
	 * Example: `this.updateStyles({'--color': 'blue'})`
	 *
	 * These properties are retained unless a value of `null` is set.
	 *
	 * Note: This function does not support updating CSS mixins.
	 * You can not dynamically change the value of an `@apply`.
	 *
	 * @param properties Bag of custom property key/values to
	 *   apply to this element.
	 */
	updateStyles(properties?: Record<string, unknown>): void;

	/**
	 * Rewrites a given URL relative to a base URL. The base URL defaults to
	 * the original location of the document containing the `dom-module` for
	 * this element. This method will return the same URL before and after
	 * bundling.
	 *
	 * Note that this function performs no resolution for URLs that start
	 * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
	 * URL resolution, use `window.URL`.
	 *
	 * @param url URL to resolve.
	 * @param base Optional base URL to resolve against, defaults
	 * to the element's `importPath`
	 * @returns Rewritten URL relative to base
	 */
	resolveUrl(url: string, base?: string): string;
} & PropertyEffects &
	TemplateStamp &
	PropertyAccessors &
	PropertiesChanged &
	PropertiesMixin;

export { updateStyles };

/**
 * When using the ShadyCSS scoping and custom property shim, causes all
 * shimmed `styles` (via `custom-style`) in the document (and its subtree)
 * to be updated based on current custom property values.
 *
 * The optional parameter overrides inline custom property styles with an
 * object of properties where the keys are CSS properties, and the values
 * are strings.
 *
 * Example: `updateStyles({'--color': 'blue'})`
 *
 * These properties are retained unless a value of `null` is set.
 */
declare function updateStyles(props?: Record<string, unknown>): void;

import type { TemplateInfo } from "@polymer/polymer/interfaces";
import type { NodeInfo } from "@polymer/polymer/interfaces";
import type { StampedTemplate } from "@polymer/polymer/interfaces";
