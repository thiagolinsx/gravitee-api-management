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
package io.gravitee.gateway.standalone.tests.integration.http2;

import static org.junit.Assert.assertEquals;

import com.github.tomakehurst.wiremock.client.WireMock;
import io.gravitee.gateway.api.http.HttpHeaderNames;
import io.gravitee.gateway.standalone.tests.sdk.AbstractWiremockGatewayTest;
import io.gravitee.gateway.standalone.tests.sdk.junit.annotation.ApiDescriptor;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpClientOptions;
import io.vertx.core.http.HttpClientResponse;
import io.vertx.core.http.HttpMethod;
import io.vertx.core.http.HttpVersion;
import java.util.List;
import org.apache.http.HttpStatus;
import org.junit.Assert;
import org.junit.Test;

/**
 * @author GraviteeSource Team
 */
@ApiDescriptor("/io/gravitee/gateway/standalone/tests/integration/http/teams.json")
public class Http2HeadersTest extends AbstractWiremockGatewayTest {

    io.vertx.core.http.HttpClient httpClient = Vertx
        .vertx()
        .createHttpClient(new HttpClientOptions().setSsl(true).setTrustAll(true).setUseAlpn(true).setProtocolVersion(HttpVersion.HTTP_2));

    @Test
    public void should_conserve_multi_values() {
        String cookie1 = "JSESSIONID=ABSCDEDASDSSDSSE.oai007; path=/; Secure; HttpOnly";
        String cookie2 = "JSESSIONID=BASCDEDASDSSDSSE.oai008; path=/another; Secure; HttpOnly";

        wireMockRule.stubFor(
            WireMock
                .get(WireMock.urlPathEqualTo("/team/my_team"))
                .willReturn(WireMock.ok().withHeader(HttpHeaderNames.SET_COOKIE, cookie1).withHeader(HttpHeaderNames.SET_COOKIE, cookie2))
        );

        httpClient
            .request(HttpMethod.GET, "https://localhost:8082/test/my_team")
            .onComplete(
                event -> {
                    Assert.assertTrue(event.succeeded());
                    event
                        .result()
                        .send()
                        .onComplete(
                            responseEvent -> {
                                Assert.assertTrue(responseEvent.succeeded());

                                HttpClientResponse response = responseEvent.result();

                                Assert.assertEquals(HttpStatus.SC_OK, response.statusCode());
                                wireMockRule.verify(1, WireMock.getRequestedFor(WireMock.urlPathEqualTo("/team/my_team")));

                                List<String> cookieHeaders = response.headers().getAll(HttpHeaderNames.SET_COOKIE);
                                assertEquals(2, cookieHeaders.size());
                                assertEquals(cookie1, cookieHeaders.get(0));
                                assertEquals(cookie2, cookieHeaders.get(1));
                            }
                        );
                }
            );
    }

    @Test
    public void should_conserve_custom_header() {
        wireMockRule.stubFor(
            WireMock.get(WireMock.urlPathEqualTo("/team/my_team")).willReturn(WireMock.ok().withHeader("custom", "foobar"))
        );

        httpClient
            .request(HttpMethod.GET, "https://localhost:8082/test/my_team")
            .onComplete(
                event -> {
                    Assert.assertTrue(event.succeeded());
                    event
                        .result()
                        .send()
                        .onComplete(
                            responseEvent -> {
                                Assert.assertTrue(responseEvent.succeeded());

                                HttpClientResponse response = responseEvent.result();

                                Assert.assertEquals(HttpStatus.SC_OK, response.statusCode());
                                wireMockRule.verify(1, WireMock.getRequestedFor(WireMock.urlPathEqualTo("/team/my_team")));

                                List<String> customHeaders = response.headers().getAll("custom");
                                assertEquals(1, customHeaders.size());
                            }
                        );
                }
            );
    }
}
