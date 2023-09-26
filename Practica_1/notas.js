const fs = require('fs');
const chalk = require('chalk');

const add = (title, body) => {
    const notas = loadNotes();
    const add = { title: title, body: body };
    const nota = notas.filter((x) => x.title === add.title).map(x => x.title)
    if (nota.length === 0){
        notas.push(add)
        guardar(notas);
        console.log(chalk.green.inverse("Se agrego la nota: ", add.title));
    } else {
        console.log(chalk.red.inverse("Ya existe la nota con el titulo: ", add.title));
    }

}

const list = () => {
    console.log(loadNotes());
}

const remove = (title) => {
    const notas = loadNotes();
    let notasTem = notas.filter(x => x.title !== title);
    if (notas.length > notasTem.length) {
        console.log(chalk.green.inverse('Nota eliminada!'))
        guardar(notasTem);
    } else {
        console.log(chalk.red.inverse('Nota no encontrada!'))
    } 
}

const guardar = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    add: add,
    list: list,
    remove: remove,
}
