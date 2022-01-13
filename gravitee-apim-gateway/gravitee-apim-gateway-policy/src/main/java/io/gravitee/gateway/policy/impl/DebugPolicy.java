package io.gravitee.gateway.policy.impl;

import io.gravitee.common.http.HttpHeaders;
import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.api.buffer.Buffer;
import io.gravitee.gateway.api.http.stream.TransformableRequestStreamBuilder;
import io.gravitee.gateway.api.stream.ReadWriteStream;
import io.gravitee.gateway.policy.Policy;
import io.gravitee.gateway.policy.PolicyException;
import io.gravitee.gateway.policy.StreamType;
import io.gravitee.policy.api.PolicyChain;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.time.Instant;

/**
 * @author Yann TAVERNIER (yann.tavernier at graviteesource.com)
 * @author GraviteeSource Team
 */
public class DebugPolicy implements Policy {

    public static final Logger LOGGER = LoggerFactory.getLogger(DebugPolicy.class);

    private final StreamType streamType;
    private final Policy policy;

    private Instant begin;
    private Instant end;

    public DebugPolicy(StreamType streamType, Policy policy) {
        this.streamType = streamType;
        this.policy = policy;
    }

    @Override
    public String id() {
        return policy.id();
    }

    @Override
    public void execute(PolicyChain chain, ExecutionContext context) throws PolicyException {
        LOGGER.info("------------- execute --------------------");

        before(context);
        policy.execute(chain, context);
        after(context);
    }

    @Override
    public ReadWriteStream<Buffer> stream(PolicyChain chain, ExecutionContext context) throws PolicyException {
        LOGGER.info("------------- stream --------------------");

        before(context);
        final ReadWriteStream<Buffer> stream = policy.stream(chain, context);
        after(context);

        return stream;
    }

    @Override
    public boolean isStreamable() {
        return policy.isStreamable();
    }

    @Override
    public boolean isRunnable() {
        return policy.isRunnable();
    }

    private void before(ExecutionContext context) {
        LOGGER.info("---------------------------------");
        LOGGER.info("PHASE: {}", streamType);
        LOGGER.info("Before policy: {}", id());
        begin = Instant.now();
        LOGGER.info("Starting at: {}", begin);
        printHeaders(streamType.equals(StreamType.ON_REQUEST) ? context.request().headers() : context.response().headers());

        if (streamType.equals(StreamType.ON_REQUEST)) {
            context.request().bodyHandler(b -> LOGGER.info("Body: {}", b.toString()));
        } else {
            TransformableRequestStreamBuilder.on(context.request()).transform(b -> {
                LOGGER.info("Body:");
                LOGGER.info(b.toString());
                return b;
            }).build().bodyHandler(b -> {
                LOGGER.info("Body:");
                LOGGER.info(b.toString());
            });
        }
    }

    private void after(ExecutionContext context) {
        LOGGER.info("---------------------------------");
        LOGGER.info("After policy: " + id());
        end = Instant.now();
        LOGGER.info("Ending at: " + end);
        printHeaders(streamType.equals(StreamType.ON_REQUEST) ? context.request().headers() : context.response().headers());
        LOGGER.info("Policy took {} ms to execute", Duration.between(begin, end).toMillis());
        LOGGER.info("---------------------------------");
    }

    private void printHeaders(HttpHeaders httpHeaders) {
        LOGGER.info("Headers:");
        httpHeaders.forEach((key, values) ->
        {
            LOGGER.info("   {} - {}", key, String.join(",", values));
        });
    }
}
