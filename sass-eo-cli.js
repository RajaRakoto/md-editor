module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	// node-glob syntax
	const includeAllSassFiles = ['./src/*.scss', './src/components/**/*.scss'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json'),

		sass: {
			dist: {
				options: {
					style: 'compressed',
					loadPath: ['./node_modules/@raja_rakoto/sass-eo'],
				},
				files: {
					// destination: source (example)
					'./src/index.min.css': './src/index.scss',
					'./src/components/editor/editor.min.css':
						'./src/components/editor/editor.scss',
				},
			},
		},

		watch: {
			sass: {
				files: includeAllSassFiles,
				tasks: ['sass:dist'],
				options: { spawn: false },
			},
		},

		shell: {
			sseo_docs: {
				command: [
					'cd ./node_modules/@raja_rakoto/sass-eo/',
					'sassdoc .',
					'cd sassdoc',
					'xdg-open index.html',
				].join('&&'),
			},
			loaders_docs: {
				command: [
					'cd ./node_modules/@raja_rakoto/sass-eo/',
					'cd docs/loaders',
					'xdg-open index.html',
				].join('&&'),
			},
			magic_docs: {
				command: [
					'cd ./node_modules/@raja_rakoto/sass-eo/',
					'cd docs/magic',
					'xdg-open index.html',
				].join('&&'),
			},
			milligrid_docs: {
				command: [
					'cd ./node_modules/@raja_rakoto/sass-eo/',
					'cd docs/milligrid',
					'xdg-open index.html',
				].join('&&'),
			},
			hamburgers_config: {
				command: [
					'cd ./node_modules/@raja_rakoto/sass-eo/',
					'cd modules/libs',
					'xdg-open _hamburgers.scss',
				].join('&&'),
			},
			grid_maker: {
				command: [
					'cd ./node_modules/@raja_rakoto/sass-eo/',
					'cd modules/apps/grid-maker',
					'xdg-open index.html',
				].join('&&'),
			},
			flexbox_maker: {
				command: [
					'cd ./node_modules/@raja_rakoto/sass-eo/',
					'cd modules/apps/flexbox-maker',
					'xdg-open index.html',
				].join('&&'),
			},
		},
	});

	// watch
	grunt.registerTask('watch-sass', ['watch:sass']);
	// docs
	grunt.registerTask('sseo-docs', ['shell:sseo_docs']);
	grunt.registerTask('loaders-docs', ['shell:loaders_docs']);
	grunt.registerTask('magic-docs', ['shell:magic_docs']);
	grunt.registerTask('milligrid-docs', ['shell:milligrid_docs']);
	// config
	grunt.registerTask('hamburgers-config', ['shell:hamburgers_config']);
	//maker
	grunt.registerTask('grid-maker', ['shell:grid_maker']);
	grunt.registerTask('flexbox-maker', ['shell:flexbox_maker']);

	// all tasks lists
	const sasseoCommandList = [
		'watch-sass',
		'sseo-docs',
		'loaders-docs',
		'magic-docs',
		'milligrid-docs',
		'hamburgers-config',
		'grid-maker',
		'flexbox-maker',
	];
	const sasseoCommandStatus = [
		'watch all .scss files',
		'generate sassdoc for basics modules',
		'generate loaders docs',
		'generate magic docs',
		'generate milligrid docs',
		'customize your hamburgers',
		'open grid maker app',
		'open flexbox maker app',
	];

	// default tasks
	grunt.registerTask('default', () => {
		console.log(
			'\nHere are the lists of executable commands with sass-eo-cli:'.green,
		);

		/**
		 *
		 * @param {string} taskTitle - task title (Eg: basics tasks)
		 * @param {array} taskNames - task names (Eg: basicsTaskNames)
		 * @param {array} taskStatus - task status (Eg: basicsTaskStatus)
		 * @param {string} taskTheme - colors of theme (Eg: black ,red ,green ,yellow ,blue ,magenta ,cyan ,white ,gray ,grey)
		 */
		function getTaskResume(taskTitle, taskNames, taskStatus, taskTheme) {
			switch (taskTheme) {
				case 'cyan':
					console.log(`\n${taskTitle}`.cyan.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.cyan + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'magenta':
					console.log(`\n${taskTitle}`.magenta.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.magenta + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'yellow':
					console.log(`\n${taskTitle}`.yellow.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.yellow + ` -> ${taskStatus[index]}`);
					});
					break;
				case 'blue':
					console.log(`\n${taskTitle}`.blue.inverse.bold);
					taskNames.forEach((taskNames, index) => {
						console.log(taskNames.blue + ` -> ${taskStatus[index]}`);
					});
					break;

				default:
					null;
					break;
			}
		}

		// command resume
		getTaskResume(
			'~ SASS-EO CLI ~',
			sasseoCommandList,
			sasseoCommandStatus,
			'magenta',
		);
	});
};
