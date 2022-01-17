package io.gravitee.gateway.debug.reactor.processor.event;

import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.core.processor.AbstractProcessor;
import io.gravitee.gateway.debug.reactor.reactor.handler.context.DebugExecutionContext;
import io.gravitee.gateway.policy.StreamType;
import io.gravitee.gateway.reactor.processor.alert.AlertProcessor;
import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.management.api.EventRepository;
import io.gravitee.repository.management.model.Event;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class DebugEventProcessor extends AbstractProcessor<ExecutionContext> {

    private static final Logger LOGGER = LoggerFactory.getLogger(DebugEventProcessor.class);
    private EventRepository eventRepository;

    public DebugEventProcessor(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public void handle(ExecutionContext context) {
        final DebugExecutionContext debugContext = (DebugExecutionContext) context;

        LOGGER.info("We are finally in the processor for event {}", debugContext.getEventId());

        final List<DebugExecutionContext.DebugInfo> debugInfos = buildOrderedList(debugContext);

        LOGGER.info("Logging full chain: ");
        debugInfos.forEach(item -> LOGGER.info(item.toString()));

        try {
            final Optional<Event> event = eventRepository.findById(debugContext.getEventId());
            final Event event1 = event.get();
            LOGGER.info("Event fetched: {}", event1.getType());
        } catch (TechnicalException e) {
            e.printStackTrace();
        }
        next.handle(context);
    }

    private List<DebugExecutionContext.DebugInfo> buildOrderedList(DebugExecutionContext debugContext) {
        List<DebugExecutionContext.DebugInfo> infos = new ArrayList<>();
        // First, ON_REQUEST streamable
        infos.addAll(
                debugContext
                .getStreamDebugInfo()
                .values()
                .stream()
                .filter(di -> StreamType.ON_REQUEST.equals(di.getStreamType()))
                .sorted()
                .collect(Collectors.toList())
        );

        // Then, ON_REQUEST executable
        infos.addAll(
                debugContext
                        .getExecutionDebugInfo()
                        .values()
                        .stream()
                        .filter(di -> StreamType.ON_REQUEST.equals(di.getStreamType()))
                        .sorted()
                        .collect(Collectors.toList())
        );

        // Then, ON_RESPONSE streamable
        infos.addAll(
                debugContext
                        .getStreamDebugInfo()
                        .values()
                        .stream()
                        .filter(di -> StreamType.ON_RESPONSE.equals(di.getStreamType()))
                        .sorted()
                        .collect(Collectors.toList())
        );

        // Then, ON_RESPONSE executable
        infos.addAll(
                debugContext
                        .getExecutionDebugInfo()
                        .values()
                        .stream()
                        .filter(di -> StreamType.ON_RESPONSE.equals(di.getStreamType()))
                        .sorted()
                        .collect(Collectors.toList())
        );

        return infos;
    }
}
