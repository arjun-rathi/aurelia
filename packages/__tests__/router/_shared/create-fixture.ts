import { Constructable, LogLevel, Registration, ILogConfig, DI } from '@aurelia/kernel';
import { Aurelia } from '@aurelia/runtime';
import { IRouterOptions, RouterConfiguration, IRouter } from '@aurelia/router';
import { TestContext, assert } from '@aurelia/testing';

import { IHIAConfig, IHookInvocationAggregator } from './hook-invocation-tracker';
import { TestRouterConfiguration } from './configuration';

export const IActivityTracker = DI.createInterface<IActivityTracker>('IActivityTracker').withDefault(x => x.singleton(ActivityTracker));
export interface IActivityTracker extends ActivityTracker {}
export class ActivityTracker {
  public readonly activeVMs: string[] = [];

  public setActive(vm: string): void {
    this.activeVMs.push(vm);
  }
  public setNonActive(vm: string): void {
    this.activeVMs.splice(this.activeVMs.indexOf(vm), 1);
  }
}

export async function createFixture<T extends Constructable>(
  Component: T,
  deps: Constructable[],
  createHIAConfig: () => IHIAConfig,
  createRouterOptions: () => IRouterOptions,
  level: LogLevel = LogLevel.warn,
) {
  const hiaConfig = createHIAConfig();
  const routerOptions = createRouterOptions();
  const ctx = TestContext.createHTMLTestContext();
  const { container, scheduler } = ctx;

  container.register(Registration.instance(IHIAConfig, hiaConfig));
  container.register(TestRouterConfiguration.for(ctx, level));
  container.register(RouterConfiguration.customize(routerOptions));
  container.register(...deps);

  const activityTracker = container.get(IActivityTracker);
  const hia = container.get(IHookInvocationAggregator);
  const router = container.get(IRouter);
  const component = container.get(Component);

  const au = new Aurelia(container);
  const host = ctx.createElement('div');

  const logConfig = container.get(ILogConfig);

  au.app({ component, host });

  hia.setPhase('start');

  await au.start().wait();

  return {
    ctx,
    container,
    au,
    host,
    hia,
    component,
    scheduler,
    router,
    activityTracker,
    startTracing() {
      logConfig.level = LogLevel.trace;
    },
    stopTracing() {
      logConfig.level = level;
    },
    async tearDown() {
      assert.isSchedulerEmpty();

      hia.setPhase('stop');

      await au.stop().wait();

      assert.isSchedulerEmpty();
    },
  };
}
