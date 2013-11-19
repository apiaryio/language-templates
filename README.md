This repository lists language templates used to power code samples in Apiary's API Documentations. Please feel free to contribute your own languages or improve the existing ones.

You can try-out your code at [Language Templates Playground](http://apiaryio.github.io/language-templates).

## Interface

The HTML templates are written in [ECT](http://ectjs.com/), which places data between `<%=` and `%>` tags and control structures between `<%` and `%>`. The following are variables and helper methods you can use when rendering the code for a request:

- **@headers** - HTTP headers to be sent
- **@body** - HTTP body to be sent
- **@method** - HTTP method used in the request
- **@url** - URL of the request, relative to the root of the server (starting with '/')
- **@apiUrl** - Hostname of the API mock/proxy server (including http/https, not including trailing '/')
- **@contentType** - A shorthand for `@headers['content-type']`
- **@helpers.escape** - escape `"` (double-quote) characters
- **@helpers.rubyKey** - helper that produces `content_type` out of `Content-Type`
- **@helpers.getContentType(headers)** - same as `@contentType` but in form of a function you can pass any array of headers
- **@helpers.getContentTypeBrush(headers)** - produces a CSS class that enabled syntax-highlighting for this language
- **@helpers.isNotEmpty** (obj) - same like `[].length != 0` for objects (hash maps)
