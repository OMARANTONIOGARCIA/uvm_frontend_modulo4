const notas = require('./notas.js');

const comando = process.argv[2];

if (comando === 'add') {
    const title = process.argv[3];
    const body = process.argv[4];
    notas.add(title, body);
} else if (comando === 'list') {
    notas.list();
} else if (comando === 'remove') {
    const title = process.argv[3];
    notas.eliminar(title);
} else {
    console.log(chalk.red.inverse('Comando no reconocido.'));
}