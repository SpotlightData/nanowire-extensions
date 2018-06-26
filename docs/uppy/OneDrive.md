# OneDrive

## File retrieval

Because in OneDrive we are required to specify the exact urls we redirect from, we create a static html page that we link to.
The problem with our current set up is that our url is `jobs/:id/upload` where id is **dynamic**, so we cannot specify fixed urls for OneDrive.

The function that retrieves files from OneDrive can be found in `src/uppy/OneDrive/getFiles` it can also be rewritten and passed to `option` prop to `OneDrive` component.

```javascript
const options = {
  upload: {
    uploader: async settings => {
      // ...do something
      return uploaderResp;
    },
    spec,
  },
};
```

The value of `spec` inside `upload` object can be used to override default specification passed to uploader. Default settings:

```javascript
const settings = {
  clientId: this.opts.appId,
  action: 'query',
  multiSelect: true,
  openInNewWindow: true,
  source:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${process.env.PORT}/services/onedrive`
      : '/services/onedrive',
  advanced: { queryParameters: `select=${includeKeys.join(',')}` },
  ...this.settings.spec,
};
```

## Meta

The meta that we fetch from OneDrive is:

```javascript
const includeKeys = [
  '@content.downloadUrl',
  '@microsoft.graph.downloadUrl',
  'id',
  'name',
  'webUrl',
  'size',
  'file',
  'folder',
  'photo',
  'image',
  'audio',
  'video',
  'location',
  'createdBy',
  'createdDateTime',
  'lastModifiedBy',
  'lastModifiedDateTime',
];
```

## Example Usage

```javascript
const uppy = Uppy({
  autoProceed: false,
});
const options = {
  spec: { source: 'http://fakeurl.com'}
};
const content(
  <UppyProvider uppy={uppy}>
    <OneDrive text="testText" appId="myId" options={options} />
  </UppyProvider>
);
```

## Iframe

HTML snippet that is opened within the iframe:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<script type="text/javascript" src="https://js.live.net/v7.2/OneDrive.js"></script>
<script>
    "use strict";
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
      value: function (i) {
        if (null == i) throw new TypeError("Cannot convert undefined or null to object");
        for (var m, k = Object(i), l = 1; l < arguments.length; l++)
          if (m = arguments[l], null != m)
            for (var n in m) Object.prototype.hasOwnProperty.call(m, n) && (k[n] = m[n]);
        return k
      },
      writable: !0,
      configurable: !0
    }), String.prototype.includes || (String.prototype.includes = function (e, i) {
      "use strict";
      return "number" != typeof i && (i = 0), !(i + e.length > this.length) && -1 !== this.indexOf(e, i)
    });

    function oneDriveChildHandler() {
      window.addEventListener("message", function (e) {
        if (e.data.includes("clientId")) {
          var i = JSON.parse(e.data),
            j = (l = i, new Promise(function (m) {
              window.OneDrive.open(Object.assign({
                success: function (o) {
                  return m([void 0, o])
                },
                error: function (o) {
                  return m([o, void 0])
                },
                cancel: function () {
                  return m([])
                }
              }, l))
            })),
            k = window.opener || window.parent;
          j.then(function (m) {
            return k.postMessage(JSON.stringify(m), "*")
          })
        }
        var l
      })
    }
    oneDriveChildHandler();</script>

<body>
</body>

</html>
```
