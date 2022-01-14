package io.gravitee.gateway.debug.flow;

import io.gravitee.gateway.api.ExecutionContext;
import io.gravitee.gateway.api.buffer.Buffer;
import io.gravitee.gateway.core.processor.StreamableProcessor;
import io.gravitee.gateway.flow.policy.PolicyChainFactory;
import io.gravitee.gateway.flow.policy.PolicyResolver;
import io.gravitee.gateway.policy.NoOpPolicyChain;
import io.gravitee.gateway.policy.Policy;
import io.gravitee.gateway.policy.PolicyManager;
import io.gravitee.gateway.policy.StreamType;
import io.gravitee.gateway.debug.policy.impl.DebugPolicy;

import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

public class DebugPolicyChainFactory extends PolicyChainFactory {

    public DebugPolicyChainFactory(PolicyManager policyManager) {
        super(policyManager);
    }

    @Override
    public StreamableProcessor<ExecutionContext, Buffer> create(List<PolicyResolver.Policy> resolvedPolicies, StreamType streamType, ExecutionContext context, Function<List<Policy>, StreamableProcessor<ExecutionContext, Buffer>> mapper) {
        if (resolvedPolicies.isEmpty()) {
            return new NoOpPolicyChain(context);
        }

        final List<Policy> policies = resolvedPolicies
                .stream()
                .map(policy -> new DebugPolicy(streamType, policyManager.create(streamType, policy.getName(), policy.getConfiguration(), policy.getCondition())))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        return mapper.apply(policies);
    }


}
