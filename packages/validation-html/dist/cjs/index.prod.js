Object.defineProperty(exports,"__esModule",{value:!0});var t,e=require("@aurelia/kernel"),r=require("@aurelia/validation"),i=require("@aurelia/runtime-html"),s=require("@aurelia/runtime");
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function o(t,e,r,i){var s,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(n=(o<3?s(n):o>3?s(e,r,n):s(e,r))||n);return o>3&&n&&Object.defineProperty(e,r,n),n}function n(t,e){return function(r,i){e(r,i,t)}}exports.ValidateEventKind=void 0,(t=exports.ValidateEventKind||(exports.ValidateEventKind={})).validate="validate",t.reset="reset";class a{constructor(t,e,r){this.valid=t,this.results=e,this.instruction=r}}class l{constructor(t,e){this.result=t,this.targets=e}}class d{constructor(t,e,r){this.kind=t,this.addedResults=e,this.removedResults=r}}class u{constructor(t,e,r,i){this.target=t,this.scope=e,this.rules=r,this.propertyInfo=i}}class c{constructor(t,e){this.object=t,this.propertyName=e}}function h(t,e,r=0){let i=e.propertyInfo;if(void 0!==i)return i;const s=e.scope;let o=t.sourceExpression.expression;const n=t.locator;let a,l=!0,d="";for(;void 0!==o&&10082!==(null==o?void 0:o.$kind);){let t;switch(o.$kind){case 38962:case 36913:o=o.expression;continue;case 9323:t=o.name;break;case 9324:{const e=o.key;l&&(l=17925===e.$kind),t=`[${e.evaluate(r,s,n,null).toString()}]`;break}default:throw new Error(`Unknown expression of type ${o.constructor.name}`)}const e=d.startsWith("[")?"":".";d=0===d.length?t:`${t}${e}${d}`,o=o.object}if(void 0===o)throw new Error(`Unable to parse binding expression: ${t.sourceExpression.expression}`);return 0===d.length?(d=o.name,a=s.bindingContext):a=o.evaluate(r,s,n,null),null!=a?(i=new c(a,d),l&&(e.propertyInfo=i),i):void 0}const g=e.DI.createInterface("IValidationController");exports.ValidationController=class{constructor(t,e,r,i){this.validator=t,this.parser=e,this.platform=r,this.locator=i,this.bindings=new Map,this.subscribers=new Set,this.results=[],this.validating=!1,this.elements=new WeakMap,this.objects=new Map}addObject(t,e){this.objects.set(t,e)}removeObject(t){this.objects.delete(t),this.processResultDelta("reset",this.results.filter((e=>e.object===t)),[])}addError(t,e,i){let s;void 0!==i&&([s]=r.parsePropertyName(i,this.parser));const o=new r.ValidationResult(!1,t,s,e,void 0,void 0,!0);return this.processResultDelta("validate",[],[o]),o}removeError(t){this.results.includes(t)&&this.processResultDelta("reset",[t],[])}addSubscriber(t){this.subscribers.add(t)}removeSubscriber(t){this.subscribers.delete(t)}registerBinding(t,e){this.bindings.set(t,e)}unregisterBinding(t){this.resetBinding(t),this.bindings.delete(t)}async validate(t){var e;const{object:i,objectTag:s,flags:o}=null!=t?t:{};let n;n=void 0!==i?[new r.ValidateInstruction(i,t.propertyName,null!==(e=t.rules)&&void 0!==e?e:this.objects.get(i),s,t.propertyTag)]:[...Array.from(this.objects.entries()).map((([t,e])=>new r.ValidateInstruction(t,void 0,e,s))),...(s?[]:Array.from(this.bindings.entries())).reduce(((t,[e,i])=>{const s=h(e,i,o);return void 0===s||this.objects.has(s.object)||t.push(new r.ValidateInstruction(s.object,s.propertyName,i.rules)),t}),[])],this.validating=!0;return this.platform.domReadQueue.queueTask((async()=>{try{const e=(await Promise.all(n.map((async t=>this.validator.validate(t))))).reduce(((t,e)=>(t.push(...e),t)),[]),r=this.getInstructionPredicate(t),i=this.results.filter(r);return this.processResultDelta("validate",i,e),new a(void 0===e.find((t=>!t.valid)),e,t)}finally{this.validating=!1}})).result}reset(t){const e=this.getInstructionPredicate(t),r=this.results.filter(e);this.processResultDelta("reset",r,[])}async validateBinding(t){if(!t.isBound)return;const e=this.bindings.get(t);if(void 0===e)return;const i=h(t,e),s=e.rules;if(void 0===i)return;const{object:o,propertyName:n}=i;await this.validate(new r.ValidateInstruction(o,n,s))}resetBinding(t){const e=this.bindings.get(t);if(void 0===e)return;const i=h(t,e);if(void 0===i)return;e.propertyInfo=void 0;const{object:s,propertyName:o}=i;this.reset(new r.ValidateInstruction(s,o))}async revalidateErrors(){const t=this.results.reduce(((t,{isManual:e,object:r,propertyRule:i,rule:s,valid:o})=>{if(!o&&!e&&void 0!==i&&void 0!==r&&void 0!==s){let e=t.get(r);void 0===e&&t.set(r,e=new Map);let o=e.get(i);void 0===o&&e.set(i,o=[]),o.push(s)}return t}),new Map),e=[];for(const[i,s]of t)e.push(this.validate(new r.ValidateInstruction(i,void 0,Array.from(s).map((([{validationRules:t,messageProvider:e,property:i},s])=>new r.PropertyRule(this.locator,t,e,i,[s]))))));await Promise.all(e)}getInstructionPredicate(t){if(void 0===t)return()=>!0;const e=t.propertyName,r=t.rules;return i=>!i.isManual&&i.object===t.object&&(void 0===e||i.propertyName===e)&&(void 0===r||r.includes(i.propertyRule)||r.some((t=>void 0===i.propertyRule||t.$rules.flat().every((t=>i.propertyRule.$rules.flat().includes(t))))))}getAssociatedElements({object:t,propertyName:e}){const r=[];for(const[i,s]of this.bindings.entries()){const o=h(i,s);void 0!==o&&o.object===t&&o.propertyName===e&&r.push(s.target)}return r}processResultDelta(t,e,r){const i=new d(t,[],[]);r=r.slice(0);const s=this.elements;for(const t of e){const e=s.get(t);s.delete(t),i.removedResults.push(new l(t,e));const o=r.findIndex((e=>e.rule===t.rule&&e.object===t.object&&e.propertyName===t.propertyName));if(-1===o)this.results.splice(this.results.indexOf(t),1);else{const e=r.splice(o,1)[0],n=this.getAssociatedElements(e);s.set(e,n),i.addedResults.push(new l(e,n)),this.results.splice(this.results.indexOf(t),1,e)}}for(const t of r){const e=this.getAssociatedElements(t);i.addedResults.push(new l(t,e)),s.set(t,e),this.results.push(t)}for(const t of this.subscribers)t.handleValidationEvent(i)}},exports.ValidationController=o([n(0,r.IValidator),n(1,s.IExpressionParser),n(2,i.IPlatform),n(3,e.IServiceLocator)],exports.ValidationController);class p{constructor(){this.Type=void 0}registerTransformer(t){return!1}construct(t,e){return void 0!==e?Reflect.construct(exports.ValidationController,e):new exports.ValidationController(t.get(r.IValidator),t.get(s.IExpressionParser),t.get(i.IPlatform),t)}}function v(t,e){switch(2&t.compareDocumentPosition(e)){case 0:return 0;case 2:return 1;default:return-1}}const f="\n<slot></slot>\n<slot name='secondary'>\n  <span repeat.for=\"error of errors\">\n    ${error.result.message}\n  </span>\n</slot>\n",b={name:"validation-container",shadowOptions:{mode:"open"},hasSlots:!0};var m;exports.ValidationContainerCustomElement=class{constructor(t,e){this.host=t,this.scopedController=e,this.errors=[]}handleValidationEvent(t){for(const{result:e}of t.removedResults){const t=this.errors.findIndex((t=>t.result===e));-1!==t&&this.errors.splice(t,1)}for(const{result:e,targets:r}of t.addedResults){if(e.valid)continue;const t=r.filter((t=>this.host.contains(t)));t.length>0&&this.errors.push(new l(e,t))}this.errors.sort(((t,e)=>t.targets[0]===e.targets[0]?0:v(t.targets[0],e.targets[0])))}binding(){var t;this.controller=null!==(t=this.controller)&&void 0!==t?t:this.scopedController,this.controller.addSubscriber(this)}unbinding(){this.controller.removeSubscriber(this)}},o([i.bindable],exports.ValidationContainerCustomElement.prototype,"controller",void 0),o([i.bindable],exports.ValidationContainerCustomElement.prototype,"errors",void 0),exports.ValidationContainerCustomElement=o([n(0,i.INode),n(1,e.optional(g))],exports.ValidationContainerCustomElement),exports.ValidationErrorsCustomAttribute=class{constructor(t,e){this.host=t,this.scopedController=e,this.errors=[],this.errorsInternal=[]}handleValidationEvent(t){for(const{result:e}of t.removedResults){const t=this.errorsInternal.findIndex((t=>t.result===e));-1!==t&&this.errorsInternal.splice(t,1)}for(const{result:e,targets:r}of t.addedResults){if(e.valid)continue;const t=r.filter((t=>this.host.contains(t)));t.length>0&&this.errorsInternal.push(new l(e,t))}this.errorsInternal.sort(((t,e)=>t.targets[0]===e.targets[0]?0:v(t.targets[0],e.targets[0]))),this.errors=this.errorsInternal}binding(){var t;this.controller=null!==(t=this.controller)&&void 0!==t?t:this.scopedController,this.controller.addSubscriber(this)}unbinding(){this.controller.removeSubscriber(this)}},o([i.bindable],exports.ValidationErrorsCustomAttribute.prototype,"controller",void 0),o([i.bindable({primary:!0,mode:i.BindingMode.twoWay})],exports.ValidationErrorsCustomAttribute.prototype,"errors",void 0),exports.ValidationErrorsCustomAttribute=o([i.customAttribute("validation-errors"),n(0,i.INode),n(1,e.optional(g))],exports.ValidationErrorsCustomAttribute),exports.ValidationTrigger=void 0,(m=exports.ValidationTrigger||(exports.ValidationTrigger={})).manual="manual",m.blur="blur",m.focusout="focusout",m.change="change",m.changeOrBlur="changeOrBlur",m.changeOrFocusout="changeOrFocusout";const y=e.DI.createInterface("IDefaultTrigger");exports.ValidateBindingBehavior=class extends i.BindingInterceptor{constructor(t,e){super(t,e),this.binding=t,this.propertyBinding=void 0,this.target=void 0,this.isChangeTrigger=!1,this.triggerMediator=new i.BindingMediator("handleTriggerChange",this,this.observerLocator,this.locator),this.controllerMediator=new i.BindingMediator("handleControllerChange",this,this.observerLocator,this.locator),this.rulesMediator=new i.BindingMediator("handleRulesChange",this,this.observerLocator,this.locator),this.isDirty=!1,this.validatedOnce=!1,this.triggerEvent=null,this.task=null;const r=this.locator;this.platform=r.get(i.IPlatform),this.defaultTrigger=r.get(y),r.has(g,!0)&&(this.scopedController=r.get(g)),this.setPropertyBinding()}updateSource(t,e){this.interceptor!==this?this.interceptor.updateSource(t,e):this.propertyBinding.updateSource(t,e),this.isDirty=!0;const r=this.triggerEvent;this.isChangeTrigger&&(null===r||null!==r&&this.validatedOnce)&&this.validateBinding()}handleEvent(t){(!this.isChangeTrigger||this.isChangeTrigger&&this.isDirty)&&this.validateBinding()}$bind(t,e){this.scope=e,this.binding.$bind(t,e),this.setTarget();const r=this.processBindingExpressionArgs(t);this.processDelta(r)}$unbind(t){var e,r,i,s;null===(e=this.task)||void 0===e||e.cancel(),this.task=null;const o=this.triggerEvent;null!==o&&(null===(r=this.target)||void 0===r||r.removeEventListener(o,this)),null===(i=this.controller)||void 0===i||i.removeSubscriber(this),null===(s=this.controller)||void 0===s||s.unregisterBinding(this.propertyBinding),this.binding.$unbind(t)}handleTriggerChange(t,e,r){this.processDelta(new x(void 0,this.ensureTrigger(t),void 0))}handleControllerChange(t,e,r){this.processDelta(new x(this.ensureController(t),void 0,void 0))}handleRulesChange(t,e,r){this.processDelta(new x(void 0,void 0,this.ensureRules(t)))}handleValidationEvent(t){var e;const r=null===(e=this.bindingInfo.propertyInfo)||void 0===e?void 0:e.propertyName;void 0!==r&&null!==this.triggerEvent&&this.isChangeTrigger&&(this.validatedOnce=void 0!==t.addedResults.find((t=>t.result.propertyName===r)))}processBindingExpressionArgs(t){const e=this.scope,r=this.locator;let i,s,o,n=this.propertyBinding.sourceExpression;for(;"validate"!==n.name&&void 0!==n;)n=n.expression;const a=1|t,l=n.args;for(let t=0,n=l.length;t<n;t++){const n=l[t];switch(t){case 0:s=this.ensureTrigger(n.evaluate(a,e,r,this.triggerMediator));break;case 1:o=this.ensureController(n.evaluate(a,e,r,this.controllerMediator));break;case 2:i=this.ensureRules(n.evaluate(a,e,r,this.rulesMediator));break;default:throw new Error(`Unconsumed argument#${t+1} for validate binding behavior: ${n.evaluate(a,e,r,null)}`)}}return new x(this.ensureController(o),this.ensureTrigger(s),i)}validateBinding(){const t=this.task;this.task=this.platform.domReadQueue.queueTask((()=>this.controller.validateBinding(this.propertyBinding))),t!==this.task&&(null==t||t.cancel())}processDelta(t){var e,r,i,s;const o=null!==(e=t.trigger)&&void 0!==e?e:this.trigger,n=null!==(r=t.controller)&&void 0!==r?r:this.controller,a=t.rules;if(this.trigger!==o){let t=this.triggerEvent;null!==t&&this.target.removeEventListener(t,this),this.validatedOnce=!1,this.isDirty=!1,this.trigger=o,this.isChangeTrigger=o===exports.ValidationTrigger.change||o===exports.ValidationTrigger.changeOrBlur||o===exports.ValidationTrigger.changeOrFocusout,t=this.setTriggerEvent(this.trigger),null!==t&&this.target.addEventListener(t,this)}this.controller===n&&void 0===a||(null===(i=this.controller)||void 0===i||i.removeSubscriber(this),null===(s=this.controller)||void 0===s||s.unregisterBinding(this.propertyBinding),this.controller=n,n.registerBinding(this.propertyBinding,this.setBindingInfo(a)),n.addSubscriber(this))}ensureTrigger(t){if(null==t)t=this.defaultTrigger;else if(!Object.values(exports.ValidationTrigger).includes(t))throw new Error(`${t} is not a supported validation trigger`);return t}ensureController(t){if(null==t)t=this.scopedController;else if(!(t instanceof exports.ValidationController))throw new Error(`${t} is not of type ValidationController`);return t}ensureRules(t){if(Array.isArray(t)&&t.every((t=>t instanceof r.PropertyRule)))return t}setPropertyBinding(){let t=this.binding;for(;!(t instanceof i.PropertyBinding)&&void 0!==t;)t=t.binding;if(void 0===t)throw new Error("Unable to set property binding");this.propertyBinding=t}setTarget(){var t;const e=this.propertyBinding.target;if(e instanceof this.platform.Node)this.target=e;else{const r=null===(t=e)||void 0===t?void 0:t.$controller;if(void 0===r)throw new Error("Invalid binding target");this.target=r.host}}setTriggerEvent(t){let e=null;switch(t){case exports.ValidationTrigger.blur:case exports.ValidationTrigger.changeOrBlur:e="blur";break;case exports.ValidationTrigger.focusout:case exports.ValidationTrigger.changeOrFocusout:e="focusout"}return this.triggerEvent=e}setBindingInfo(t){return this.bindingInfo=new u(this.target,this.scope,t)}},exports.ValidateBindingBehavior=o([i.bindingBehavior("validate")],exports.ValidateBindingBehavior);class x{constructor(t,e,r){this.controller=t,this.trigger=e,this.rules=r}}function C(){return{...r.getDefaultValidationConfiguration(),ValidationControllerFactoryType:p,DefaultTrigger:exports.ValidationTrigger.focusout,UseSubscriberCustomAttribute:!0,SubscriberCustomElementTemplate:f}}const V=function t(s){return{optionsProvider:s,register(t){const o=C();s(o),t.registerFactory(g,new o.ValidationControllerFactoryType),t.register(r.ValidationConfiguration.customize((t=>{for(const e of Object.keys(t))e in o&&(t[e]=o[e])})),e.Registration.instance(y,o.DefaultTrigger),exports.ValidateBindingBehavior),o.UseSubscriberCustomAttribute&&t.register(exports.ValidationErrorsCustomAttribute);const n=o.SubscriberCustomElementTemplate;return n&&t.register(i.CustomElement.define({...b,template:n},exports.ValidationContainerCustomElement)),t},customize:e=>t(null!=e?e:s)}}(e.noop);exports.ValidationResultPresenterService=class{constructor(t){this.platform=t}handleValidationEvent(t){for(const[e,r]of this.reverseMap(t.removedResults))this.remove(e,r);for(const[e,r]of this.reverseMap(t.addedResults))this.add(e,r)}remove(t,e){const r=this.getValidationMessageContainer(t);null!==r&&this.removeResults(r,e)}add(t,e){const r=this.getValidationMessageContainer(t);null!==r&&this.showResults(r,e)}getValidationMessageContainer(t){const e=t.parentElement;if(null===e)return null;let r=e.querySelector("[validation-result-container]");return null===r&&(r=this.platform.document.createElement("div"),r.setAttribute("validation-result-container",""),e.appendChild(r)),r}showResults(t,e){t.append(...e.reduce(((t,e)=>{if(!e.valid){const r=this.platform.document.createElement("span");r.setAttribute("validation-result-id",e.id.toString()),r.textContent=e.message,t.push(r)}return t}),[]))}removeResults(t,e){var r;for(const i of e)i.valid||null===(r=t.querySelector(`[validation-result-id="${i.id}"]`))||void 0===r||r.remove()}reverseMap(t){const e=new Map;for(const{result:r,targets:i}of t)for(const t of i){let i=e.get(t);void 0===i&&e.set(t,i=[]),i.push(r)}return e}},exports.ValidationResultPresenterService=o([n(0,i.IPlatform)],exports.ValidationResultPresenterService),exports.BindingInfo=u,exports.ControllerValidateResult=a,exports.IDefaultTrigger=y,exports.IValidationController=g,exports.ValidationControllerFactory=p,exports.ValidationEvent=d,exports.ValidationHtmlConfiguration=V,exports.ValidationResultTarget=l,exports.defaultContainerDefinition=b,exports.defaultContainerTemplate=f,exports.getDefaultValidationHtmlConfiguration=C,exports.getPropertyInfo=h;
