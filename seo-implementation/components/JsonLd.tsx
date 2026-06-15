// components/JsonLd.tsx
// Server component. Renders one or many JSON-LD objects as <script> tags in the
// server HTML, so validator.schema.org and Googlebot see the data in the initial
// response (no client-side JavaScript needed). This is the key fix: schema must
// be in the server-rendered HTML, not injected after load.

import React from 'react'

export function JsonLd({ schema }: { schema: object | (object | null)[] }) {
  const items = (Array.isArray(schema) ? schema : [schema]).filter(Boolean) as object[]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Escape "<" so a stray "</script>" inside any string can't break out.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}

export default JsonLd
