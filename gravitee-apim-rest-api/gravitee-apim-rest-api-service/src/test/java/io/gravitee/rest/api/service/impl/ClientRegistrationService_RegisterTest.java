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
package io.gravitee.rest.api.service.impl;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.*;
import static org.mockito.internal.util.collections.Sets.newSet;

import com.github.tomakehurst.wiremock.WireMockServer;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.ClientRegistrationProviderRepository;
import io.gravitee.repository.management.model.ClientRegistrationProvider;
import io.gravitee.rest.api.model.NewApplicationEntity;
import io.gravitee.rest.api.model.application.ApplicationSettings;
import io.gravitee.rest.api.model.application.OAuthClientSettings;
import io.gravitee.rest.api.service.AuditService;
import io.gravitee.rest.api.service.common.GraviteeContext;
import io.gravitee.rest.api.service.impl.configuration.application.registration.ClientRegistrationServiceImpl;
import io.gravitee.rest.api.service.impl.configuration.application.registration.client.register.ClientRegistrationResponse;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

/**
 * @author GraviteeSource Team
 */
@RunWith(MockitoJUnitRunner.class)
public class ClientRegistrationService_RegisterTest {

    @InjectMocks
    private ClientRegistrationServiceImpl clientRegistrationService = new ClientRegistrationServiceImpl();

    @Mock
    private ClientRegistrationProviderRepository mockClientRegistrationProviderRepository;

    @Mock
    private AuditService mockAuditService;

    private WireMockServer wireMockServer = new WireMockServer();

    @Before
    public void setup() {
        wireMockServer.start();
    }

    @After
    public void tearDown() {
        wireMockServer.stop();
    }

    @Test
    public void shouldRegisterProvider() throws TechnicalException {
        NewApplicationEntity application = new NewApplicationEntity();

        ApplicationSettings applicationSettings = new ApplicationSettings();
        applicationSettings.setoAuthClient(new OAuthClientSettings());
        application.setSettings(applicationSettings);

        ClientRegistrationProvider provider = new ClientRegistrationProvider();
        provider.setId("CRP_ID");
        provider.setName("name");
        provider.setDiscoveryEndpoint("http://localhost:8080/am");

        when(mockClientRegistrationProviderRepository.findAllByEnvironment(eq(GraviteeContext.getExecutionContext().getEnvironmentId())))
            .thenReturn(newSet(provider));

        stubFor(
            get(urlEqualTo("/am"))
                .willReturn(
                    aResponse()
                        .withBody(
                            "{\"token_endpoint\": \"http://localhost:8080/tokenEp\",\"registration_endpoint\": \"http://localhost:8080/registrationEp\"}"
                        )
                )
        );
        stubFor(post(urlEqualTo("/tokenEp")).willReturn(aResponse().withBody("{\"access_token\": \"myToken\",\"scope\": \"scope\"}")));
        stubFor(post(urlEqualTo("/registrationEp")).willReturn(aResponse().withBody("{ \"client_name\": \"gravitee\"}")));

        ClientRegistrationResponse clientRegistration = clientRegistrationService.register(
            GraviteeContext.getExecutionContext(),
            application
        );
        assertNotNull("Result is null", clientRegistration);

        assertEquals(clientRegistration.getClientName(), "gravitee");
    }
}
