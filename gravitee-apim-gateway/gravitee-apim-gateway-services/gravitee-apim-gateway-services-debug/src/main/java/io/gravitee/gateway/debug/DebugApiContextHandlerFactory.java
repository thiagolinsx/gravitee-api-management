package io.gravitee.gateway.debug;

import io.gravitee.gateway.flow.policy.PolicyChainFactory;
import io.gravitee.gateway.handlers.api.ApiContextHandlerFactory;
import io.gravitee.gateway.policy.PolicyManager;

public class DebugApiContextHandlerFactory extends ApiContextHandlerFactory {

    @Override
    public PolicyChainFactory policyChainFactory(PolicyManager policyManager) {
        return super.policyChainFactory(policyManager);
    }
}
