const express   =   require('express')
    , app       =   express();

app.set('port',	(process.env.PORT	||	33333));


// MAIN PAGE LOGIN
app.use(
    '/login',
    express.static('./distDeveloper/', {
        'index' : 'login.html'
    })
);

// REGISTER
app.use(
    '/register',
    express.static('./distDeveloper/', {
        'index' : 'register.html'
    })
);

// REGISTER
app.use(
    '/confirm',
    express.static('./distDeveloper/', {
        'index' : 'confirm.html'
    })
);

// 404
app.use(
    '/404',
    express.static('./distDeveloper/', {
        'index' : '404.html'
    })
);

// ERROR
app.use(
    '/error',
    express.static('./distDeveloper/', {
        'index' : 'error.html'
    })
);


// Handle 404
app.use(
    '*',
    function(request, response) {

        response.redirect('/404');
        response.end();
    }
);

app.listen(
    app.get('port'),
    function()	{
        console.log('Server	started: http://localhost:' + app.get('port') + '/');
    }
);