# react-gtm-module

### React Google Tag Manager Module

This is a JS module to [React](https://facebook.github.io/react/)-based apps that implement Google Tag Manager (GTM). It is designed so that the [GTM snippet](https://developers.google.com/tag-manager/quickstart) can be injected and used with minimal effort.

It was [originally created and maintained](https://github.com/alinemorelli/react-gtm) by [@alinemorelli](https://github.com/alinemorelli), but has not been further developed since September 2020. A whole series of feature requests and pull requests have remained unprocessed since then, which have been partly included here. On top a few further changes and a fix were applied. You can find out more about it in the [comparison section](#comparison-to-orginal-module).  
A [migration guide](#migration-guide) is provided too.

## Getting Started

Open up your terminal and install the package with your preferred package manager.

```bash
npm install @sooro-io/react-gtm-module
# OR
yarn add @sooro-io/react-gtm-module
```

You need to adjust the code in your React application's entry file. If you started your application via Create React App, it's about `src/index.js` or `src/index.ts`.

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// start changes
import TagManager from '@sooro-io/react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx', // replace with your GTM container ID
}

TagManager.initialize(tagManagerArgs)
// end changes

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
```

That's it, you have successfully added the GTM to your react application. You can start a preview session of your GTM container to confirm that everything is working.

Alternatively, you can go to the console in your browser tab and enter `google_tag_manager`. You should see a few informations and functions.

If you are facing problems, please check if you receive a 404 error for the GTM script. If so, no changes have been published to the GTM container yet. Once you have done this, the error will disappear and the GTM script will be injected.

## Interact with the dataLayer

You can interact with the dataLayer (to trigger events or push new data to it) in your components like this:

```js
import React from 'react'
import TagManager from 'react-gtm-module'

const Home = () => {
    TagManager.dataLayer({
        dataLayer: {
            event: 'home_viewed',
            // add other properties to set a value
            // to unset a property use undefined as value
        },
    })

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home
```

If you are using multiple dataLayers you can define to which dataLayer the object is added by using the `dataLayerName` property.

```js
TagManager.dataLayer({
    dataLayer: {
        event: 'identified',
        userId: 'dc26b3de-5186-4fa5-a89a-60762111a5b4',
    },
    dataLayerName: 'personalInformation',
})
```

## Configuration

To adapt your GTM configuration to your needs, a number of options are available. You can find examples for each of them below the table.

| Value                                  | Type               | Required | Notes                                                                                                                  |
| -------------------------------------- | ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| gtmId                                  | `String`           | Yes      | The ID of your GTM Container.                                                                                          |
| [dataLayer](#datalayer)                | `Object`           | No       | Information that should be added to the dataLayer before initialization.                                               |
| [dataLayerName](#datalayername)        | `String`           | No       | Customize the name of the dataLayer object.                                                                            |
| [events](#events)                      | `Array of Objects` | No       | Additional events which will be added to the dataLayer during initialization.                                          |
| [auth](#auth--preview-environments)    | `String`           | No       | If you use GTM's environment function, you need to pass the gtm_auth query parameter here.                             |
| [preview](#auth--preview-environments) | `String`           | No       | If you use GTM's environment function, you need to pass the gtm_preview query parameter here.                          |
| [nonce](#nonce)                        | `String`           | No       | Set the nonce if you use a Content Security Policy.                                                                    |
| [source](#source)                      | `String`           | No       | Customize the GTM script URL if you serve the Google scripts through your tagging servers and/or mask your GTM script. |

### dataLayer

Information that should be added to the dataLayer before initialization. The information will be added before `gtm.js` event.

```js
const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx',
    dataLayer: {
        currency: 'USD',
        language: 'en',
    },
}
```

### dataLayerName

Customize the name of the dataLayer object.

```js
const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx',
    dataLayerName: 'personalInformation',
}
```

### events

Additional events which will be added to the dataLayer during initialization (after `gtm.js` event).

```js
const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx',
    events: [
        {
            event: 'consent_loaded',
            consentAnalytics: true,
            consentAds: false,
            consentPreferences: true,
        },
    ],
}
```

### auth & preview (Environments)

You have to set both properties to interact with an certain environment. Environments are an advanced GTM feature. [Here is a guide which helps you to implement it](https://marketlytics.com/blog/google-tag-manager-environments/) if you are interested.

You have to manually extract the necessary information from the environment snippet. Inside your GTM container go to **Admin** -> **Environments**. On this page you see a list of all your environments. On the right you have the **Actions** for each entry. Click on it and use the function **Get Snippet**.

```js
const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx',
    auth: '6sBOnZx1hqPcO01xPOytLK', // add here the value of gtm_auth
    preview: 'env-staging', // add here the value of gtm_preview
}
```

Please note that `&gtm_cookies_win=x` will be automatically added to the GTM script URL as soon the two properties are set. [Please check the article of Simo Ahava for more details and challenges about it](https://www.simoahava.com/analytics/better-qa-with-google-tag-manager-environments/).

### nonce

[Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) helps to mitigate certain types of attacks. This includes especially cross-site scripting as only certain sources of scripts (domains) are allowed to be executed. [GTM supports to feature natively, you can find a whole guide in docs](https://developers.google.com/tag-platform/security/guides/csp).

```js
const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx',
    nonce: 'KCenr5lELncZ6JJlHmerd9aIjddJfBEZ', // from you server
}
```

### source

If you use your GTM Tagging Servers to serve Google scripts, you have to use a custom URL. This property allows you to overwrite the default one `https://googletagmanager.com/gtm.js` with a custom value.

For more information about this feature [read the article in GTM docs](https://developers.google.com/tag-platform/tag-manager/server-side/dependency-serving?tag=gtm). It contains also a step-by-step guide.

```js
const tagManagerArgs = {
    gtmId: 'GTM-xxxxxx',
    source: 'https://gtm.example.com/gtm.js', // URL including script!
}
```

## Comparison to Orginal Module

Basically it is still the JS module you know. However, there are a number of additional functions and a bug fix, which is a breaking change.

**Changes and improvements:**

-  support for Content Security Policy to mitigate risks related to cross-site scripting
-  possibility to overwrite the GTM script URL in order to use certain functions of GTM tagging servers, which can lead to improved privacy
-  addition of TypeScript definitions into the package itself
-  simplified documentation for all features and various corrections and additions
-  improved test coverage to 100% (based on Jest)
-  updated depedencies and the removal of unnecessary ones

**Bug fix:**
The `events` argument was inteded to add events into the dataLayer before GTM gets initialized. Against the description only properties could be added. We fixed this problem and you are now able to add events. Properties can be still added by the setting the initial dataLayer (`dataLayer` arg).

## Migration Guide

**Dependencies**  
All you have to do is change the package. The previous TypeScript definitions are no longer required as the types are now included in the package.

```bash
npm uninstall react-gtm-module @types/react-gtm-module
npm install @sooro-io/react-gtm-module

# OR

yarn remove react-gtm-module @types/react-gtm-module
yarn install @sooro-io/react-gtm-module
```

**Imports**

```diff
- import TagManager from 'react-gtm-module'
+ import TagManager from '@sooro-io/react-gtm-module'
```

**`events` arg**  
If you use the `events` arg in the initialization you need to switch to the `dataLayer` arg. If you want to add events, [please check the example](#events).

```diff
const tagManagerArgs  = {
    gtmId: 'GTM-xxxxxx',
-   events: {
-       currency: 'USD',
-       language: 'en',
-   },
+   dataLayer: {
+       currency: 'USD',
+       language: 'en',
+   },
}
```
