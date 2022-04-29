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
import io.gravitee.common.http.HttpStatusCode;
import io.gravitee.gateway.standalone.tests.sdk.AbstractWiremockGatewayTest;
import io.gravitee.gateway.standalone.tests.sdk.junit.annotation.ApiDescriptor;
import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;
import org.junit.Assert;
import org.junit.Test;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author GraviteeSource Team
 */
@ApiDescriptor("/io/gravitee/gateway/standalone/tests/integration/http/failover.json")
public class FailoverTest extends AbstractWiremockGatewayTest {

    @Test
    public void shouldFallbacktoSecondEndpoint_noBody() throws Exception {
        wireMockRule.stubFor(WireMock.get("/fallback/my_team").willReturn(WireMock.ok()));

        final HttpResponse response = execute(Request.Get("http://localhost:8082/team/my_team")).returnResponse();

        Assert.assertEquals(HttpStatusCode.OK_200, response.getStatusLine().getStatusCode());
        wireMockRule.verify(WireMock.getRequestedFor(WireMock.urlPathEqualTo("/fallback/my_team")));
    }

    @Test
    public void shouldFallbacktoSecondEndpoint_withBody() throws Exception {
        final String request = "This is a dummy request payload";

        wireMockRule.stubFor(WireMock.post("/fallback/my_team").willReturn(WireMock.ok().withBody("")));

        final HttpResponse response = execute(
            Request.Post("http://localhost:8082/team/my_team").bodyString(request, ContentType.TEXT_PLAIN)
        )
            .returnResponse();

        Assert.assertEquals(HttpStatusCode.OK_200, response.getStatusLine().getStatusCode());
        wireMockRule.verify(
            WireMock.postRequestedFor(WireMock.urlPathEqualTo("/fallback/my_team")).withRequestBody(WireMock.equalTo(request))
        );
    }
}
