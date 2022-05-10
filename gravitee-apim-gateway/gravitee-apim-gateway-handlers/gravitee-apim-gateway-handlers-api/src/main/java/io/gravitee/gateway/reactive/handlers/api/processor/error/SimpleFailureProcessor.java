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
package io.gravitee.gateway.reactive.handlers.api.processor.error;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.gravitee.common.http.HttpHeadersValues;
import io.gravitee.common.http.MediaType;
import io.gravitee.gateway.api.buffer.Buffer;
import io.gravitee.gateway.api.http.HttpHeaderNames;
import io.gravitee.gateway.api.processor.ProcessorFailure;
import io.gravitee.gateway.handlers.api.processor.error.ProcessorFailureAsJson;
import io.gravitee.gateway.reactive.api.context.ExecutionContext;
import io.gravitee.gateway.reactive.api.context.Request;
import io.gravitee.gateway.reactive.api.context.RequestExecutionContext;
import io.gravitee.gateway.reactive.api.context.Response;
import io.gravitee.gateway.reactive.core.processor.Processor;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.reactivex.Completable;
import io.reactivex.Maybe;
import java.util.List;

/**
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author Guillaume LAMIRAND (guillaume.lamirand at graviteesource.com)
 * @author GraviteeSource Team
 */
public class SimpleFailureProcessor implements Processor {

    /**
     * Code for an unknown caller / application     */
    private static final String APPLICATION_NAME_ANONYMOUS = "1";
    private static final String PROCESSOR_FAILURE_ATTRIBUTE = ExecutionContext.ATTR_PREFIX + "failure";
    private static final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String getId() {
        return "simple-failure-processor";
    }

    @Override
    public Completable execute(final RequestExecutionContext executionContext) {
        return Maybe
            .fromCallable(() -> executionContext.<ProcessorFailure>getAttribute(PROCESSOR_FAILURE_ATTRIBUTE))
            .flatMap(
                processorFailure -> {
                    // If no application has been associated to the request (for example in case security chain can not be processed
                    // correctly) set the default application to track it.
                    if (executionContext.request().metrics().getApplication() == null) {
                        executionContext.request().metrics().setApplication(APPLICATION_NAME_ANONYMOUS);
                    }

                    return Maybe.fromCallable(() -> processFailure(executionContext, processorFailure));
                }
            )
            .flatMapCompletable(buffer -> executionContext.response().body(buffer));
    }

    protected Buffer processFailure(final RequestExecutionContext context, final ProcessorFailure failure) {
        final Request request = context.request();
        final Response response = context.response();

        request.metrics().setErrorKey(failure.key());
        response.status(failure.statusCode());
        response.reason(HttpResponseStatus.valueOf(failure.statusCode()).reasonPhrase());
        response.headers().set(HttpHeaderNames.CONNECTION, HttpHeadersValues.CONNECTION_CLOSE);

        if (failure.message() != null) {
            List<String> accepts = request.headers().getAll(HttpHeaderNames.ACCEPT);

            Buffer payload;
            String contentType;

            if (accepts != null && (accepts.contains(MediaType.APPLICATION_JSON) || accepts.contains(MediaType.WILDCARD))) {
                // Write error as json when accepted by the client.
                contentType = MediaType.APPLICATION_JSON;

                if (failure.contentType() != null && failure.contentType().equalsIgnoreCase(MediaType.APPLICATION_JSON)) {
                    // Message is already json string.
                    payload = Buffer.buffer(failure.message());
                } else {
                    try {
                        String contentAsJson = mapper.writeValueAsString(new ProcessorFailureAsJson(failure));
                        payload = Buffer.buffer(contentAsJson);
                    } catch (JsonProcessingException jpe) {
                        // There is a problem with json. Just return the content in text/plain.
                        contentType = MediaType.TEXT_PLAIN;
                        payload = Buffer.buffer(failure.message());
                    }
                }
            } else {
                // Fallback to text/plain error.
                contentType = MediaType.TEXT_PLAIN;
                payload = Buffer.buffer(failure.message());
            }

            response.headers().set(HttpHeaderNames.CONTENT_LENGTH, Integer.toString(payload.length()));
            response.headers().set(HttpHeaderNames.CONTENT_TYPE, contentType);
            return payload;
        }
        return null;
    }
}
