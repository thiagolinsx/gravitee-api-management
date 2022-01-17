/**
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.gateway.debug.policy.impl;

import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.api.buffer.Buffer;
import io.gravitee.gateway.api.handler.Handler;
import io.gravitee.gateway.api.stream.ReadStream;
import io.gravitee.gateway.api.stream.ReadWriteStream;
import io.gravitee.gateway.api.stream.WriteStream;
import io.gravitee.gateway.debug.reactor.reactor.handler.context.DebugExecutionContext;
import io.gravitee.gateway.policy.Policy;
import io.gravitee.gateway.policy.StreamType;
import io.gravitee.gateway.policy.impl.tracing.TracingPolicy;
import io.gravitee.tracing.api.Span;
import io.gravitee.tracing.api.Tracer;

/**
 * A traced {@link ReadWriteStream} used to trace beginning and ending of the policy execution.
 *
 * @author David BRASSELY (david.brassely at graviteesource.com)
 * @author GraviteeSource Team
 */
public class DebugReadWriteStream implements ReadWriteStream<Buffer> {

    private final ReadWriteStream<Buffer> stream;
    private StreamType streamType;

    // On peut tout supprimer si on passe un handler dans le constructeur
    private final DebugPolicy policy;
    private DebugExecutionContext context;
    private Buffer buffer;
    private String content;

    public DebugReadWriteStream(final DebugExecutionContext context, final ReadWriteStream<Buffer> stream, final DebugPolicy policy, StreamType streamType) {
        this.context = context;
        this.policy = policy;
        this.stream = stream;
        this.streamType = streamType;
        this.buffer = Buffer.buffer();
    }

    @Override
    public ReadStream<Buffer> bodyHandler(Handler<Buffer> bodyHandler) {
        stream.bodyHandler(result -> {
            buffer.appendBuffer(result);
            context.exitStreamingPolicy(policy, streamType, buffer);
            bodyHandler.handle(result);
        });

        return this;
    }

    @Override
    public ReadStream<Buffer> endHandler(Handler<Void> endHandler) {
        stream.endHandler(endHandler);

        return this;
    }

    @Override
    public ReadStream<Buffer> pause() {
        stream.pause();
        return this;
    }

    @Override
    public ReadStream<Buffer> resume() {
        stream.resume();
        return this;
    }

    @Override
    public WriteStream<Buffer> write(Buffer chunk) {
        stream.write(chunk);
        return this;
    }

    @Override
    public void end() {
        stream.end();
    }

    @Override
    public void end(Buffer chunk) {
        stream.end(chunk);
    }

    @Override
    public WriteStream<Buffer> drainHandler(Handler<Void> drainHandler) {
        stream.drainHandler(drainHandler);
        return this;
    }

    @Override
    public boolean writeQueueFull() {
        return stream.writeQueueFull();
    }

    public String getContent() {
        return content;
    }
}
