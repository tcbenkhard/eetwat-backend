#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {EetwatBackendStack} from '../lib/eetwat-backend-stack';

const app = new cdk.App();
new EetwatBackendStack(app, 'eetwat-backend-tst', {
    environment: 'tst',
    serviceName: 'eetwat'
});

new EetwatBackendStack(app, 'eetwat-backend-prd', {
    environment: 'prd',
    serviceName: 'eetwat'
});