function AuthController() {
    var authService = new AuthService()

    function drawLogin(res) {
        var template = ''
        template = `
            <h4> ${res.data.message} </h4>
        `
        document.getElementById('welcome').innerHTML = template
        var template2 = ''
        template2 = `
        <button type="button" class="btn btn-default btn-lg" data-toggle="modal" data-target="#loginModal">Login</button>
                <div class="modal fade login" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 style="color:black;"> Login</h4>
                            </div>
                            <div class="modal-body">
                                <form class="form" id="login" onsubmit="app.controllers.authController.login(event)">
                                    <div class="form-group">
                                        <label for="email">
                                            <span class="glyphicon glyphicon-user"></span> Email</label>
                                        <input type="text" class="form-control" id="email" placeholder="woot1337h4xors@rockulikeahurricane.org">
                                    </div>
                                    <div class="form-group">
                                        <label for="password">
                                            <span class="glyphicon glyphicon-eye-open"></span> Password</label>
                                        <input type="password" class="form-control" id="password" placeholder="eyelessthan3horses">
                                    </div>
                                    <button type="submit" class="btn btn-default btn-success btn-block" data-toggle="modal">
                                        Login</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-default btn-default pull-left" data-dismiss="modal" datat-target="#loginModal">
                                    <span class="glyphicon glyphicon-remove"></span> Cancel</button>
                                <p>Not a member?
                                    <button type="button" class="btn btn-default btn-lg" onclick="app.controllers.authController.changeup()">Sign Up</button>
                                </p>
                                <div id="reg">

                                    <form class="form" id="registration" onsubmit="app.controllers.authController.registration(event)">
                                        <div class="form-group">
                                            <label for="username">Username:</label>
                                            <input type="text" class="form-control" name="username" placeholder="newGamer" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email address:</label>
                                            <input type="email" class="form-control" name="email" placeholder="newGamer@rockyoulikeahurricane.org" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="password">Password: </label>
                                            <input type="password" class="form-control" name="password" placeholder="thec4keisalie" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="reEnterPassword">Re-enter Password: </label>
                                            <input type="password" class="form-control" name="reEnterPassword" placeholder="enteritagain" required>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-default btn-success btn-block" data-toggle="modal">
                                                Submit </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
        document.getElementById('login').innerHTML = template2
    }

    function drawLogout(res) {
        var template = ''
        template = `
            <h4> Welcome ${res.data.data.username} </h4>
        `
        document.getElementById('welcome').innerHTML = template
        var template2 = ''
        template2 = `
            <button type= "button" class="btn btn-default btn-lg" onclick="app.controllers.authController.logout()">Logout </button>
        `
        document.getElementById('login').innerHTML = template2
    }

    this.changeup = function changeup() {
        var x = document.getElementById('reg');
        if (x.style.display === 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    }

    this.login = function login(event) {
        event.preventDefault()
        var loginData = {
            email: event.target.email.value,
            password: event.target.password.value
        }
        authService.login(loginData, drawLogout)
        $('#login').submit(function (e) {
            e.preventDefault();
            $('.login').modal('hide');
            return false;
        });

    }

    this.registration = function registration(event) {
        event.preventDefault()
        if (event.target.password.value != event.target.reEnterPassword.value) {
            console.log('please re-enter password')
        } else {
            var registerData = {
                email: event.target.email.value,
                username: event.target.username.value,
                password: event.target.password.value
            }
            authService.registration(registerData, drawLogout)
            $('#login').submit(function (e) {
                e.preventDefault();
                $('.login').modal('hide');
                return false;
            });
            // $('.modal-backdrop').remove()

            
        }
    }

    this.getUserLevel = function getUserLevel() {
        return authService.getUserLevel()
    }

    this.updateUserLevel = function updateUserLevel() {
        authService.updateUserLevel();
    }

    this.getFinalLevel = function getFinalLevel() {
        return authService.getFinalLevel()
    }

    this.logout = function logout() {
        authService.logout(drawLogin)

    }
    authService.authenticate(drawLogin, drawLogout)
}