const http = require('http');
const path = require('path');

const connect_mongo = require('connect-mongo');
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const passport = require('passport');
const session = require('express-session');

const home_router = require('./routers/home');
const people_and_builders_router = require('./routers/people-and-builders');
const buildings_router = require('./routers/buildings');
const spaces_router = require('./routers/architectural-spaces');
const tests_router = require('./routers/tests');
const sessions_router = require('./routers/sessions');
const errors_router = require('./routers/errors');
const navigation_bar = require('./configurations/navigation-bar');

// Create Express server
const application = express();
const port = process.env.SERVER_PORT || '3000';

// Set application settings
application.set('view engine', 'njk.html');
application.set('x-powered-by', false);

application.set('website-port', port);
application.set('website-title', 'Arquitectura Siglo XIX');
application.set('website-navbar', navigation_bar);
application.set('website-default-theme', 'dark');
application.set('website-default-language', require('./languages/es.json'));

// Configure parsing of response bodies
application.use(express.json());
application.use(express.urlencoded({
	extended: true
}));

// Connect to MongoDB
mongoose.set('strictQuery', false);
(async () => {
	await mongoose.connect(process.env.SERVER_MONGODB_URI);
})();

// Configure Nunjucks
nunjucks.configure(path.join(__dirname, 'views'), {
	autoescape: true,
	express: application
});

// Prepare sessions support
application.use(session({
	secret: process.env.SERVER_SESSION_SECRET,
	store: connect_mongo.create({
		mongoUrl: process.env.SERVER_MONGODB_URI,
		dbName: 'website',
		crypto: {
			secret: process.env.SERVER_SESSION_SECRET
		}
	}),
	resave: false,
	saveUninitialized: false
}));
application.use(passport.authenticate('session'));

// Configure static files serving
application.use(express.static(path.join(__dirname, '..', 'client', 'css')));
application.use(express.static(path.join(__dirname, '..', 'client', 'html')));
application.use(express.static(path.join(__dirname, '..', 'client', 'js')));
application.use(express.static(path.join(__dirname, '..', 'client', 'resources')));

// Configure routers
application.use('/', home_router);
application.use('/people-and-builders', people_and_builders_router);
application.use('/buildings', buildings_router);
application.use('/architectural-spaces', spaces_router);
application.use('/sessions', sessions_router);
application.use('/tests', tests_router);
application.use(errors_router);

// Create HTTP server
const server = http.createServer(application);
server.listen(port);
/*const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
(async () => {
	await mongoose.connect(process.env.SERVER_MONGODB_URI);
})();

const Building = require('./models/building');
let a = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let b = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let c = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let d = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let e = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let f = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let g = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let h = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
let i = new Building({
	name: 'A',
	typology: 'A',
	actual_state: 'A',
	building_time: '0',
	builders: ['A'],
	location: 'A',
	coordinates: '0°0\'0"N 0°0\'0"O',
	brief_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut sem nec urna ultrices convallis non non ipsum. In feugiat velit ex, vitae porttitor lectus vestibulum auctor. Maecenas commodo sem ut tortor egestas, eget aliquam magna fermentum. Mauris dapibus urna sit amet mauris pharetra vehicula. Phasellus rhoncus blandit orci. Aenean ac eleifend arcu, non aliquam neque. Curabitur in laoreet arcu. Donec euismod orci id lacus pulvinar ornare. Proin auctor eget lacus et congue. Aliquam placerat, metus finibus finibus vulputate, magna dolor tincidunt dolor, eget gravida risus nisl nec ex. Sed accumsan mauris vitae mi condimentum, in bibendum odio mattis. Sed euismod tristique sapien, sed faucibus lectus tempus nec. Nunc a pellentesque metus. Donec ut convallis magna, at rutrum tortor. Cras id vestibulum nisl.',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed consequat lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada et urna vitae luctus. Fusce mollis euismod nulla eu tincidunt. Maecenas nunc ex, lacinia sit amet hendrerit non, ultrices a lectus. Praesent ac volutpat massa, ac vehicula nibh. Integer scelerisque urna ut mauris pellentesque, a congue augue viverra. Praesent at tellus eget lacus tempor commodo vel eu nisl. Morbi sit amet cursus ex. Curabitur vel aliquam erat, ac commodo lacus. Ut accumsan nibh at venenatis laoreet. Phasellus a nulla sit amet leo suscipit tristique non at metus. Donec lobortis urna ac mi sagittis, ut bibendum urna maximus. Morbi aliquam enim nec purus dapibus aliquam. Maecenas id turpis ac metus laoreet scelerisque volutpat eu ligula. Nam ut nibh ligula. Sed pharetra molestie magna sed aliquam. In non velit ut nisl mollis rutrum. Nam tincidunt tortor tincidunt laoreet maximus. Vivamus condimentum lacus viverra lorem egestas aliquam. In ligula eros, tempor quis iaculis eget, gravida nec velit. Ut vehicula arcu turpis, eu dictum enim mattis viverra. In consectetur lorem ac nulla pretium euismod. Aliquam erat volutpat. Morbi molestie tristique cursus. Aliquam maximus accumsan nisl, in placerat ipsum vehicula ut. Fusce commodo, turpis non malesuada pharetra, ipsum nisl pretium felis, vel malesuada metus erat sit amet nisl. Aenean bibendum sem est, eget sagittis odio blandit at. Donec quis tellus quis ligula tempus viverra non ut turpis. Nulla vel est id dolor congue dictum. Nunc volutpat, risus ut faucibus pellentesque, nisl leo posuere dolor, quis ullamcorper sapien nisi id turpis. Sed iaculis purus id enim sodales sodales. Cras finibus, mauris at pulvinar efficitur, arcu dui finibus mi, ac ultricies magna eros non nisl. In tristique nisi eu sollicitudin vehicula. Integer rhoncus magna ac libero finibus volutpat. Nullam a diam nec eros varius sollicitudin ac in lorem. Vestibulum a ipsum at nunc lacinia laoreet. In nec mauris velit. Sed eu mattis velit. Aliquam id ex nec mi luctus semper.',
	images_paths: []
});
Building.insertMany([a, b, c, d, e, f, g, h, i]);
//building.images_paths.push(`/images/buildings/${building._id}/1.jpg`);*/