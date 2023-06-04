const navigation_bar = {
	logo: '/logo.png',
	links: [
		{
			key: 'home',
			route: '/home',
			allowed_roles: ['administrator', 'student', 'user', 'guest']
		},
		{
			key: 'buildings',
			route: '/buildings',
			allowed_roles: ['administrator', 'student', 'user', 'guest']
		},
		{
			key: 'architectural-spaces',
			route: '/architectural-spaces',
			allowed_roles: ['administrator', 'student', 'user', 'guest']
		},
		{
			key: 'people-and-builders',
			route: '/people-and-builders',
			allowed_roles: ['administrator', 'student', 'user', 'guest']
		},
		{
			key: 'tests',
			route: '/tests',
			allowed_roles: ['administrator']
		}
	]
};

module.exports = navigation_bar;