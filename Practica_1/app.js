const notas = require('./notas.js');
const yargs = require('yargs');

yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe: 'agregar una nota nueva',
    builder: {
        title: {
            describe: 'titulo',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'descripcion',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('Titulo: ' + argv.title);
        console.log('Descripcion: ' + argv.body);
        notas.add(argv.title, argv.body);
        notas.list();
    }
});

yargs.command({
    command: 'list',
    describe: 'Listado de las notas',
    handler: function (argv) {
        notas.list();
    }
});

yargs.command({
    command: 'remove',
    describe: 'Eliminar una nota',
    builder: {
        title: {
            describe: 'titulo a eliminar',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        console.log('Titulo: ' + argv.title);
        notas.remove(argv.title);
    }
});
console.log(yargs.argv);