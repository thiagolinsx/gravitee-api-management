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
import io.gravitee.gateway.standalone.tests.integration.policy.TransformResponseStreamFailPolicy;
import io.gravitee.gateway.standalone.tests.sdk.AbstractWiremockGatewayTest;
import io.gravitee.gateway.standalone.tests.sdk.junit.annotation.ApiDescriptor;
import io.gravitee.gateway.standalone.tests.sdk.policy.PolicyBuilder;
import io.gravitee.gateway.standalone.tests.sdk.policy.PolicyBuilder;
import io.gravitee.plugin.core.api.ConfigurablePluginManager;
import io.gravitee.plugin.policy.PolicyPlugin;
import io.netty.handler.codec.http.HttpResponseStatus;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.entity.ContentType;
import org.junit.Assert;
import org.junit.Test;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author GraviteeSource Team
 */
@ApiDescriptor(value = "/io/gravitee/gateway/standalone/tests/integration/http/transform-response-content-fail.json")
public class StreamFailOnResponseGatewayTest extends AbstractWiremockGatewayTest {

    private static final String BODY_CONTENT = "Content to transform:";

    @Test
    public void shouldStreamFailOnResponse() throws Exception {
        wireMockRule.stubFor(WireMock.post("/api").willReturn(WireMock.ok("{{request.body}}").withTransformers("response-template")));

        org.apache.http.client.fluent.Request request = org.apache.http.client.fluent.Request.Post("http://localhost:8082/api");
        request.bodyString(BODY_CONTENT + " {#request.id}", ContentType.TEXT_PLAIN);

        HttpResponse response = execute(request).returnResponse();

        Assert.assertEquals(HttpStatus.SC_INTERNAL_SERVER_ERROR, response.getStatusLine().getStatusCode());
        Assert.assertEquals(HttpResponseStatus.INTERNAL_SERVER_ERROR.reasonPhrase(), response.getStatusLine().getReasonPhrase());
        wireMockRule.verify(1, WireMock.postRequestedFor(WireMock.urlPathEqualTo("/api")));
    }

    @Override
    public void registerPolicy(ConfigurablePluginManager<PolicyPlugin> policyPluginManager) {
        super.registerPolicy(policyPluginManager);

        PolicyPlugin transformRequestContentPolicy = PolicyBuilder.build(
            "transform-response-content-fail",
            TransformResponseStreamFailPolicy.class
        );
        policyPluginManager.register(transformRequestContentPolicy);
    }
}
