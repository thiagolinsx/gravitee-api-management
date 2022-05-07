/**
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.gateway.standalone.tests.sdk.junit.stmt;

import io.gravitee.common.component.Lifecycle;
import io.gravitee.definition.jackson.datatype.GraviteeMapper;
import io.gravitee.definition.model.Api;
import io.gravitee.definition.model.EndpointGroup;
import io.gravitee.gateway.handlers.api.manager.ApiManager;
import io.gravitee.gateway.policy.PolicyFactory;
import io.gravitee.gateway.standalone.tests.sdk.ApiLoaderInterceptor;
import io.gravitee.gateway.standalone.tests.sdk.container.GatewayTestContainer;
import io.gravitee.gateway.standalone.tests.sdk.junit.annotation.ApiDescriptor;
import io.gravitee.gateway.standalone.tests.sdk.plugin.PluginRegister;
import io.gravitee.gateway.standalone.tests.sdk.reporter.FakeReporter;
import io.gravitee.gateway.standalone.vertx.VertxEmbeddedContainer;
import io.gravitee.node.reporter.ReporterManager;
import io.gravitee.plugin.connector.ConnectorPluginManager;
import io.gravitee.plugin.core.api.ConfigurablePluginManager;
import io.gravitee.plugin.policy.PolicyPlugin;
import io.gravitee.plugin.resource.ResourcePlugin;
import java.io.File;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Date;
import org.junit.runners.model.Statement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.ResolvableType;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author GraviteeSource Team
 */
public class ApiDeployerStatement extends Statement {

    private final Logger logger = LoggerFactory.getLogger(ApiDeployerStatement.class);

    private final Statement base;
    private final Object target;

    public ApiDeployerStatement(Statement base, Object target) {
        this.base = base;
        this.target = target;
    }

    @Override
    public void evaluate() throws Throwable {
        final String homeFolder = target.getClass().getAnnotation(ApiDescriptor.class).configFolder();
        URL home = ApiDeployerStatement.class.getResource(homeFolder);
        String graviteeHome = URLDecoder.decode(home.getPath(), StandardCharsets.UTF_8.name());
        System.setProperty("gravitee.home", graviteeHome);
        System.setProperty("gravitee.conf", graviteeHome + File.separator + "config" + File.separator + "gravitee.yml");

        GatewayTestContainer container = new GatewayTestContainer();
        final ApplicationContext applicationContext = container.applicationContext();

        DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) (
            (ConfigurableApplicationContext) applicationContext
        ).getBeanFactory();

        FakeReporter fakeReporter = (FakeReporter) applicationContext.getBean("fakeReporter");
        ReporterManager reporterManager = applicationContext.getBean(ReporterManager.class);
        reporterManager.register(fakeReporter);

        if (target instanceof ApplicationContextAware) {
            ((ApplicationContextAware) target).setApplicationContext(applicationContext);
        }

        if (target instanceof PluginRegister) {
            final PluginRegister register = ((PluginRegister) target);

            // Register connectors
            ConnectorPluginManager cpm = container.applicationContext().getBean(ConnectorPluginManager.class);
            register.registerConnector(cpm);

            // Register policies
            String[] policyBeanNamesForType = applicationContext.getBeanNamesForType(
                ResolvableType.forClassWithGenerics(ConfigurablePluginManager.class, PolicyPlugin.class)
            );

            register.registerPolicy((ConfigurablePluginManager<PolicyPlugin>) applicationContext.getBean(policyBeanNamesForType[0]));

            // Register resources
            String[] resourceBeanNamesForType = container
                .applicationContext()
                .getBeanNamesForType(ResolvableType.forClassWithGenerics(ConfigurablePluginManager.class, ResourcePlugin.class));

            register.registerResource(
                (ConfigurablePluginManager<ResourcePlugin>) container.applicationContext().getBean(resourceBeanNamesForType[0])
            );
        }

        if (target instanceof PolicyFactory) {
            String[] beanNames = applicationContext.getBeanNamesForType(PolicyFactory.class);
            String oldBeanName = beanNames[0];

            beanFactory.destroyBean(oldBeanName, beanFactory.getBean(oldBeanName));
            beanFactory.destroySingleton(oldBeanName);

            beanFactory.removeBeanDefinition(oldBeanName);

            beanFactory.registerSingleton(oldBeanName, target);
        }

        final VertxEmbeddedContainer vertxContainer = startServer(container);

        ApiManager apiManager = applicationContext.getBean(ApiManager.class);
        Api api = loadApi(target.getClass().getAnnotation(ApiDescriptor.class).value());

        try {
            final io.gravitee.gateway.handlers.api.definition.Api apiToRegister = new io.gravitee.gateway.handlers.api.definition.Api(api);
            apiToRegister.setDeployedAt(new Date());
            apiManager.register(apiToRegister);
            base.evaluate();
        } catch (Exception e) {
            logger.error("An error occurred", e);
            throw e;
        } finally {
            apiManager.unregister(api.getId());
            stopServer(container, vertxContainer);
        }
    }

    private VertxEmbeddedContainer startServer(GatewayTestContainer container) throws InterruptedException {
        final Thread starterThread = new Thread(
            () -> {
                try {
                    container.start();
                } catch (Exception e) {
                    System.exit(-1);
                }
            }
        );

        starterThread.start();

        final VertxEmbeddedContainer vertxEmbeddedContainer = container.applicationContext().getBean(VertxEmbeddedContainer.class);

        while (vertxEmbeddedContainer.lifecycleState() != Lifecycle.State.STARTED) {
            Thread.sleep(5);
        }
        return vertxEmbeddedContainer;
    }

    private void stopServer(GatewayTestContainer container, VertxEmbeddedContainer vertxContainer) throws InterruptedException {
        final Thread stopThread = new Thread(
            () -> {
                try {
                    container.stop();
                } catch (Exception e) {
                    System.exit(-1);
                }
            }
        );

        stopThread.start();

        while (vertxContainer.lifecycleState() != Lifecycle.State.STOPPED) {
            Thread.sleep(5);
        }
    }

    private Api loadApi(String apiDescriptorPath) throws Exception {
        URL jsonFile = ApiDeployerStatement.class.getResource(apiDescriptorPath);
        Api api = new GraviteeMapper().readValue(jsonFile, Api.class);

        if (api.getProxy().getGroups() == null || api.getProxy().getGroups().isEmpty()) {
            // Create a default endpoint group
            EndpointGroup group = new EndpointGroup();
            group.setName("default");
            group.setEndpoints(Collections.emptySet());
            api.getProxy().setGroups(Collections.singleton(group));
        }

        if (ApiLoaderInterceptor.class.isAssignableFrom(target.getClass())) {
            ApiLoaderInterceptor loader = (ApiLoaderInterceptor) target;
            loader.before(api);
        }

        if (ApiLoaderInterceptor.class.isAssignableFrom(target.getClass())) {
            ApiLoaderInterceptor loader = (ApiLoaderInterceptor) target;
            loader.after(api);
        }

        return api;
    }
}
