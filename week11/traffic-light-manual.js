async function useManual() {
  const BUTTON_NEXT_ID = 'next'

  function addNextButton() {
    const $button = document.createElement('button')
    $button.setAttribute('id', BUTTON_NEXT_ID)
    $button.innerText = 'Next'
    document.body.append($button)
    return $button
  }

  function happen(element, eventName) {
    return new Promise(resolve => {
      element.addEventListener(eventName, resolve, { once: true })
    })
  }

  if (document.getElementById(BUTTON_NEXT_ID)) return
  const $button = addNextButton()
  
  while(true) {
    green()
    await happen($button, 'click')
    yellow() 
    await happen($button, 'click')
    red() 
    await happen($button, 'click')
  }
}