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
package io.gravitee.gateway.reactive.reactor.handler.context;

import io.gravitee.definition.model.Api;
import io.gravitee.el.TemplateContext;
import io.gravitee.el.TemplateEngine;
import io.gravitee.el.TemplateVariableProvider;
import io.gravitee.gateway.core.component.ComponentProvider;
import io.gravitee.gateway.reactive.api.ExecutionFailure;
import io.gravitee.gateway.reactive.api.context.Request;
import io.gravitee.gateway.reactive.api.context.RequestExecutionContext;
import io.gravitee.gateway.reactive.api.context.Response;
import io.gravitee.gateway.reactive.api.el.EvaluableRequest;
import io.gravitee.gateway.reactive.api.el.EvaluableResponse;
import io.gravitee.tracing.api.Tracer;
import java.util.*;

abstract class AbstractExecutionContext implements RequestExecutionContext {

    private static final String TEMPLATE_ATTRIBUTE_REQUEST = "request";
    private static final String TEMPLATE_ATTRIBUTE_RESPONSE = "response";
    private static final String TEMPLATE_ATTRIBUTE_CONTEXT = "context";

    private final ComponentProvider componentProvider;
    private final Api api;
    private final Map<String, Object> attributes = new HashMap<>();
    private final Map<String, Object> internalAttributes = new HashMap<>();
    private final Request request;
    private final Response response;
    private Collection<TemplateVariableProvider> templateVariableProviders;
    private TemplateEngine templateEngine;
    private boolean interrupted;
    private ExecutionFailure executionFailure;

    protected AbstractExecutionContext(
        Api api,
        Request request,
        Response response,
        ComponentProvider componentProvider,
        List<TemplateVariableProvider> templateVariableProviders
    ) {
        this.api = api;
        this.request = request;
        this.response = response;
        this.componentProvider = componentProvider;
        this.templateVariableProviders = templateVariableProviders;
    }

    @Override
    public void interrupt() {
        interrupted = true;
    }

    @Override
    public void resume() {
        interrupted = false;
    }

    @Override
    public void interruptWith(ExecutionFailure failure) {
        interrupt();
        executionFailure = failure;
    }

    @Override
    public boolean isInterrupted() {
        return interrupted;
    }

    @Override
    public Api api() {
        return api;
    }

    @Override
    public Request request() {
        return request;
    }

    @Override
    public Response response() {
        return response;
    }

    @Override
    public <T> T getComponent(Class<T> componentClass) {
        return componentProvider.getComponent(componentClass);
    }

    @Override
    public void setAttribute(String name, Object value) {
        putAttribute(name, value);
    }

    @Override
    public void putAttribute(String name, Object value) {
        attributes.put(name, value);
    }

    @Override
    public void removeAttribute(String name) {
        attributes.remove(name);
    }

    @Override
    public <T> T getAttribute(String name) {
        return (T) attributes.get(name);
    }

    @Override
    public Set<String> getAttributeNames() {
        return attributes.keySet();
    }

    @Override
    public <T> Map<String, T> getAttributes() {
        return (Map<String, T>) this.attributes;
    }

    @Override
    public void setInternalAttribute(String name, Object value) {
        putInternalAttribute(name, value);
    }

    @Override
    public void putInternalAttribute(String name, Object value) {
        internalAttributes.put(name, value);
    }

    @Override
    public void removeInternalAttribute(String name) {
        internalAttributes.remove(name);
    }

    @Override
    public <T> T getInternalAttribute(String name) {
        return (T) internalAttributes.get(name);
    }

    @Override
    public <T> Map<String, T> getInternalAttributes() {
        return (Map<String, T>) internalAttributes;
    }

    @Override
    public TemplateEngine getTemplateEngine() {
        if (templateEngine == null) {
            templateEngine = TemplateEngine.templateEngine();

            TemplateContext templateContext = templateEngine.getTemplateContext();
            templateContext.setVariable(TEMPLATE_ATTRIBUTE_REQUEST, new EvaluableRequest(request()));
            templateContext.setVariable(TEMPLATE_ATTRIBUTE_RESPONSE, new EvaluableResponse(response()));
            templateContext.setVariable(TEMPLATE_ATTRIBUTE_CONTEXT, new EvaluableExecutionContext(this));

            if (templateVariableProviders != null) {
                templateVariableProviders.forEach(templateVariableProvider -> templateVariableProvider.provide(templateContext));
            }
        }

        return templateEngine;
    }

    @Override
    public Tracer getTracer() {
        return getComponent(Tracer.class);
    }

    public void setTemplateVariableProviders(Collection<TemplateVariableProvider> templateVariableProviders) {
        this.templateVariableProviders = templateVariableProviders;
    }

    public ExecutionFailure getExecutionFailure() {
        return executionFailure;
    }
}
