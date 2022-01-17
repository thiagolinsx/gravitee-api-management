package io.gravitee.gateway.debug.reactor.reactor.handler.context;

import io.gravitee.common.http.HttpHeaders;
import io.gravitee.el.TemplateEngine;
import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.api.Request;
import io.gravitee.gateway.api.Response;
import io.gravitee.gateway.debug.policy.impl.DebugPolicy;
import io.gravitee.gateway.policy.StreamType;
import io.gravitee.tracing.api.Tracer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.gravitee.gateway.api.buffer.Buffer;

import java.time.Duration;
import java.time.Instant;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.time.temporal.ChronoUnit;

public class DebugExecutionContext implements ExecutionContext {

    public static final Logger LOGGER = LoggerFactory.getLogger(DebugExecutionContext.class);

    private final ExecutionContext context;
    private final String eventId;

    //FIXME to remove as we will only store timestamp
    private Instant begin;
    private Instant end;

    final Map<DebugPolicy, DebugInfo> executionDebugInfo = new HashMap<>();
    final Map<DebugPolicy, DebugInfo> streamDebugInfo = new HashMap<>();

    public DebugExecutionContext(ExecutionContext context, String eventId) {
        this.context = context;
        this.eventId = eventId;
    }

    public void beginExecutingPolicy(DebugPolicy policy, StreamType streamType) {
        LOGGER.info("------------- execute --------------------");
        LOGGER.info("---------------------------------");
        LOGGER.info("PHASE: {}", streamType);
        LOGGER.info("Before policy: {}", policy.id());
        begin = Instant.now();
        LOGGER.info("Starting at: {}", begin);
        final String headers = printHeaders(streamType.equals(StreamType.ON_REQUEST) ? context.request().headers() : context.response().headers());
        executionDebugInfo.put(policy, new DebugInfo(streamType, begin));
    }

    public void exitExecutingPolicy(DebugPolicy policy, StreamType streamType) {
        LOGGER.info("---------------------------------");
        LOGGER.info("After policy: " + policy.id());
        end = Instant.now();
        LOGGER.info("Ending at: " + end);
        final String headers = printHeaders(streamType.equals(StreamType.ON_REQUEST) ? context.request().headers() : context.response().headers());
        LOGGER.info("Policy took {} µs to execute", Duration.between(begin, end).dividedBy(ChronoUnit.MICROS.getDuration()));
        LOGGER.info("---------------------------------");
        executionDebugInfo.get(policy).end(end).headers(headers);

    }

    public void beginStreamingPolicy(DebugPolicy policy, StreamType streamType) {
        LOGGER.info("------------- stream --------------------");
        LOGGER.info("------------- execute --------------------");
        LOGGER.info("---------------------------------");
        LOGGER.info("PHASE: {}", streamType);
        LOGGER.info("Before policy: {}", policy.id());
        begin = Instant.now();
        LOGGER.info("Starting at: {}", begin);
        printHeaders(streamType.equals(StreamType.ON_REQUEST) ? context.request().headers() : context.response().headers());
        streamDebugInfo.put(policy, new DebugInfo(streamType, begin));
    }

    public void exitStreamingPolicy(DebugPolicy policy, StreamType streamType, Buffer buffer) {
        LOGGER.info("---------------------------------");
        LOGGER.info("After policy: " + policy.id());
        end = Instant.now();
        LOGGER.info("Ending at: " + end);
        final String body = buffer.toString().replaceAll(System.lineSeparator(), "");
        context.response().headers().add("bodylog", body);
        LOGGER.info("Body: {}", buffer);
        printHeaders(streamType.equals(StreamType.ON_REQUEST) ? context.request().headers() : context.response().headers());
        LOGGER.info("Policy took {} µs to execute", Duration.between(begin, end).dividedBy(ChronoUnit.MICROS.getDuration()));
        LOGGER.info("---------------------------------");
        streamDebugInfo.get(policy).end(end).body(body);
    }

    private String printHeaders(HttpHeaders httpHeaders) {
        StringBuffer sb = new StringBuffer("Headers: ");
        LOGGER.info("Headers:");
        httpHeaders.forEach((key, values) ->
        {
            LOGGER.info("   {} - {}", key, String.join(",", values));
            sb.append(String.format("   %s - %s", key, String.join(",", values)));
        });
        return sb.toString();
    }

    @Override
    public Request request() {
        return context.request();
    }

    @Override
    public Response response() {
        return context.response();
    }

    @Override
    public <T> T getComponent(Class<T> componentClass) {
        return context.getComponent(componentClass);
    }

    @Override
    public void setAttribute(String name, Object value) {
        context.setAttribute(name, value);
    }

    @Override
    public void removeAttribute(String name) {
        context.removeAttribute(name);
    }

    @Override
    public Object getAttribute(String name) {
        return context.getAttribute(name);
    }

    @Override
    public Enumeration<String> getAttributeNames() {
        return context.getAttributeNames();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return context.getAttributes();
    }

    @Override
    public TemplateEngine getTemplateEngine() {
        return context.getTemplateEngine();
    }

    @Override
    public Tracer getTracer() {
        return context.getTracer();
    }

    public String getEventId() {
        return eventId;
    }

    public Map<DebugPolicy, DebugInfo> getExecutionDebugInfo() {
        return executionDebugInfo;
    }

    public Map<DebugPolicy, DebugInfo> getStreamDebugInfo() {
        return streamDebugInfo;
    }

    public static class DebugInfo implements Comparable<DebugInfo>{
        private String headers;
        private String body;
        private final StreamType streamType;
        private Instant begin;
        private Instant end;

        public DebugInfo(StreamType streamType, Instant begin) {
            this.streamType = streamType;
            this.begin = begin;
        }

        public DebugInfo(String headers, String body, StreamType streamType, Instant begin, Instant end) {
            this.headers = headers;
            this.body = body;
            this.streamType = streamType;
            this.begin = begin;
            this.end = end;
        }

        public StreamType getStreamType() {
            return streamType;
        }

        DebugInfo end(Instant end) {
            this.end = end;
            return this;
        }

        DebugInfo headers(String headers) {
            this.headers = headers;
            return this;
        }

        DebugInfo body(String body) {
            this.body = body;
            return this;
        }

        @Override
        public int compareTo(DebugInfo o) {
            return this.begin.compareTo(o.begin);
        }

        @Override
        public String toString() {
            return "DebugInfo{" +
                    "streamType=" + streamType +
                    ", headers='" + headers + '\'' +
                    ", body='" + body + '\'' +
                    ", begin=" + begin +
                    ", end=" + end +
                    '}';
        }
    }
}
