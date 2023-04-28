    // select login/register and logout links
    const loginRegLink = document.querySelector('#login-reg');
    const logoutLink = document.querySelector('#logout');
    const profilelink = document.querySelector('#profile');
    
    // check sessionStorage
    if (!sessionStorage.getItem('token') || !sessionStorage.getItem('user')) {
      // user not logged in, hide logout and show login/register
      logoutLink.style.display = 'none';
      loginRegLink.style.display = 'block';
      profilelink.style.display = 'none';
    } else {
      // user logged in, hide login/register and show logout
      loginRegLink.style.display = 'none';
      logoutLink.style.display = 'block';
      profilelink.style.display = 'block';
    }