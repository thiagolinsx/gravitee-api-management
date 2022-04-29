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
package io.gravitee.gateway.standalone.tests.policies.transformheaders.transformheaders;

import static com.github.tomakehurst.wiremock.client.WireMock.equalTo;
import static com.github.tomakehurst.wiremock.client.WireMock.get;
import static com.github.tomakehurst.wiremock.client.WireMock.getRequestedFor;
import static com.github.tomakehurst.wiremock.client.WireMock.ok;
import static com.github.tomakehurst.wiremock.client.WireMock.urlPathEqualTo;
import static org.junit.Assert.assertEquals;

import io.gravitee.common.http.HttpStatusCode;
import io.gravitee.gateway.standalone.tests.sdk.AbstractWiremockGatewayTest;
import io.gravitee.gateway.standalone.tests.sdk.junit.annotation.ApiDescriptor;
import io.gravitee.gateway.standalone.tests.sdk.policy.PolicyBuilder;
import io.gravitee.gateway.standalone.tests.sdk.utils.StringUtils;
import io.gravitee.plugin.core.api.ConfigurablePluginManager;
import io.gravitee.plugin.policy.PolicyPlugin;
import io.gravitee.policy.assigncontent.AssignContentPolicy;
import io.gravitee.policy.assigncontent.configuration.AssignContentPolicyConfiguration;
import io.gravitee.policy.transformheaders.TransformHeadersPolicy;
import io.gravitee.policy.transformheaders.configuration.TransformHeadersPolicyConfiguration;
import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.junit.Test;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
@ApiDescriptor("/io/gravitee/gateway/standalone/tests/policies/transformheaders/transform-headers-assign-content.json")
public class TransformHeadersPolicyAndAssignContentTest extends AbstractWiremockGatewayTest {

    @Test
    public void shouldRunFlows_getMethod() throws Exception {
        wireMockRule.stubFor(get("/team").willReturn(ok()));

        final HttpResponse response = execute(Request.Get("http://localhost:8082/test")).returnResponse();
        assertEquals(HttpStatusCode.OK_200, response.getStatusLine().getStatusCode());
        wireMockRule.verify(getRequestedFor(urlPathEqualTo("/team")).withHeader("headerKey", equalTo("headerValue")));
        String responseContent = StringUtils.copy(response.getEntity().getContent());
        assertEquals("test-content", responseContent);
    }

    @Override
    public void registerPolicy(ConfigurablePluginManager<PolicyPlugin> policyPluginManager) {
        super.registerPolicy(policyPluginManager);

        PolicyPlugin myPolicy = PolicyBuilder.build(
            "transform-headers",
            TransformHeadersPolicy.class,
            TransformHeadersPolicyConfiguration.class
        );
        policyPluginManager.register(myPolicy);

        PolicyPlugin assignContent = PolicyBuilder.build(
            "assign-content",
            AssignContentPolicy.class,
            AssignContentPolicyConfiguration.class
        );
        policyPluginManager.register(assignContent);
    }
}
