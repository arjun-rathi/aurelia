Object.defineProperty(exports,"__esModule",{value:!0});var t=require("@aurelia/kernel"),e=require("@aurelia/runtime-html"),r=require("@aurelia/runtime");function n(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var s,i,a=n(require("i18next"));
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
***************************************************************************** */function o(t,e,r,n){var s,i=arguments.length,a=i<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,r,n);else for(var o=t.length-1;o>=0;o--)(s=t[o])&&(a=(i<3?s(a):i>3?s(e,r,a):s(e,r))||a);return i>3&&a&&Object.defineProperty(e,r,a),a}function l(t,e){return function(r,n){e(r,n,t)}}function c(t,e){const n=e.sourceExpression.expression;if(!(n instanceof r.ValueConverterExpression)){const s=new r.ValueConverterExpression(n,t,e.sourceExpression.args);e.sourceExpression.expression=s}}exports.Signals=void 0,(s=exports.Signals||(exports.Signals={})).I18N_EA_CHANNEL="i18n:locale:changed",s.I18N_SIGNAL="aurelia-translation-signal",s.RT_SIGNAL="aurelia-relativetime-signal",function(t){t.translationValueConverterName="t",t.dateFormatValueConverterName="df",t.numberFormatValueConverterName="nf",t.relativeTimeValueConverterName="rt"}(i||(i={})),exports.DateFormatBindingBehavior=class{bind(t,e,r){c("df",r)}},exports.DateFormatBindingBehavior=o([r.bindingBehavior("df")],exports.DateFormatBindingBehavior);const p=t.DI.createInterface("I18nInitOptions"),h=t.DI.createInterface("I18nextWrapper");class u{constructor(){this.i18next=a.default}}var d;!function(t){t[t.Second=1e3]="Second",t[t.Minute=6e4]="Minute",t[t.Hour=36e5]="Hour",t[t.Day=864e5]="Day",t[t.Week=6048e5]="Week",t[t.Month=2592e6]="Month",t[t.Year=31536e6]="Year"}(d||(d={}));class m{constructor(t){this.value=void 0;this.attributes=[];const e=/\[([a-z\-, ]*)\]/gi.exec(t);e&&(t=t.replace(e[0],""),this.attributes=e[1].split(",")),this.key=t}}const g=t.DI.createInterface("I18N");var x;exports.I18nService=class{constructor(t,e,r,n){this.ea=r,this.signaler=n,this.localeSubscribers=new Set,this.i18next=t.i18next,this.initPromise=this.initializeI18next(e)}evaluate(t,e){const r=t.split(";"),n=[];for(const t of r){const r=new m(t),s=r.key,i=this.tr(s,e);this.options.skipTranslationOnMissingKey&&i===s?console.warn(`Couldn't find translation for key: ${s}`):(r.value=i,n.push(r))}return n}tr(t,e){return this.i18next.t(t,e)}getLocale(){return this.i18next.language}async setLocale(t){const e={oldLocale:this.getLocale(),newLocale:t};await this.i18next.changeLanguage(t),this.ea.publish("i18n:locale:changed",e),this.localeSubscribers.forEach((t=>t.handleLocaleChange(e))),this.signaler.dispatchSignal("aurelia-translation-signal")}createNumberFormat(t,e){return Intl.NumberFormat(e||this.getLocale(),t)}nf(t,e,r){return this.createNumberFormat(e,r).format(t)}createDateTimeFormat(t,e){return Intl.DateTimeFormat(e||this.getLocale(),t)}df(t,e,r){return this.createDateTimeFormat(e,r).format(t)}uf(t,e){const r=this.nf(1e4/3,void 0,e);let n=r[1];const s=r[5];"."===n&&(n="\\.");const i=t.replace(new RegExp(n,"g"),"").replace(/[^\d.,-]/g,"").replace(s,".");return Number(i)}createRelativeTimeFormat(t,e){return new Intl.RelativeTimeFormat(e||this.getLocale(),t)}rt(t,e,r){let n=t.getTime()-this.now();const s=this.options.rtEpsilon*(n>0?1:0),i=this.createRelativeTimeFormat(e,r);let a=n/31536e6;return Math.abs(a+s)>=1?i.format(Math.round(a),"year"):(a=n/2592e6,Math.abs(a+s)>=1?i.format(Math.round(a),"month"):(a=n/6048e5,Math.abs(a+s)>=1?i.format(Math.round(a),"week"):(a=n/864e5,Math.abs(a+s)>=1?i.format(Math.round(a),"day"):(a=n/36e5,Math.abs(a+s)>=1?i.format(Math.round(a),"hour"):(a=n/6e4,Math.abs(a+s)>=1?i.format(Math.round(a),"minute"):(n=Math.abs(n)<1e3?1e3:n,a=n/1e3,i.format(Math.round(a),"second")))))))}subscribeLocaleChange(t){this.localeSubscribers.add(t)}now(){return(new Date).getTime()}async initializeI18next(t){this.options={lng:"en",fallbackLng:["en"],debug:!1,plugins:[],rtEpsilon:.01,skipTranslationOnMissingKey:!1,...t};for(const t of this.options.plugins)this.i18next.use(t);await this.i18next.init(this.options)}},exports.I18nService=o([l(0,h),l(1,p),l(2,t.IEventAggregator),l(3,r.ISignaler)],exports.I18nService),exports.DateFormatValueConverter=class{constructor(t){this.i18n=t,this.signals=["aurelia-translation-signal"]}toView(t,e,r){if(!t&&0!==t||"string"==typeof t&&""===t.trim())return t;if("string"==typeof t){const e=Number(t),r=new Date(Number.isInteger(e)?e:t);if(isNaN(r.getTime()))return t;t=r}return this.i18n.df(t,e,r)}},exports.DateFormatValueConverter=o([r.valueConverter("df"),l(0,g)],exports.DateFormatValueConverter),exports.NumberFormatBindingBehavior=class{bind(t,e,r){c("nf",r)}},exports.NumberFormatBindingBehavior=o([r.bindingBehavior("nf")],exports.NumberFormatBindingBehavior),exports.NumberFormatValueConverter=class{constructor(t){this.i18n=t,this.signals=["aurelia-translation-signal"]}toView(t,e,r){return"number"!=typeof t?t:this.i18n.nf(t,e,r)}},exports.NumberFormatValueConverter=o([r.valueConverter("nf"),l(0,g)],exports.NumberFormatValueConverter),exports.RelativeTimeBindingBehavior=class{bind(t,e,r){c("rt",r)}},exports.RelativeTimeBindingBehavior=o([r.bindingBehavior("rt")],exports.RelativeTimeBindingBehavior),exports.RelativeTimeValueConverter=class{constructor(t){this.i18n=t,this.signals=["aurelia-translation-signal","aurelia-relativetime-signal"]}toView(t,e,r){return t instanceof Date?this.i18n.rt(t,e,r):t}},exports.RelativeTimeValueConverter=o([r.valueConverter("rt"),l(0,g)],exports.RelativeTimeValueConverter),exports.TranslationBindingBehavior=class{bind(t,r,n){const s=n.sourceExpression.expression;if(!(s instanceof e.ValueConverterExpression)){const t=new e.ValueConverterExpression(s,"t",n.sourceExpression.args);n.sourceExpression.expression=t}}},exports.TranslationBindingBehavior=o([e.bindingBehavior("t")],exports.TranslationBindingBehavior);const b=["textContent","innerHTML","prepend","append"],v=new Map([["text","textContent"],["html","innerHTML"]]),f={optional:!0},T={reusable:!1,preempt:!0};exports.TranslationBinding=x=class{constructor(t,e,r,n){this.observerLocator=e,this.locator=r,this.interceptor=this,this.isBound=!1,this.contentAttributes=b,this.task=null,this.parameter=null,this.target=t,this.i18n=this.locator.get(g),this.platform=n,this.targetAccessors=new Set,this.i18n.subscribeLocaleChange(this)}static create({parser:t,observerLocator:r,context:n,controller:s,target:i,instruction:a,platform:o,isParameterContext:l}){const c=this.getBinding({observerLocator:r,context:n,controller:s,target:i,platform:o}),p="string"==typeof a.from?t.parse(a.from,53):a.from;if(l)c.useParameter(p);else{const r=p instanceof e.CustomExpression?t.parse(p.value,2048):void 0;c.expr=r||p}}static getBinding({observerLocator:t,context:e,controller:r,target:n,platform:s}){let i=r.bindings&&r.bindings.find((t=>t instanceof x&&t.target===n));return i||(i=new x(n,t,e,s),r.addBinding(i)),i}$bind(t,r){var n;if(!this.expr)throw new Error("key expression is missing");this.scope=r,this.isInterpolation=this.expr instanceof e.Interpolation,this.keyExpression=this.expr.evaluate(t,r,this.locator,this),this.ensureKeyExpression(),null===(n=this.parameter)||void 0===n||n.$bind(t,r),this.updateTranslations(t),this.isBound=!0}$unbind(t){var e;this.isBound&&(this.expr.hasUnbind&&this.expr.unbind(t,this.scope,this),null===(e=this.parameter)||void 0===e||e.$unbind(t),this.targetAccessors.clear(),null!==this.task&&(this.task.cancel(),this.task=null),this.scope=void 0,this.obs.clear(!0))}handleChange(t,e,r){this.obs.version++,this.keyExpression=this.isInterpolation?this.expr.evaluate(r,this.scope,this.locator,this):t,this.obs.clear(!1),this.ensureKeyExpression(),this.updateTranslations(r)}handleLocaleChange(){this.updateTranslations(0)}useParameter(t){if(null!=this.parameter)throw new Error("This translation parameter has already been specified.");this.parameter=new C(this,t,(t=>this.updateTranslations(t)))}updateTranslations(t){var r;const n=this.i18n.evaluate(this.keyExpression,null===(r=this.parameter)||void 0===r?void 0:r.value),s=Object.create(null),i=[],a=this.task;this.targetAccessors.clear();for(const r of n){const n=r.value,a=this.preprocessAttributes(r.attributes);for(const r of a)if(this.isContentAttribute(r))s[r]=n;else{const s=e.CustomElement.for(this.target,f),a=this.observerLocator.getAccessor(s&&s.viewModel?s.viewModel:this.target,r);0==(2&t)&&(4&a.type)>0?i.push(new B(a,n,t,this.target,r)):a.setValue(n,t,this.target,r),this.targetAccessors.add(a)}}let o=!1;Object.keys(s).length>0&&(o=0==(2&t),o||this.updateContent(s,t)),(i.length>0||o)&&(this.task=this.platform.domWriteQueue.queueTask((()=>{this.task=null;for(const t of i)t.run();o&&this.updateContent(s,t)}),T)),null==a||a.cancel()}preprocessAttributes(t){0===t.length&&(t="IMG"===this.target.tagName?["src"]:["textContent"]);for(const[e,r]of v){const n=t.findIndex((t=>t===e));n>-1&&t.splice(n,1,r)}return t}isContentAttribute(t){return this.contentAttributes.includes(t)}updateContent(e,r){const n=t.toArray(this.target.childNodes),s=[],i="au-i18n";for(const t of n)Reflect.get(t,i)||s.push(t);const a=this.prepareTemplate(e,i,s);this.target.innerHTML="";for(const e of t.toArray(a.content.childNodes))this.target.appendChild(e)}prepareTemplate(t,e,r){var n;const s=this.platform.document.createElement("template");if(this.addContentToTemplate(s,t.prepend,e),!this.addContentToTemplate(s,null!==(n=t.innerHTML)&&void 0!==n?n:t.textContent,e))for(const t of r)s.content.append(t);return this.addContentToTemplate(s,t.append,e),s}addContentToTemplate(e,r,n){if(null!=r){const s=this.platform.document.createElement("div");s.innerHTML=r;for(const r of t.toArray(s.childNodes))Reflect.set(r,n,!0),e.content.append(r);return!0}return!1}ensureKeyExpression(){var t;const e=null!==(t=this.keyExpression)&&void 0!==t?t:this.keyExpression="",r=typeof e;if("string"!==r)throw new Error(`Expected the i18n key to be a string, but got ${e} of type ${r}`)}},exports.TranslationBinding=x=o([e.connectable()],exports.TranslationBinding);class B{constructor(t,e,r,n,s){this.accessor=t,this.v=e,this.f=r,this.el=n,this.attr=s}run(){this.accessor.setValue(this.v,this.f,this.el,this.attr)}}let C=class{constructor(t,e,r){this.owner=t,this.expr=e,this.updater=r,this.interceptor=this,this.isBound=!1,this.observerLocator=t.observerLocator,this.locator=t.locator}handleChange(t,e,r){this.obs.version++,this.value=this.expr.evaluate(r,this.scope,this.locator,this),this.obs.clear(!1),this.updater(r)}$bind(t,e){this.isBound||(this.scope=e,this.expr.hasBind&&this.expr.bind(t,e,this),this.value=this.expr.evaluate(t,e,this.locator,this),this.isBound=!0)}$unbind(t){this.isBound&&(this.expr.hasUnbind&&this.expr.unbind(t,this.scope,this),this.scope=void 0,this.obs.clear(!0))}};C=o([e.connectable()],C);exports.TranslationParametersAttributePattern=class{"t-params.bind"(t,r,n){return new e.AttrSyntax(t,r,"","t-params.bind")}},exports.TranslationParametersAttributePattern=o([e.attributePattern({pattern:"t-params.bind",symbols:""})],exports.TranslationParametersAttributePattern);class y{constructor(t,r){this.from=t,this.to=r,this.type="tpt",this.mode=e.BindingMode.toView}}exports.TranslationParametersBindingCommand=class{constructor(t){this.m=t,this.bindingType=53}static get inject(){return[e.IAttrMapper]}build(e){var r;let n;return n=null==e.bindable?null!==(r=this.m.map(e.node,e.attr.target))&&void 0!==r?r:t.camelCase(e.attr.target):e.bindable.property,new y(e.expr,n)}},exports.TranslationParametersBindingCommand=o([e.bindingCommand("t-params.bind")],exports.TranslationParametersBindingCommand),exports.TranslationParametersBindingRenderer=class{constructor(t,e,r){this.parser=t,this.observerLocator=e,this.platform=r}render(t,e,r,n,s){exports.TranslationBinding.create({parser:this.parser,observerLocator:this.observerLocator,context:r.container,controller:r,target:n,instruction:s,isParameterContext:!0,platform:this.platform})}},exports.TranslationParametersBindingRenderer=o([e.renderer("tpt"),l(0,e.IExpressionParser),l(1,e.IObserverLocator),l(2,e.IPlatform)],exports.TranslationParametersBindingRenderer);class I{static registerAlias(t){this.prototype[t]=function(r,n,s){return new e.AttrSyntax(r,n,"",t)}}}class w{constructor(t,r){this.from=t,this.to=r,this.type="tt",this.mode=e.BindingMode.toView}}class A{constructor(t){this.m=t,this.bindingType=284}static get inject(){return[e.IAttrMapper]}build(e){var r;let n;return n=null==e.bindable?null!==(r=this.m.map(e.node,e.attr.target))&&void 0!==r?r:t.camelCase(e.attr.target):e.bindable.property,new w(e.expr,n)}}exports.TranslationBindingRenderer=class{constructor(t,e,r){this.parser=t,this.observerLocator=e,this.platform=r}render(t,e,r,n,s){exports.TranslationBinding.create({parser:this.parser,observerLocator:this.observerLocator,context:r.container,controller:r,target:n,instruction:s,platform:this.platform})}},exports.TranslationBindingRenderer=o([e.renderer("tt"),l(0,e.IExpressionParser),l(1,e.IObserverLocator),l(2,e.IPlatform)],exports.TranslationBindingRenderer);class L{static registerAlias(t){const r=`${t}.bind`;this.prototype[r]=function(t,n,s){return new e.AttrSyntax(t,n,s[1],r)}}}class P{constructor(t,r){this.from=t,this.to=r,this.type="tbt",this.mode=e.BindingMode.toView}}class E{constructor(t){this.m=t,this.bindingType=53}static get inject(){return[e.IAttrMapper]}build(e){var r;let n;return n=null==e.bindable?null!==(r=this.m.map(e.node,e.attr.target))&&void 0!==r?r:t.camelCase(e.attr.target):e.bindable.property,new P(e.expr,n)}}exports.TranslationBindBindingRenderer=class{constructor(t,e,r){this.parser=t,this.observerLocator=e,this.platform=r}render(t,e,r,n,s){exports.TranslationBinding.create({parser:this.parser,observerLocator:this.observerLocator,context:r.container,controller:r,target:n,instruction:s,platform:this.platform})}},exports.TranslationBindBindingRenderer=o([e.renderer("tbt"),l(0,e.IExpressionParser),l(1,e.IObserverLocator),l(2,e.IPlatform)],exports.TranslationBindBindingRenderer),exports.TranslationValueConverter=class{constructor(t){this.i18n=t,this.signals=["aurelia-translation-signal"]}toView(t,e){return this.i18n.tr(t,e)}},exports.TranslationValueConverter=o([e.valueConverter("t"),l(0,g)],exports.TranslationValueConverter);const M=[exports.TranslationValueConverter,exports.TranslationBindingBehavior];const R=[exports.DateFormatValueConverter,exports.DateFormatBindingBehavior],V=[exports.NumberFormatValueConverter,exports.NumberFormatBindingBehavior],N=[exports.RelativeTimeValueConverter,exports.RelativeTimeBindingBehavior];const k=function r(n){return{optionsProvider:n,register(r){const s={initOptions:Object.create(null)};return n(s),r.register(function(r){const n=r.translationAttributeAliases,s=Array.isArray(n)?n:["t"],i=[],a=[],o=[],l=[];for(const t of s){const e=`${t}.bind`;i.push({pattern:t,symbols:""}),I.registerAlias(t),a.push({pattern:e,symbols:"."}),L.registerAlias(t),"t"!==t&&(o.push(t),l.push(e))}const c=[e.AttributePattern.define(i,I),e.BindingCommand.define({name:"t",aliases:o},A),exports.TranslationBindingRenderer,e.AttributePattern.define(a,L),e.BindingCommand.define({name:"t.bind",aliases:l},E),exports.TranslationBindBindingRenderer,exports.TranslationParametersAttributePattern,exports.TranslationParametersBindingCommand,exports.TranslationParametersBindingRenderer];return{register:n=>n.register(t.Registration.callback(p,(()=>r.initOptions)),e.AppTask.beforeActivate(g,(t=>t.initPromise)),t.Registration.singleton(h,u),t.Registration.singleton(g,exports.I18nService),...c,...M)}}(s),...R,...V,...N)},customize:t=>r(t||n)}}((()=>{}));exports.I18N=g,exports.I18nConfiguration=k,exports.I18nInitOptions=p,exports.I18nKeyEvaluationResult=m,exports.TranslationAttributePattern=I,exports.TranslationBindAttributePattern=L,exports.TranslationBindBindingCommand=E,exports.TranslationBindBindingInstruction=P,exports.TranslationBindInstructionType="tbt",exports.TranslationBindingCommand=A,exports.TranslationBindingInstruction=w,exports.TranslationInstructionType="tt",exports.TranslationParametersBindingInstruction=y,exports.TranslationParametersInstructionType="tpt";
