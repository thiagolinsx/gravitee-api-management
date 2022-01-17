package io.gravitee.gateway.debug.reactor.reactor.handler.context;

import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.core.component.ComponentProvider;
import io.gravitee.gateway.reactor.handler.context.ExecutionContextFactory;

public class DebugExecutionContextFactory extends ExecutionContextFactory {

    private String eventId;

    public DebugExecutionContextFactory(ComponentProvider componentProvider) {
        super(componentProvider);
    }

    @Override
    public ExecutionContext create(ExecutionContext wrapped) {
        return new DebugExecutionContext(super.create(wrapped), eventId);
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }
}
