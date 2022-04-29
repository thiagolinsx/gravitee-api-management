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
package io.gravitee.gateway.standalone.tests.integration.http;

import com.github.tomakehurst.wiremock.client.WireMock;
import io.gravitee.gateway.standalone.tests.integration.policy.OverrideMethodPolicy;
import io.gravitee.gateway.standalone.tests.sdk.AbstractWiremockGatewayTest;
import io.gravitee.gateway.standalone.tests.sdk.junit.annotation.ApiDescriptor;
import io.gravitee.gateway.standalone.tests.sdk.policy.PolicyBuilder;
import io.gravitee.plugin.core.api.ConfigurablePluginManager;
import io.gravitee.plugin.policy.PolicyPlugin;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.fluent.Request;
import org.junit.Assert;
import org.junit.Test;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author GraviteeSource Team
 */
@ApiDescriptor(value = "/io/gravitee/gateway/standalone/tests/integration/http/override-method.json")
public class OverrideMethodGatewayTest extends AbstractWiremockGatewayTest {

    @Test
    public void call_override_method() throws Exception {
        wireMockRule.stubFor(WireMock.post("/echo/helloworld").willReturn(WireMock.ok()));

        HttpResponse response = execute(Request.Get("http://localhost:8082/echo/helloworld")).returnResponse();

        Assert.assertEquals(HttpStatus.SC_OK, response.getStatusLine().getStatusCode());

        wireMockRule.verify(0, WireMock.getRequestedFor(WireMock.urlPathEqualTo("/echo/helloworld")));
        wireMockRule.verify(1, WireMock.postRequestedFor(WireMock.urlPathEqualTo("/echo/helloworld")));
    }

    @Override
    public void registerPolicy(ConfigurablePluginManager<PolicyPlugin> policyPluginManager) {
        super.registerPolicy(policyPluginManager);

        PolicyPlugin dynamicRoutingPolicy = PolicyBuilder.build("override-method", OverrideMethodPolicy.class);
        policyPluginManager.register(dynamicRoutingPolicy);
    }
}
