
 
# Start the demo

```sh
npm install
npm run dev
```

# Reproducing
The way that both Chrome and Edge deal with the dismissal of the prompt is different from how Chromium handles it. They will both actively re-prompt the user when a new request for the camera and microphone is made. Chromium will not re-prompt the user unless the user switches focus to another tab and then switches back. This means that Chrome and Edge actually have the more straightforward way to reproduce the issue. That could suggest that the issue may not actually lie entirely within Chromium itself, but within those two proprietary browsers' use of Chromium. Both browsers also surface the auto block in settings at the same time it happens whereas Chromium doesn't list it under recent activity until the page reloads (though it doesn't wait for the page permissions query or media request to surface the block, it shows up as soon as the page reloads after the final dismissed request). This seems to be more a question of how the block is surfaced, hoever, not a question of when it happens. If it were a question of when it happens, that would imply that both Chrome and Edge decided to handle that auto block differently than Chrome, which seems unlikely in my humble opinion. It's also possible that And so, if Chromium properly fires the change event, the issue should be solved in all three browsers. 

# Steps to reproduce with this demo in Chrome or Edge

1. Open the app at the URL given by the `npm run dev` command (typically http://localhost:3000).
1. Make sure that the permissions both saying "prompt." If they don't, reset the permissions for this site to prompt.
1. Click the "Request" button.
  * This calls `navigator.mediaDevices.getUserMedia({video: true, audio: true})`.
1. When the prompt appears to grant permissions, dismiss the prompt.
1. Repeat the two previous steps until the prompt no longer appears when you click the "Request" button. (In my testing, three dismissed requests )
  * At this point, the permissions are auto blocked.
  * This is surfaced under "Recent Activity" on the Settings -> Content page in both [Chrome](chrome://settings/content) and [Edge](edge://settings/content).

**Expected Result**
The change event of both PermissionStatus objects returned by `navigator.permissions.query()` should fire when the permissions are auto blocked. Because the script is listening to those change events, the render function should be getting the new values and inserting them into the HTML.

**Actual Result**
The change event is never fired. You can verify that the script and event otherwise work as expected by choosing to grant or deny the permission. 

## A note on versions
As noted above, the behavior of the prompt itself is slightly different between Chromium's developer builds and the official builds of Chrome and Edge. Both versions of Chromium behave identically and both Chrome and Edge behave identically. These are the versions I tested:
* Chrome: 101.0.4951.64
* Chromium: 101.0.4951.0
* Chromium: 104.0.5075.0
* Edge: 101.0.1210.53
