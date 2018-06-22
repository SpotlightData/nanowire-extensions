# OneDrive

Because in OneDrive we are required to specify the exact urls we redirect from, we create a static html page that we link to.
The problem with our current set up is that our url is `jobs/:id/upload` where id is **dynamic**, so we cannot specify fixed urls for OneDrive

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
