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
package io.gravitee.gateway.standalone.tests.sdk;

import io.gravitee.gateway.standalone.tests.sdk.policy.PolicyBuilder;
import io.gravitee.plugin.core.api.ConfigurablePluginManager;
import io.gravitee.plugin.policy.PolicyPlugin;
import io.gravitee.plugin.resource.ResourcePlugin;
import io.gravitee.policy.api.PolicyConfiguration;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

public abstract class AbstractPolicyTest<T, C extends PolicyConfiguration> extends AbstractWiremockGatewayTest {

    protected abstract String policyName();

    @Override
    public void registerPolicy(ConfigurablePluginManager<PolicyPlugin> policyPluginManager) {
        super.registerPolicy(policyPluginManager);

        Type[] types = ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments();
        assert types.length == 2;
        PolicyPlugin myPolicy = PolicyBuilder.build(policyName(), (Class<?>) types[0], (Class<? extends PolicyConfiguration>) types[1]);
        policyPluginManager.register(myPolicy);
    }

    @Override
    public void registerResource(ConfigurablePluginManager<ResourcePlugin> resourcePluginManager) {
        super.registerResource(resourcePluginManager);
    }
}
