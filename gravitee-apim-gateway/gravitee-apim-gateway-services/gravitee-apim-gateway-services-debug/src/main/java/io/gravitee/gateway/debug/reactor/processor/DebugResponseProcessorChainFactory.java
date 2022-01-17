package io.gravitee.gateway.debug.reactor.processor;

import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.core.processor.Processor;
import io.gravitee.gateway.core.processor.chain.DefaultProcessorChain;
import io.gravitee.gateway.debug.reactor.processor.event.DebugEventProcessor;
import io.gravitee.gateway.reactor.processor.ResponseProcessorChainFactory;
import io.gravitee.gateway.reactor.processor.alert.AlertProcessor;
import io.gravitee.gateway.reactor.processor.reporter.ReporterProcessor;
import io.gravitee.gateway.reactor.processor.responsetime.ResponseTimeProcessor;
import io.gravitee.gateway.report.ReporterService;
import io.gravitee.node.api.Node;
import io.gravitee.plugin.alert.AlertEventProducer;
import io.gravitee.repository.management.api.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class DebugResponseProcessorChainFactory extends ResponseProcessorChainFactory {

    @Autowired
    private ReporterService reporterService;

    @Autowired
    private AlertEventProducer eventProducer;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private Node node;

    @Value("${http.port:8082}") //FIXME: use debug http port ?
    private String port;

    @Override
    public Processor<ExecutionContext> create() {
        final List<Processor<ExecutionContext>> processors = new ArrayList<>();
        processors.add(new ResponseTimeProcessor());
        processors.add(new ReporterProcessor(reporterService));

        if (!eventProducer.isEmpty()) {
            processors.add(new AlertProcessor(eventProducer, node, port));
        }

        processors.add(new DebugEventProcessor(eventRepository));

        return new DefaultProcessorChain<>(processors);
    }
}
