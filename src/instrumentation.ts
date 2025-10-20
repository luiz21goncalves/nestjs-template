import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node'
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions'

console.log(process.env.OTEL_TRACER_EXPORTER_URL)

export const tracing = new NodeSDK({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
  ],
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'nestjs-template',
    [ATTR_SERVICE_VERSION]: '0.0.0',
  }),
  spanProcessor: new BatchSpanProcessor(
    new OTLPTraceExporter({
      headers: {
        Authorization: `Bearer ${process.env.OTEL_TRACER_EXPORTER_TOKEN}`,
      },
      url: process.env.OTEL_TRACE_EXPORTER_URL,
    })
  ),
})

tracing.start()

const SUCCESS_EXIT_CODE = 0

process.on('SIGTERM', () => {
  tracing
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(SUCCESS_EXIT_CODE))
})
