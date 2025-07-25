document
    .querySelector('.page-content')
    .querySelectorAll('div.highlight')
    .forEach(function (pre) {
      var button = document.createElement('button');
      var copyText = 'COPY';
      button.className = 'copy';
      button.type = 'button';
      button.ariaLabel = 'Copy code to clipboard';
      button.innerText = copyText;
      button.addEventListener('click', function () {
        var code = pre.querySelector('code').innerText.trim();
        navigator.clipboard.writeText(code);
        button.innerText = 'Copied!';
        setTimeout(function () {
          button.innerText = copyText;
        }, 1500);
      });
      pre.appendChild(button);
    });