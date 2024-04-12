// reset Altcha back to unverified
export function resetAltcha(element) {
    element.reset();
    return;
}

// attach dotnet component reference and event listener to Altcha
export function connectElement(element, dotNetHelper) {
    // attach server component reference
    element.dotNetHelper = dotNetHelper;
    // remove required attribute to disable client side validation
    var checkbox = element.querySelector('#altcha_checkbox');
    checkbox.required = false;
    // attach event listener
    element.addEventListener('statechange', (ev) => {
        // state can be: unverified, verifying, verified, error
        console.log('state:', ev.detail.state);
        // send status change message back to server (component)
        element.dotNetHelper.invokeMethodAsync('StatusChanged', ev.detail.state);
        if (ev.detail.state === 'verified') {
            // payload contains base64 encoded data for the server
            console.log('payload:', ev.detail.payload);
            // send payload to server (component)
            element.dotNetHelper.invokeMethodAsync('CheckPayload', ev.detail.payload);
        }
    });
}
