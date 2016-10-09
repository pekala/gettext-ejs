# gettext-ejs

Extract translatable strings from [EJS](https://github.com/tj/ejs) templates.

It can be used stand-alone or through [gmarty/gettext](https://github.com/gmarty/xgettext).

### API

#### new Parser(keywordspec)
Creates a new parser.
The `keywordspec` parameter is optional, with the default being:
```javascript
{
    _: {
        msgid: 0
    },
    gettext: {
        msgid: 0
    },
    dgettext: {
        msgid: 1
    },
    dcgettext: {
        msgid: 1
    },
    ngettext: {
        msgid: 0,
        msgid_plural: 1
    },
    dngettext: {
        msgid: 1,
        msgid_plural: 2
    },
    pgettext: {
        msgctxt: 0,
        msgid: 1
    },
    dpgettext: {
        msgctxt: 1,
        msgid: 2
    }
}
```
Each keyword (key) requires an object with argument positions. The `msgid` position is required. `msgid_plural` and `msgctxt` are optional.
For example `gettext: {msgid: 0}` indicates that the Handlebars expression looks like `{{gettext "string"}}`.

#### .parse(template)
Parses the `template` string for Swig expressions using the keywordspec.
It returns an object with this structure:
```javascript
{
  msgid1: {
    line: [1, 3]
  },
  msgid2: {
    line: [2],
    plural: 'msgid_plural'
  }
}
```
