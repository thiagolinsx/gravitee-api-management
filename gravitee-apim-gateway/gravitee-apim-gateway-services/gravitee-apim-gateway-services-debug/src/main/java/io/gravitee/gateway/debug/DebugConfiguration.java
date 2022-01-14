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
package io.gravitee.gateway.debug;

import io.gravitee.gateway.debug.vertx.VertxDebugService;
import io.gravitee.gateway.flow.policy.PolicyChainFactory;
import io.gravitee.gateway.handlers.api.ApiContextHandlerFactory;
import io.gravitee.gateway.handlers.api.definition.Api;
import io.gravitee.gateway.reactor.handler.EntrypointResolver;
import io.gravitee.gateway.reactor.handler.ReactorHandlerFactory;
import io.gravitee.gateway.reactor.handler.ReactorHandlerFactoryManager;
import io.gravitee.gateway.reactor.handler.ReactorHandlerRegistry;
import io.gravitee.gateway.reactor.handler.context.ExecutionContextFactory;
import io.gravitee.gateway.reactor.handler.impl.DefaultEntrypointResolver;
import io.gravitee.gateway.reactor.handler.impl.DefaultReactorHandlerRegistry;
import io.gravitee.node.api.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DebugConfiguration {

    private ApplicationContext applicationContext;

    private Node node;

    public DebugConfiguration(ApplicationContext applicationContext, Node node) {
        this.applicationContext = applicationContext;
        this.node = node;
    }

    @Bean
    public VertxDebugService vertxDebugService() {
        return new VertxDebugService();
    }

    @Bean
    @Qualifier("debugReactorHandlerFactory")
    public ReactorHandlerFactory<Api> reactorHandlerFactory(
            @Value("${reporters.logging.max_size:-1}") int maxSizeLogMessage,
            @Value("${reporters.logging.excluded_response_types:#{null}}") String excludedResponseTypes,
            @Value("${handlers.request.headers.x-forwarded-prefix:false}") boolean overrideXForwardedPrefix,
            @Value("${classloader.legacy.enabled:true}") boolean classLoaderLegacyMode) {
        return new ApiContextHandlerFactory(applicationContext.getParent(), maxSizeLogMessage, excludedResponseTypes, overrideXForwardedPrefix, classLoaderLegacyMode, node, ExecutionContextFactory::new, PolicyChainFactory::new);
    }

    @Bean
    @Qualifier("debugReactorHandlerFactoryManager")
    public ReactorHandlerFactoryManager reactorHandlerFactoryManager(@Qualifier("debugReactorHandlerFactory") ReactorHandlerFactory reactorHandlerFactory) {
        return new ReactorHandlerFactoryManager(reactorHandlerFactory);
    }

    @Bean
    @Qualifier("debugReactorHandlerRegistry")
    public ReactorHandlerRegistry reactorHandlerRegistry(ReactorHandlerFactoryManager reactorHandlerFactoryManager) {
        return new DefaultReactorHandlerRegistry(reactorHandlerFactoryManager);
    }

    @Bean
    @Qualifier("debugEntryPointResolver")
    public EntrypointResolver reactorHandlerResolver(
        @Qualifier("debugReactorHandlerRegistry") ReactorHandlerRegistry reactorHandlerRegistry
    ) {
        return new DefaultEntrypointResolver(reactorHandlerRegistry);
    }
}
