function AuthService() {
    var production = !window.location.host.includes('localhost');
    var baseUrl = production ? '//cultistproto.herokuapp.com' : '//localhost:3000';

    var auth = axios.create({
        baseURL: baseUrl,
        timeout: 2000,
        withCredentials: true
    })

    var currentUser = {}
    var finalLevel = 3;
    ///////////////////////////////////////////////////

    // console.log(app)


    // var currentLevel = app.controllers.authController.getUserLevel();
    // console.log("ZOMFG DID IT WORK?! " , currentLevel)

    // $.get(baseUrl + 'gamedata')
    // .then(res =>)



    ////////////////////////////////////////////////////

    function logError() {
        console.log('your request failed')
    }

    this.login = function login(user, cb) {
        auth.post('login', user)
            .then(res => {
                // console.log('login', res.data)
                currentUser = res.data.data
                console.log("Login ", currentUser)
                cb(res)
                getGameData()
            })
            .catch(logError)
    }



    this.registration = function registration(form, cb) {
        auth.post('register', form)
            .then(res => {
                currentUser = res.data.data
                console.log("Register ", currentUser)
                cb(res)
                getGameData()
            })
            .catch(logError)
    }

    this.authenticate = function authenticate(drawLogin, drawLogout) {
        auth('authenticate')
            .then(res => {
                debugger
                // console.log('authenticate', res.data.data)
                currentUser = res.data.data
                console.log("authenticate", currentUser)
                if (res.data.data.username) {
                    drawLogout(res)
                    getGameData()
                } else {
                    drawLogin(res)
                }
            })
            .catch(logError)
    }

    this.logout = function logout(cb) {
        auth.delete('logout')
            .then(res => {
                user = {}
                console.log('logout: ', res)
                cb(res)
                currentUser = {}
                getGameData()
            })
            .catch(logError)
    }

    this.getUserLevel = function getUserLevel() {
        debugger
        if (!currentUser.currentLevel) {
            return 0
        } else if (currentUser.currentLevel > finalLevel) {
            return currentUser.currentLevel = finalLevel;
        } else {
            return currentUser.currentLevel
        }
        console.log("hey there buddy ", currentUser)
    }

    this.updateUserLevel = function updateUserLevel() {
        debugger
        if (currentUser.currentLevel > finalLevel) {
            currentUser.currentLevel = finalLevel;
        }
        if (currentUser.currentLevel < finalLevel)
            currentUser.currentLevel++
        else {
            currentUser.currentLevel = 1;
        }

        // currentUser.currentLevel++
        auth.put('users/' + currentUser._id, { currentLevel: currentUser.currentLevel })
            .then(res => {
                getGameData();
            })

        // currentUser.currentLevel = 
    }

    this.getFinalLevel = function getFinalLevel() {
        return finalLevel
    }
}